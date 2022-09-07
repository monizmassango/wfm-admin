import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Noticia } from "../_models/noticias";

@Injectable({
  providedIn: "root",
})
export class NoticiaService {
  constructor(private http: HttpClient) {}

  create(noticia: Noticia): Observable<any> {
    return this.http.post(
      `${environment.api}/noticias/createOrUpdate`,
      noticia
    );
  }

  imagem(formData: FormData): Observable<any> {
    var HTTPOptions = {
      responseType: "array" as "json",
    };

    return this.http.post<any>(
      `${environment.api}/noticias/image`,
      formData,
      HTTPOptions
    );
  }

  getById(ID): Observable<Noticia> {
    return this.http.get<Noticia>(`${environment.api}/noticias/getByID/${ID}`);
  }

  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${environment.api}/noticias/findAll`);
  }

  remove(ID: number): Observable<any> {
    return this.http.delete(`${environment.api}/noticias/delete/${ID}`);
  }
}
