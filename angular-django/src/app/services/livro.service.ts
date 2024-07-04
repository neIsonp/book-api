import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

const baseUrl = 'http://localhost:8080/api/livros';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(baseUrl);
  }

  get(id: any): Observable<Livro> {
    return this.http.get<Livro>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitulo(titulo: any): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${baseUrl}?titulo=${titulo}`);
  }
}
