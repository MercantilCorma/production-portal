import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {users,infoClient,infoPlant,Orders,infoPart,infoInputs,OrdersProductions,infoOrdersProductions,infosum, date,bitcorte,bitsuaje,bitlami, selectorden,inspection, papel, vigilar, OrdersProductions2, control, selectordenCal, folio_inspect, salida, avance, avance2, stock, AdminStock, list_inspectio, observaciones} from '../components/interfaces/orders.interfaces';


import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
//private URL = 'http://localhost:3000';
private URL = 'https://server-production-corma.herokuapp.com';
  authToken: any;

  Orders_pro!: Orders[];
  infoOrders!:infoOrdersProductions[];
  infosum!:infosum[];
  user!:users[];
  name!:infoPlant[];
  ordendepro!:selectorden[];
  ordendeproCal!:selectordenCal[];
  info!:inspection[];
  papel!:papel[];
  folio!:folio_inspect[];
  vigilar!: vigilar[];
  salida2!: salida[];
  calidad!:OrdersProductions2[];
  infofin!:control[];
  infofin2!:control[];

  bitcorte!:bitcorte[];
  bitsuaje!:bitsuaje[];
  bitlami!: bitlami[];
  control!:control[];
  control2!:control[];
  salida!:salida[];
  empaque!: vigilar[];
  suaje!:vigilar[];
  avance!:avance[];
  stock!:stock[];
  observaciones!:observaciones[];
  inventario!:AdminStock[];
  lista!: list_inspectio[];

  exist!: infoInputs[];


  private _clientes: string[]=['Hella','Seal&Foam','Magneti Marelli','KH Mexico','Yomar','Articulos Innovadores Leo','Lucia Espinoza Rodriguez'];
  get clientes():string[]{
    return [...this._clientes];
  }

private _operacion: string[]=['Arranque','Paro de Actividad', 'Cambio de Parámetros'];
get operacion():string[]{
  return [...this._operacion];
}


  //bitacoras
  infocorte!:bitcorte[];
  infosuaje!:bitsuaje[];
  infolami!:bitlami[];


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router:Router) {

  }

  //Ruta Login
  singin(user: any) {
    return this.http.post(`${this.URL}/users/singin`, user);
  }
  //Obteniendo Token
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    this.authToken = token;
    if (
      this.jwtHelper.isTokenExpired(this.authToken) || !localStorage.getItem('token')
    ) {
      return false;
    }
    return true;
  }

  //Logout
/*   logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  } */

//name user
getuser(name: string | null){
  return this.http.get<users[]>(`${this.URL}/users/user/${name}`);
}

  //Obtener Ordenes de Producción.
getOrders() {
    return this.http.get<Orders[]>(`${this.URL}/users/Oreders/Productions`);
}
getfilter(fecha1:string,fecha2:string) {
  return this.http.get<Orders[]>(`${this.URL}/users/get/filter/${fecha1}/${fecha2}`);
}

//selectores
getclientes(cliente:string):Observable<infoClient[]>{
  return this.http.get<infoClient[]>(`${this.URL}/users/options/${cliente}`);
}

getplants(city:string,name_client:string):Observable<infoPlant[] | null>{
  if(!city){
    return of(null)
  }else{
      return this.http.get<infoPlant[]>(`${this.URL}/users/plants/${city}/${name_client}`);
  }
}

getpart(sucursal:string):Observable<infoPart[] | null>{
  if(!sucursal){
    return of(null)
  }else{
      return this.http.get<infoPart[]>(`${this.URL}/users/part/${sucursal}`);
  }
}


getInputs(num_parte:string):Observable<infoInputs[] | null>{
  if(!num_parte){
    return of(null)
  }else{
      return this.http.get<infoInputs[]>(`${this.URL}/users/inputs/${num_parte}`);
  }
}

getexiststock(num_parte:string){
      return this.http.get<infoInputs[]>(`${this.URL}/users/inputs/${num_parte}`);
}

//info calidad
getcalidad(num_parte:string,ordenpro:string):Observable<OrdersProductions2[] | null>{
  if(!num_parte){
    return of(null)
  }else{
      return this.http.get<OrdersProductions2[]>(`${this.URL}/users/information/calidad/${num_parte}/${ordenpro}`);
  }
}


//Post Ordenes de Compra
postOrders(orden_produc:OrdersProductions) {
  return this.http.post(`${this.URL}/users/create/oreders`,orden_produc);
}

postcal(date:date){
  return this.http.post(`${this.URL}/users/create/calculations`,date);
}


getinfoOrders(ordenpro:string){
       return this.http.get<infoOrdersProductions[]>(`${this.URL}/users/consult/inforders/${ordenpro}`);
}

getinfosum(ordenpro:string){
  return this.http.get<infosum[]>(`${this.URL}/users/sum/${ordenpro}`);
}

getinfosumcajas(ordenpro:string){
  return this.http.get<infosum[]>(`${this.URL}/users/sumcajas/${ordenpro}`);
}
//delate infoOrders una a una

delateinfoOrders(id_order:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/${id_order}`);
}

delateinfoOrdersCalculations(id:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/calculations/${id}`);
}

StockinfoOrders(id_order:number){
  return this.http.get<stock[]>(`${this.URL}/users/get/stock/${id_order}`);
}

//Bitacoras
//corte
postbitcorte(bitcorte:bitcorte) {
  return this.http.post(`${this.URL}/users/post/corte`,bitcorte);
}

getbitcorte(ordenpro:string,fecha:string){
  return this.http.get<bitcorte[]>(`${this.URL}/users/consult/${ordenpro}/${fecha}`);
}

//cortetwo
postbitcortetwo(bitcorte:bitcorte) {
  return this.http.post(`${this.URL}/users/post/cortetwo`,bitcorte);
}

getbitcortetwo(ordenpro:string,fecha:string){
  return this.http.get<bitcorte[]>(`${this.URL}/users/consulttwo/${ordenpro}/${fecha}`);
}
getbitcortetwotwo(ordenpro:string){
  return this.http.get<bitcorte[]>(`${this.URL}/users/consulttwotwo/${ordenpro}`);
}
getbitsuajetwotwo(ordenpro:string){
  return this.http.get<bitsuaje[]>(`${this.URL}/users/suajeconsulttwotwo/${ordenpro}`);
}

//suaje
postbitsuaje(bitsuaje:bitsuaje) {
  return this.http.post(`${this.URL}/users/post/suaje`,bitsuaje);
}
getbitsuaje(ordenpro:string,fecha:string){
  return this.http.get<bitsuaje[]>(`${this.URL}/users/consult/suaje/${ordenpro}/${fecha}`);
}

//suajetwo
postbitsuajetwo(bitsuaje:bitsuaje) {
  return this.http.post(`${this.URL}/users/post/suajetwo`,bitsuaje);
}
getbitsuajetwo(ordenpro:string,fecha:string){
  return this.http.get<bitsuaje[]>(`${this.URL}/users/consult/suajetwo/${ordenpro}/${fecha}`);
}

//laminadora
postbitlami(bitlami:bitlami) {
  return this.http.post(`${this.URL}/users/post/lami`,bitlami);
}
getbitlami(ordenpro:string,fecha:string){
  return this.http.get<bitlami[]>(`${this.URL}/users/consult/lami/${ordenpro}/${fecha}`);
}


//Download Orden de Producción
getdownloadSelectlami(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/lami`);
}

getdownloadSelect(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden`);
}
getdownloadOrden(ordenpro:string){
  return this.http.get<selectorden[]>(`${this.URL}/users/download/orden/${ordenpro}`);
}

getdownloadOrdenCalculations(ordenpro:string){
  return this.http.get<selectordenCal[]>(`${this.URL}/users/download/orden/calculation/${ordenpro}`);
}

//Download BitCorte
getdownloadBitCorte(ordenpro:string){
  return this.http.get<bitcorte[]>(`${this.URL}/users/download/bitacora/corte/${ordenpro}`);
}

//Download BitSuaje
getdownloadBitSuaje(ordenpro:string){
  return this.http.get<bitsuaje[]>(`${this.URL}/users/download/bitacora/suaje/${ordenpro}`);
}

//Download BitLaminado
getdownloadBitLami(ordenpro:string){
  return this.http.get<bitlami[]>(`${this.URL}/users/download/bitacora/laminado/${ordenpro}`);
}

//Download BitLaminado
getdownloaInspectionCorte(ordenpro:string){
  return this.http.get<inspection[]>(`${this.URL}/users/download/inspection/bitacora/${ordenpro}`);
}
getdownloaInspectionpapel(ordenpro:string){
  return this.http.get<papel[]>(`${this.URL}/users/download/inspection/papel/${ordenpro}`);
}
getdownloaInspectionfolio(ordenpro:string){
  return this.http.get<folio_inspect[]>(`${this.URL}/users/download/inspection/folio/${ordenpro}`);
}
getdownloaInspectionvigilar(ordenpro:string){
  return this.http.get<vigilar[]>(`${this.URL}/users/download/inspection/vigilar/${ordenpro}`);
}
//Download inspection2
getdownloaInspection2(ordenpro:string){
  return this.http.get<inspection[]>(`${this.URL}/users/download/inspection2/bitacora2/${ordenpro}`);
}

getdownloaInspectionlib2(ordenpro:string){
  return this.http.get<vigilar[]>(`${this.URL}/users/download/inspection2/bitacora2/liberacion/${ordenpro}`);
}

getdownloaInspectionlibSalida2(ordenpro:string){
  return this.http.get<salida[]>(`${this.URL}/users/download/inspection2/bitacora2/liberacion/salida2/${ordenpro}`);
}

getdownloaInspectionEmp2(ordenpro:string){
  return this.http.get<vigilar[]>(`${this.URL}/users/download/inspection2/bitacora2/empaque/${ordenpro}`);
}
getdownloaInspectionvigilar2(ordenpro:string){
  return this.http.get<vigilar[]>(`${this.URL}/users/download/inspection2/vigilar2/${ordenpro}`);
}


//Download Control de Calidad
getdownloadControlClient(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/download/control/calidad/client/${ordenpro}`);
}
getdownloadControl(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/download/control/calidad/${ordenpro}`);
}
getdownloadSalida(ordenpro:string){
  return this.http.get<salida[]>(`${this.URL}/users/download/control/salida2/${ordenpro}`);
}



//inspeccion bitacora de corte
getinspeccioncorte(ordenpro:string):Observable<selectorden[] | null>{
  if(!ordenpro){
    return of(null)
  }else{
  return this.http.get<selectorden[]>(`${this.URL}/users/inspeccion/corte/${ordenpro}`);
  }
}

postinspection(inspection:inspection) {
  return this.http.post(`${this.URL}/users/post/inspection`,inspection);
}
getinspecdate(ordenpro2:string){
  return this.http.get<inspection[]>(`${this.URL}/users/inspeccion/${ordenpro2}`);
}

//papel
postpapel(papel:papel) {
  return this.http.post(`${this.URL}/users/post/papel`,papel);
}
//folio
postfolio(papel:papel) {
  return this.http.post(`${this.URL}/users/post/folio`,papel);
}

//vigilar
postvigilar(vigilar:vigilar) {
  return this.http.post(`${this.URL}/users/post/vigilar`,vigilar);
}
//inspection2
postinspection2(inspection:inspection) {
  return this.http.post(`${this.URL}/users/post/inspection2`,inspection);
}
getinspecdate2(ordenpro2:string){
  return this.http.get<inspection[]>(`${this.URL}/users/inspeccion2/${ordenpro2}`);
}

postvigilar2(vigilar:vigilar) {
  return this.http.post(`${this.URL}/users/post/vigilar2`,vigilar);
}


postempaque(vigilar:vigilar) {
  return this.http.post(`${this.URL}/users/post/empaque`,vigilar);
}

postliberacion(vigilar:vigilar) {
  return this.http.post(`${this.URL}/users/post/liberacion`,vigilar);
}

//////liberacion

getinfocontrol(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/infocontrol/${ordenpro}`);
}

postcontrol(control:control) {
  return this.http.post(`${this.URL}/users/post/control`,control);
}

getelaborar(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/elaborar/${ordenpro}`);
}

getelaborar2(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/elaborar2/${ordenpro}`);
}

getcontrolconsult(ordenpro:string){
  return this.http.get<control[]>(`${this.URL}/users/getcontrolconsult/${ordenpro}`);
}

postcontrol2(control:control) {
  return this.http.post(`${this.URL}/users/post/control2`,control);
}

postsalida2(control:control) {
  return this.http.post(`${this.URL}/users/post/salida2`,control);
}

list(lista:list_inspectio) {
  return this.http.post(`${this.URL}/users/post/list`,lista);
}

getList(ordenpro:string){
  return this.http.get<list_inspectio[]>(`${this.URL}/users/get/list/${ordenpro}`);
}

////////////Avance

getCorteAvance1(ordenpro:string){
  return this.http.get<avance[]>(`${this.URL}/users/corte/avance1/${ordenpro}`);
}

getCorteAvance2(ordenpro:string){
  return this.http.get<avance[]>(`${this.URL}/users/corte/avance2/${ordenpro}`);
}

getAvanceSuaje(ordenpro:string){
  return this.http.get<avance[]>(`${this.URL}/users/suaje/avance2/${ordenpro}`);
}

putAvance(avance:avance2,ordenpro:string) {
  return this.http.put<avance[]>(`${this.URL}/users/update/${ordenpro}`,avance);
}
// Update Stock
putStock(stock:stock,num_parte:string) {
  return this.http.put(`${this.URL}/users/update/stock/${num_parte}`,stock);
}

putObserve(observaciones:observaciones,num_parte:string) {
  return this.http.put(`${this.URL}/users/update/observe/${num_parte}`,observaciones);
}

getAdminStock() {
  return this.http.get<AdminStock[]>(`${this.URL}/users/consult/stock`);
}

subir(formData:any){
return this.http.post(`${this.URL}/users/api/subir`,formData);
}




delateinfoOrdersCorte(id_corte:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/corte/${id_corte}`);
}
delateinfoOrdersCortetwo(id_corte:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/cortetwo/${id_corte}`);
}

delateinfoOrdersSuaje(id_suaje:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/suaje/${id_suaje}`);
}

delateinfoOrdersSuajetwo(id_suaje:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/suajetwo/${id_suaje}`);
}

delateinfoOrdersLami(id_lami:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/lami/${id_lami}`);
}

delateinfoInspection1(id:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/inspection/${id}`);
}

delateinfovigilar1(id_vigilar:number){
  return this.http.delete<vigilar>(`${this.URL}/users/delate/vigilar/${id_vigilar}`);
}

delateinfovigilar2(id_vigilar:number){
  return this.http.delete<vigilar>(`${this.URL}/users/delate/vigilar2/${id_vigilar}`);
}

delateinfoempaque(id_vigilar:number){
  return this.http.delete<vigilar>(`${this.URL}/users/delate/empaque/${id_vigilar}`);
}

delateinfoliberacion(id_vigilar:number){
  return this.http.delete<vigilar>(`${this.URL}/users/delate/liberacion/${id_vigilar}`);
}

delateinfosalida2(id_salida:number){
  return this.http.delete<salida>(`${this.URL}/users/delate/salida2/${id_salida}`);
}

delateinfosalida(id_salida:number){
  return this.http.delete<salida>(`${this.URL}/users/delate/salida/${id_salida}`);
}

delateinfoInspection2(id:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/inspection2/${id}`);
}

delateLiberacion(id_liberacion:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/liberacion/control/${id_liberacion}`);
}

delateinfoPapel(id_papel:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/papel/${id_papel}`);
}

delateinfoFolio(id_folio:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/folio/${id_folio}`);
}

delateinfolista(id_list_inspection:number){
  return this.http.delete<infosum>(`${this.URL}/users/delate/listaf/${id_list_inspection}`);
}

//selects
getdownloadCorteDisco(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/cortedisco`);
}
getdownloadCorteRebobinado(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/corterebobinado`);
}
getdownloadTroquelado(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/troquelado`);
 }

 getdownloadcortetwo(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/cortetwo`);
 }

 getdownloadsuajetwo(){
  return this.http.get<selectorden[]>(`${this.URL}/users/select/orden/suajetwo`);
 }
}
