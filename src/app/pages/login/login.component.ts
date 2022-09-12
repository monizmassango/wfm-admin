import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const token = localStorage.getItem("username");
    if (token) {
      this.router.navigate(["/"]);
    }
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.info("Credenciais invalidas", "Aviso");
      return;
    }
    this.loading = true;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.userService.login(username, password).subscribe({
      next: (data) => {
        this.router.navigate([this.returnUrl]);
      },
      error: () => {
        this.toastr.error("Credenciais invalidas");
        this.loading = false;
      },
    });
  }
}
