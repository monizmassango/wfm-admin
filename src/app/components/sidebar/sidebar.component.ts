import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/noticias",
    title: "Noticias",
    icon: "icon-single-copy-04",
    class: "",
  },
  {
    path: "/vagas",
    title: "Vagas",
    icon: "icon-badge",
    class: "",
  },
];

// export const ROUTES: RouteInfo[] = [
//   {
//     path: "/dashboard",
//     title: "Dashboard",
//     rtlTitle: "لوحة القيادة",
//     icon: "icon-chart-pie-36",
//     class: ""
//   },
//   {
//     path: "/icons",
//     title: "Icons",
//     rtlTitle: "الرموز",
//     icon: "icon-atom",
//     class: ""
//   },
//   {
//     path: "/maps",
//     title: "Maps",
//     rtlTitle: "خرائط",
//     icon: "icon-pin",
//     class: "" },
//   {
//     path: "/notifications",
//     title: "Notifications",
//     rtlTitle: "إخطارات",
//     icon: "icon-bell-55",
//     class: ""
//   },
//   {
//     path: "/noticias",
//     title: "Noticias",
//     rtlTitle: "طباعة",
//     icon: "icon-single-copy-04",
//     class: ""
//   },
//   {
//     path: "/user",
//     title: "User Profile",
//     rtlTitle: "ملف تعريفي للمستخدم",
//     icon: "icon-single-02",
//     class: ""
//   },
//   {
//     path: "/rtl",
//     title: "RTL Support",
//     rtlTitle: "ار تي ال",
//     icon: "icon-world",
//     class: ""
//   }
// ];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
