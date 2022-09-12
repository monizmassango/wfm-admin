import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-novo-user",
  templateUrl: "novo-user.component.html",
})
export class NovoUserComponent implements OnInit {
  userForm: UntypedFormGroup;
  data: any;
  image: any;
  userName: string;
  error = "";

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.userName = param["username"];
    });
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
    if (this.userName) {
      this.updateForm();
    }
  }

  get f() {
    return this.userForm.controls;
  }

  updateForm() {
    this.userService.getByName(this.userName).subscribe((data) => {
      this.userForm.patchValue({
        username: data.username,
        password: data.password,
        email: data.email,
        role: data.role,
      });
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
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
    const user = this.userForm.value;
    this.userService.create(user).subscribe({
      next: (data) => {
        this.toastr.success("conta criada com sucesso!");
        this.userForm.reset();
      },
      error: (error) => {
        this.error = error.error.prettyMessage;
        this.toastr.error(error.error.prettyMessage, error);
      },
    });
  }
}
