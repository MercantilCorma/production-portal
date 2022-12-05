import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {bdproduction, bitcortedisco,bitrebobinado, bitroquelado} from '../components/interfaces/operations.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewoperationsService {
bitcortedisco!: bitcortedisco[];
bitrebobinado!: bitrebobinado[];
bitroquelado!: bitroquelado[];
bdproduction!: bdproduction[];
//private URL = 'http://localhost:3000';
//private URL = 'https://server-production-corma.herokuapp.com';
  private URL = 'https://server-production-mercantil-corma.onrender.com';


  constructor(private http: HttpClient, private router:Router) { }

postbitcortedisco(bitcortedisco:bitcortedisco) {
  return this.http.post(`${this.URL}/users/create/info/discorte`,bitcortedisco);
}
getbitcortedisco(ordenpro:string){
  return this.http.get<bitcortedisco[]>(`${this.URL}/users/get/info/discorte/${ordenpro}`);
}

delatebitcortedisco(id_bitcortedisco:number){
  return this.http.delete<bitcortedisco>(`${this.URL}/users/delate/cortedisco/${id_bitcortedisco}`);
}
/////
postbitrebobinado(bitrebobinado:bitrebobinado) {
  return this.http.post(`${this.URL}/users/create/info/rebobinado`,bitrebobinado);
}
getbitrebobinado(ordenpro:string){
  return this.http.get<bitrebobinado[]>(`${this.URL}/users/get/info/rebobinado/${ordenpro}`);
}

delatebitrebobinado(id_bitcorterebobinado:number){
  return this.http.delete<bitrebobinado>(`${this.URL}/users/delate/rebobinado/${id_bitcorterebobinado}`);
}

/////

postbitroquelado(bitroquelado:bitroquelado) {
  return this.http.post(`${this.URL}/users/create/info/troquelado`,bitroquelado);
}
getbitroquelado(ordenpro:string){
  return this.http.get<bitroquelado[]>(`${this.URL}/users/get/info/troquelado/${ordenpro}`);
}

delatebitroquelado(id_bittroqueladora:number){
  return this.http.delete<bitroquelado>(`${this.URL}/users/delate/troquelado/${id_bittroqueladora}`);
}

postnumparte(bdproduction:bdproduction) {
  return this.http.post(`${this.URL}/users/create/info/bdproduction`,bdproduction);
}
}
