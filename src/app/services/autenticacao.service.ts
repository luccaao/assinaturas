import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly KEY = '/api/acesso?email=vendedor@neobs.com.br&senha=1q2w3e';

   


  constructor(private httpClient: HttpClient) { }

  getTokens(): Observable<any> {
    return this.httpClient.get(this.KEY);
  }

  loginCpf(cpf: string): Observable<any> {
    const headers = new HttpHeaders({
      'APIKEY': '34495f86cd30ec51a8887dbc9cffe48b053871bf306aaf559c047726d0df480b'
    });

    return this.httpClient.get(`/api/info?doc=${cpf}&produto_parceiro_id=139`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  produtos(): Observable<any> {
    //APIKEY
    const headers  = new HttpHeaders({
      'APIKEY': '7bba728174958305aafeee881cd5b239f650a0ef44cd312ab63ae31ef8c1cdd9'
    });

    return this.httpClient.get( `/api/produto`, { headers });
  }

  apolices(cpf: string): Observable<any> {
    const headers = new HttpHeaders({
        'APIKEY': '7bba728174958305aafeee881cd5b239f650a0ef44cd312ab63ae31ef8c1cdd9',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const params = new HttpParams()
        .set('apolice_status', '3')
        .set('documento', cpf)
        .set('data_inicio', '2024-07-01')
        .set('data_fim', '2024-08-01');

    return this.httpClient.post<any>(`/api/apolice/consulta`, params.toString(), { headers }).pipe(
        catchError(this.handleError)
    );
}


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Server-side error: ${error.status} ${error.statusText}\nDetails: ${error.message}`;
      if (error.error instanceof ProgressEvent) {
        errorMessage += '\nNo response body available';
      } else {
        try {
          const serverError = JSON.stringify(error.error);
          errorMessage += `\nResponse body: ${serverError}`;
        } catch (e) {
          errorMessage += `\nResponse body: ${error.error}`;
        }
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }



  
}