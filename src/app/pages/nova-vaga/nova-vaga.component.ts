import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

import { VagaService } from "../../_services/vaga.service";
import { Vaga } from "src/app/_models/vaga";

@Component({
  selector: "app-nova-vaga",
  templateUrl: "nova-vaga.component.html",
})
export class NovaVagaComponent implements OnInit {
  vagaForm: UntypedFormGroup;
  data: any;
  image: any;
  vagaId: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private vagaService: VagaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    this.route.params.subscribe((param) => {
      this.vagaId = param["id"];
    });
  }

  ngOnInit(): void {
    this.vagaForm = this.formBuilder.group({
      title: ["", Validators.required],
      nomeEmpresa: ["", Validators.required],
      description: ["", Validators.required],
      requisitos: ["", Validators.required],
      email: [""],
      image: [""],
      endDate: ["", Validators.required],
    });
    if (this.vagaId) {
      this.updateForm();
    }
  }

  get f() {
    return this.vagaForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.vagaForm.patchValue({
        image: file,
      });
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    debugger
    if (this.vagaId) {
      if (this.f["image"].value) {
        this.updateWithImage();
      } else {
        this.updateVaga();
      }
    } else {
      if (this.vagaForm.invalid) {
        this.toastr.error(
          '<span class="tim-icons icon-simple-remove" [data-notify]="icon"></span>Preencha todos campos obrigatórios!',
          "vaga não inserida",
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
    this.vagaService.getById(this.vagaId).subscribe((data) => {
      this.image = `data:image/png;base64,${data.image}`;
      this.vagaForm.patchValue({
        title: data.title,
        nomeEmpresa: data.nomeEmpresa,
        description: data.description,
        requisitos: data.requisitos,
        email: data.email,
        endDate: data.endDate
      });
    });
  }

  updateVaga() {
    let data: Vaga = {
      id: this.vagaId,
      title: this.f["title"].value,
      nomeEmpresa: this.f['nomeEmpresa'].value,
      description: this.f['description'].value,
      requisitos: this.f['requisitos'].value,
      email: this.f['email'].value,
      endDate: this.f['endDate'].value
    };
    this.vagaService.create(data).subscribe({
      next: () => {
        this.toastr.info(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> vaga inserida com sucesso! ',
          "",
          {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
        this.vagaForm.reset();
      },
    });
  }

  async updateWithImage() {
    const formData = new FormData();
    formData.append("file", this.f["image"].value);
    this.vagaService.imagem(formData).subscribe((blob) => {
      this.updateVaga();
    });
  }
}
