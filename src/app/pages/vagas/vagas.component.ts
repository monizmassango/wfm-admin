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

  constructor(
    private readonly vagaService: VagaService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.vagaService.getAll().subscribe({
      next: (data) => {
        this.vagas = data;
      },
      error: () => {
        this.toastr.info(
          'Ocorreu um erro! ',
          "Erro ao buscar vagas",
          {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
      },
    });
  }

  remove(id: number) {
    this.displayStyle = "none";
    this.vagaService.remove(id).subscribe({
      next: () => {
        this.ngOnInit();
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
