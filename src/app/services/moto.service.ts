import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Moto } from '../models/moto';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  url = 'https://atividade-api-jsonserver.herokuapp.com:4000/motos'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as motos
  getMotos(): Observable<Moto[]> {
    return this.httpClient.get<Moto[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma moto pelo id
  getMotoById(id: number): Observable<Moto> {
    return this.httpClient.get<Moto>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma moto
  saveMoto(moto: Moto): Observable<Moto> {
    return this.httpClient.post<Moto>(this.url, JSON.stringify(moto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza uma moto
  updateMoto(moto: Moto): Observable<Moto> {
    return this.httpClient.put<Moto>(this.url + '/' + moto.id, JSON.stringify(moto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma moto
  deleteMoto(moto: Moto) {
    return this.httpClient.delete<Moto>(this.url + '/' + moto.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
