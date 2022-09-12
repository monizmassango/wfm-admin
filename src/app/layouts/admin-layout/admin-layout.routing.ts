import { NovoUserComponent } from "./../../pages/novo-user/novo-user.component";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { NoticiasComponent } from "../../pages/noticias/noticias.component";
import { NovaNoticiaComponent } from "src/app/pages/nova-noticia/nova-noticia.component";
import { VagasComponent } from "src/app/pages/vagas/vagas.component";
import { NovaVagaComponent } from "src/app/pages/nova-vaga/nova-vaga.component";
import { UserVagasComponent } from "src/app/pages/user-vagas/user-vagas.component";
import { UsersComponent } from "src/app/pages/users/users.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "nova-noticia", component: NovaNoticiaComponent },
  { path: "nova-noticia/:id", component: NovaNoticiaComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "noticias", component: NoticiasComponent },
  { path: "vagas", component: VagasComponent },
  { path: "nova-vaga", component: NovaVagaComponent },
  { path: "nova-vaga/:id", component: NovaVagaComponent },
  { path: "vagas-recebidas", component: UserVagasComponent },
  { path: "novo-user", component: NovoUserComponent },
  { path: "editar-user/:username", component: NovoUserComponent },
  { path: "users", component: UsersComponent },
  // { path: "rtl", component: RtlComponent }
];
