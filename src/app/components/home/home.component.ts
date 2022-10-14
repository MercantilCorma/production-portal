import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import {FetchOrders,Orders} from 'src/app/components/interfaces/orders.interfaces';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   now!: Date;
   user = localStorage.getItem('name_user');
   //folio :any = localStorage.getItem('OrdenProduccion');
  public buscar:string='';
  variables:string='bitacoras';
  variables2:string='bitacoras2';



/*    dia = new Date();
   dateDay =this.dia.getDate() + '-' + ( this.dia.getMonth() + 1 ) + '-' + this.dia.getFullYear() +
       ' / '+ this.dia.getHours() + ':' + this.dia.getMinutes(); */
  //Orders_pro:any;
  constructor(public users: AuthService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.getOrders();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name_user');
    localStorage.removeItem('OrdenProduccion');
    localStorage.removeItem('opcion');
    this.router.navigate(['/login']);
  }

  getOrders() {
    this.users.getOrders().subscribe((res) => {
      this.users.Orders_pro = res;
    });
  }
  formatos(forma:string){
    localStorage.setItem('opcion', forma);
    const url = this.router.serializeUrl(this.router.createUrlTree(['/download']));
    window.open(url);
  }

  formatos2(forma:string){
    localStorage.setItem('opcion', forma);
    const url = this.router.serializeUrl(this.router.createUrlTree(['/download']));
    window.open(url);
  }

  corte(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/corte']);
    const url = this.router.serializeUrl(this.router.createUrlTree(['/corte']));
    window.open(url,'_blank');
  }

  suaje(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/suaje']);
    const url = this.router.serializeUrl(this.router.createUrlTree(['/suaje']));
    window.open(url,'_blank');
  }

  lami(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/lami']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/lami']));
    window.open(url,'_blank');
  }

  empaque(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/empaquetado']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/empaquetado']));
    window.open(url,'_blank');
  }

  liberacion(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/liberacion']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/liberacion']));
    window.open(url,'_blank');
  }

  calidad(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/Control-Calidad']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/Control-Calidad']));
    window.open(url,'_blank');
  }

  OrdenPro(ordenpro:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    //this.router.navigate(['/Control-Calidad']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/View-Orden']));
    window.open(url,'_blank');
  }

  inspection(ordenpro:string,nombre_cliente:string){
    localStorage.setItem('OrdenProduccion', ordenpro);
    localStorage.setItem('nombre_cliente', nombre_cliente);
    //this.router.navigate(['/Control-Calidad']);
    //this.getinfolami();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/Lista-Inspeccion']));
    window.open(url,'_blank');
  }

 /*  getinfolami(){
    this.users.getbitlami(this.folio)
      .subscribe((res) => {
      this.users.infolami = res;
    });
    //console.log(this.clientesServices.infocorte);
  } */


  searchfun(search:string){
    this.buscar = search;
    console.log(search)
  }

  filter2(fecha1: HTMLInputElement, fecha2: HTMLInputElement){
    console.log(fecha1.value);
    console.log(fecha2.value);
    this.users.getfilter(fecha1.value,fecha2.value).subscribe((res) =>{
      this.users.Orders_pro = res;
    });
  }



}
