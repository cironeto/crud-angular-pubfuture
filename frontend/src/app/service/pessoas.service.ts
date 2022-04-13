import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pessoa } from '../modelo/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) { 
  }

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>('http://localhost:3000/pessoas');
  }

  cadastrar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>('http://localhost:3000/pessoas', pessoa);
  }

  alterar(id:number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>('http://localhost:3000/pessoas/' + id, pessoa);
  }

  remover(id:number): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/pessoas/' + id);
  }

}
