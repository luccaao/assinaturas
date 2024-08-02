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

 

  produtos(): Observable<any> {
    //APIKEY
    const headers  = new HttpHeaders({
      'APIKEY': '61121cb4ab6e56009ec107466e0c13814d6b4343d783cdf7b6cd6fb95f01aba8'
    });

    return this.httpClient.get( `/api/produto`, { headers });
  }

  apolices(cpf: string): Observable<any> {
    const headers = new HttpHeaders({
        'APIKEY': '61121cb4ab6e56009ec107466e0c13814d6b4343d783cdf7b6cd6fb95f01aba8',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const params = new HttpParams()
        .set('apolice_status', '1')
        .set('documento', cpf)
        .set('data_inicio', '2024-07-01')
        .set('data_fim', '2024-08-01');

    return this.httpClient.post<any>(`https://sistema-h.neobs.com.br/api/apolice/consulta`, params.toString(), { headers }).pipe(
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
