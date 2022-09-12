import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(userData: any): Observable<any> {
    return this.http.post(`${environment.api}/user/createUser`, userData);
  }
  findAll(): Observable<any> {
    return this.http.get(`${environment.api}/user/findAll`);
  }
  remove(id: any) {
    return this.http.delete(`${environment.api}/user/delete/${id}`);
  }
  getByName(username: string): Observable<any> {
    return this.http.get(`${environment.api}/user/user/${username}`);
  }
  login(username: string, password: string) {
    return this.http
      .post(`${environment.api}/user/login`, {
        username,
        password,
      })
      .pipe(
        map(() => {
          localStorage.setItem("username", username);
        })
      );
  }
}
