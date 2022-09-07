import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Noticia } from "src/app/_models/noticias";
import { NoticiaService } from "src/app/_services/noticia.service";

@Component({
  selector: "app-noticias",
  templateUrl: "noticias.component.html",
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  removeID: number;
  name: string;
  displayStyle = "none";
  index: number;

  constructor(
    private readonly noticiaService: NoticiaService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.noticiaService.getAll().subscribe({
      next: (data) => {
        this.noticias = data;
      },
      error: () => console.log("error"),
    });
  }

  remove(id: number) {
    this.displayStyle = "none";
    this.noticiaService.remove(id).subscribe({
      next: () => {
        this.ngOnInit();
        this.toastr.info(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Noticia removida com sucesso! ',
          "",
          {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
      },
    });
  }

  openPopup(name, id, index) {
    this.name = name;
    this.removeID = id;
    this.displayStyle = "block";
    this.index = index;
  }
  closePopup() {
    this.displayStyle = "none";
    this.name = undefined;
    this.removeID = undefined;
  }
}
