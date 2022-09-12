import { NoticiaService } from "./../../_services/noticia.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Noticia } from "src/app/_models/noticias";

@Component({
  selector: "app-nova-noticia",
  templateUrl: "nova-noticia.component.html",
})
export class NovaNoticiaComponent implements OnInit {
  noticiaForm: UntypedFormGroup;
  data: any;
  image: any;
  noticiaId: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private noticiaService: NoticiaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    this.route.params.subscribe((param) => {
      this.noticiaId = param["id"];
    });
  }

  ngOnInit(): void {
    this.noticiaForm = this.formBuilder.group({
      titulo: ["", Validators.required],
      subTitulo: ["", Validators.required],
      imagem: ["", Validators.required],
      linkUrl: [""],
      noticia: ["", Validators.required],
    });
    if (this.noticiaId) {
      this.updateForm();
    }
  }

  get f() {
    return this.noticiaForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.noticiaForm.patchValue({
        imagem: file,
      });
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.noticiaId) {
      if (this.f["imagem"].value) {
        this.updateWithImage();
      } else {
        this.updateNoticia();
      }
    } else {
      if (this.noticiaForm.invalid) {
        this.toastr.error(
          '<span class="tim-icons icon-simple-remove" [data-notify]="icon"></span>Preencha todos campos obrigatórios!',
          "Noticia não inserida",
          {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
        return;
      }
      this.updateWithImage();
    }
  }

  updateForm() {
    this.noticiaService.getById(this.noticiaId).subscribe((data) => {
      this.image = `data:image/png;base64,${data.image}`;
      this.noticiaForm.patchValue({
        titulo: data.title,
        subTitulo: data.subTitle,
        linkUrl: data.linkUrl,
        noticia: data.body,
      });
    });
  }

  updateNoticia() {
    let data: Noticia = {
      id: this.noticiaId,
      title: this.f["titulo"].value,
      subTitle: this.f["subTitulo"].value,
      body: this.f["noticia"].value,
      linkUrl: this.f["linkUrl"].value,
      linkText: "",
    };
    this.noticiaService.create(data).subscribe({
      next: () => {
        this.toastr.info(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Noticia inserida com sucesso! ',
          "",
          {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
        this.noticiaForm.reset();
        this.image = "";
      },
    });
  }

  async updateWithImage() {
    const formData = new FormData();
    formData.append("file", this.f["imagem"].value);
    this.noticiaService.imagem(formData).subscribe((blob) => {
      this.updateNoticia();
    });
  }
}
