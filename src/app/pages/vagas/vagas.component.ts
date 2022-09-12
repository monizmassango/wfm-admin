import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Vaga } from "src/app/_models/vaga";
import { VagaService } from "src/app/_services/vaga.service";

@Component({
  selector: "app-vagas",
  templateUrl: "vagas.component.html",
})
export class VagasComponent implements OnInit {
  vagas: Vaga[] = [];
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
    private readonly vagaService: VagaService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.vagaService.getAll().subscribe({
      next: (data) => {
        this.loading = false;
        this.vagas = data;
        this.pages = Math.ceil(data.length / 6);
        this.generateButtons();
      },
      error: () => {
        this.loading = false;
        this.toastr.info("Ocorreu um erro! ", "Erro ao buscar vagas", {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-top-right",
        });
      },
    });
  }

  remove(id: number) {
    this.displayStyle = "none";
    this.vagaService.remove(id).subscribe({
      next: () => {
        this.vagas = this.vagas.filter((elem) => {
          if (elem.id !== id) {
            return elem;
          }
        });
        this.toastr.info(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Vaga removida com sucesso! ',
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
