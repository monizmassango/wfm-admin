import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Vaga } from "../_models/vaga";

@Injectable({
  providedIn: "root",
})
export class VagaService {
  constructor(private http: HttpClient) {}

  create(vaga: Vaga): Observable<any> {
    return this.http.post(`${environment.api}/vagas/createOrUpdate`, vaga);
  }

  imagem(formData: FormData): Observable<any> {
    var HTTPOptions = {
      responseType: "array" as "json",
    };

    return this.http.post<any>(
      `${environment.api}/vagas/image`,
      formData,
      HTTPOptions
    );
  }

  getById(ID): Observable<Vaga> {
    return this.http.get<Vaga>(`${environment.api}/vagas/getById/${ID}`);
  }

  getAll(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${environment.api}/vagas/findAll`);
  }

  remove(ID: number): Observable<any> {
    return this.http.delete(`${environment.api}/vagas/delete/${ID}`);
  }

  userNotApproved() {
    return this.http.get(`${environment.api}/vagas/findAllNotEndedNotApproved`);
  }

  userApproved() {
    return this.http.get(`${environment.api}/vagas/findAllNotEndedApproved`);
  }

  aprovarVaga(id: any) {
    return this.http.put(`${environment.api}/vagas/aprovarVaga/${id}`, {});
  }

  userAll() {
    return this.http.get(`${environment.api}/vagas/findAllNotEnded`);
  }
}
