import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.httpClient.post(this.KEY, { cpf });
  }

}
