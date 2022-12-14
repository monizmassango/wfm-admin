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
  loading = false;
  term = "";

  limitStart = 0;
  limitEnd = 6;
  pages = 0;
  buttons: Buttons[] = [];

  constructor(
    private readonly noticiaService: NoticiaService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.noticiaService.getAll().subscribe({
      next: (data) => {
        this.loading = false;
        this.noticias = data;
        this.pages = Math.ceil(data.length / 6);
        this.generateButtons();
      },
      error: () => {
        this.toastr.info("Ocorreu um erro! ", "Erro ao buscar noticias", {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-top-right",
        });
        this.loading = false;
      },
    });
  }

  remove(id: number) {
    this.displayStyle = "none";
    this.noticiaService.remove(id).subscribe({
      next: () => {
        this.noticias = this.noticias.filter((elem) => {
          if (elem.id !== id) {
            return elem;
          }
        });
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

  generateButtons() {
    let start = 0;
    let end = 6;
    for (let index = 0; index < this.pages; index++) {
      this.buttons.push({ start: start, end: end });
      start = start + 6;
      end = end + 6;
    }
  }

  onClick(start, end) {
    this.limitStart = start;
    this.limitEnd = end;
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

interface Buttons {
  start: number;
  end: number;
}
