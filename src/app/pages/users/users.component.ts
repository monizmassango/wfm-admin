import { UserService } from "src/app/_services/user.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-users",
  templateUrl: "users.component.html",
})
export class UsersComponent implements OnInit {
  users: any;
  removeID: number;
  name: string;
  displayStyle = "none";
  index: number;
  loading = false;

  constructor(
    private readonly userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.findAll().subscribe({
      next: (data) => {
        this.loading = false;
        this.users = data;
      },
      error: () => {
        this.loading = false;
        this.toastr.info("Ocorreu um erro! ", "Erro ao buscar users", {
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

    this.userService.remove(id).subscribe({
      next: () => {
        this.users = this.users.filter((elem) => {
          if (elem.id !== id) {
            return elem;
          }
        });
        this.toastr.info(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> User removido com sucesso! ',
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
