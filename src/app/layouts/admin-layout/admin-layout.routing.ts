import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { NoticiasComponent } from "../../pages/noticias/noticias.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { NovaNoticiaComponent } from "src/app/pages/nova-noticia/nova-noticia.component";
import { VagasComponent } from "src/app/pages/vagas/vagas.component";
import { NovaVagaComponent } from "src/app/pages/nova-vaga/nova-vaga.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "nova-noticia", component: NovaNoticiaComponent },
  { path: "nova-noticia/:id", component: NovaNoticiaComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "noticias", component: NoticiasComponent },
  { path: "vagas", component: VagasComponent },
  { path: "nova-vaga", component: NovaVagaComponent },
  { path: "nova-vaga/:id", component: NovaVagaComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
