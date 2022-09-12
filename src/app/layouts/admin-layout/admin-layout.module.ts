import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { NoticiasComponent } from "../../pages/noticias/noticias.component";
import { NovaNoticiaComponent } from "../../pages/nova-noticia/nova-noticia.component";
import { VagasComponent } from "../../pages/vagas/vagas.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NovaVagaComponent } from "src/app/pages/nova-vaga/nova-vaga.component";
import { UserVagasComponent } from "src/app/pages/user-vagas/user-vagas.component";
import { NovoUserComponent } from "src/app/pages/novo-user/novo-user.component";
import { UsersComponent } from "src/app/pages/users/users.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    NoticiasComponent,
    IconsComponent,
    NotificationsComponent,
    NovaNoticiaComponent,
    VagasComponent,
    NovaVagaComponent,
    UserVagasComponent,
    NovoUserComponent,
    UsersComponent,
  ],
})
export class AdminLayoutModule {}
