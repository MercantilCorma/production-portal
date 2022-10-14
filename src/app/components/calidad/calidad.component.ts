import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { infoInputs, OrdersProductions, OrdersProductions2, selectorden } from '../interfaces/orders.interfaces';
import { switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.css']
})
export class CalidadComponent implements OnInit {

  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  user = localStorage.getItem('name_user');
  name_complet!: string;
  ordersselect: selectorden[] =[];
  inputss:      infoInputs  [] = [];
  inputss2:     OrdersProductions2  [] = [];
  num=0;
  num2=0;
  numero=0;
  ordenpro!:string;
  prueba!:number;
  codigo!:string;
  muestra!:number
  sucursal: string | undefined;
  cliente:  string | undefined;
  inspection!:  string | undefined;

  miForm: FormGroup = this.fb.group({
    ordenpro2        :  ['', Validators.required],
    cliente          :  ['', Validators.required],
    sucursal         :  ['', Validators.required],
    num_parte        :  ['', Validators.required],
    cantidad         :  ['', Validators.required],
    codigo           :  ['', Validators.required],
    muestra          :  ['', Validators.required],
    piezasA          :  ['', Validators.required],
    piezasR          :  ['', Validators.required],
    total            :  ['', Validators.required],
    observaciones    :  ['', Validators.required],
    elaboro          :  ['', Validators.required],
  });

  miForm3: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    numAC           :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
    inspection      :  ['', Validators.required],
  });

/*     inicial          :  ['', Validators.required],
    dato1            :  ['', Validators.required],
    dato2            :  ['', Validators.required],
    observaciones    :  ['', Validators.required],
     */
  constructor(public service:AuthService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {

    this.getuser();


      this.miForm.get('ordenpro2')?.valueChanges
      .pipe(
        tap(()=> {
          this.ordersselect=[];
        }),
        switchMap((ordenpro2) => this.service.getinspeccioncorte(ordenpro2))
      )
      .subscribe(
        (res) =>{
          //this.getinfoinspeccion2(); para la tabla a la hora de entrar
          //console.log('hola');
        this.ordersselect = res || [];
        this.getinfocontrolconsult();
      });


      this.miForm.get('num_parte')?.valueChanges
      .pipe(
        tap(()=> {
          this.inputss2=[];
        }),
        switchMap((num_parte,ordenpro) => this.service.getcalidad(num_parte,this.miForm.value['ordenpro2']))
      )
      .subscribe(
        res =>{
        this.numero =1;
        this.inputss2 = res || [];
        this.prueba = this.inputss2[0]['cantidad'];
        this.obtener(); //si
        this.infocontrol();//si
        //this.getinfocontrolconsult();
      });

  }


  //funciones
  getuser(){
    this.service.getuser(this.user)
    .subscribe((res) => {
      this.service.user = res;
      this.name_complet = res[0]['name_complet'];
    });
  }

  getinfocontrolconsult(){
    this.service.getcontrolconsult(this.miForm.value['ordenpro2'])
      .subscribe((res) => {
          this.service.infofin2 = res;
          console.log(res);
          this.num=1;


    });
    //console.log(this.clientesServices.infocorte);
    //this.num =1;
  }

  infocontrol(){
    this.service.getinfocontrol(this.miForm.value['ordenpro2'])
    .subscribe((res) => {
      this.service.infofin = res;
      this.sucursal = res[0]['sucursal'];
      this.cliente  = res[0]['nombre_cliente'];
    });

  }

  postCalidad(){
    this.service.postcontrol(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.getinfocontrolconsult();
    }

  checksi(){
        this.num2 =1;
        this.service.getelaborar(this.miForm.value['ordenpro2'])
        .subscribe((res) => {
          this.service.infofin = res;
          //this.inspection = res[0]['elaboro'] + ' ' + '' + ' ' + res[1]['elaboro'];
          this.inspection = res[0]['elaboro'];
          //this.getinfocontrolconsult();

        });
  }
  checkno(){
    this.num2 =0;
    this.service.getelaborar(this.miForm.value['ordenpro2'])
    .subscribe((res) => {
      this.service.infofin = res;
      console.log(res[0]['elaboro']);
      //this.inspection = res[0]['elaboro'] + ' ' + '' + ' ' + res[1]['elaboro'];
      this.inspection = res[0]['elaboro'];
      this.miForm3.get('numAC')?.reset('-');
      //this.getinfocontrolconsult();
    });
  }



  comparacion(cantidad:number,min:number,max:number)
   {
    return cantidad >= min && cantidad <= max;
    }

  obtener(){
    if( this.comparacion(this.prueba,2,8) ){
      console.log('A');
      this.codigo = 'A';
      this.muestra = 2;
    }else if(this.comparacion(this.prueba,9,15)){
      console.log('A');
      this.codigo = 'A';
      this.muestra = 2;
    }else if(this.comparacion(this.prueba,16,25)){
      console.log('B');
      this.codigo = 'B';
      this.muestra = 3;
    }else if(this.comparacion(this.prueba,26,50)){
      console.log('C');
      this.codigo = 'C';
      this.muestra = 5;
    }else if(this.comparacion(this.prueba,51,90)){
      console.log('C');
      this.codigo = 'C';
      this.muestra = 5;
    }else if(this.comparacion(this.prueba,91,150)){
      console.log('D');
      this.codigo = 'D';
      this.muestra = 8;
    }else if(this.comparacion(this.prueba,151,250)){
      console.log('E');
      this.codigo = 'E';
      this.muestra = 13;
    }else if(this.comparacion(this.prueba,251,500)){
      console.log('F');
      this.codigo = 'F';
      this.muestra = 20;
    }else if(this.comparacion(this.prueba,501,1200)){
      console.log('G');
      this.codigo = 'G';
      this.muestra = 32;
    }else if(this.comparacion(this.prueba,1201,3200)){
      console.log('H');
      this.codigo = 'H';
      this.muestra = 50;
    }else if(this.comparacion(this.prueba,3201,10000)){
      console.log('J');
      this.codigo = 'J';
      this.muestra = 80;
    }else if(this.comparacion(this.prueba,10001,35000)){
      console.log('K');
      this.codigo = 'K';
      this.muestra = 125;
    }else if(this.comparacion(this.prueba,35001,150000)){
      console.log('L');
      this.codigo = 'L';
      this.muestra = 200;
    }

  }

  postCalidad2(){
    this.service.postcontrol2(this.miForm3.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      //this.getinfoinspeccion2();
      //se puede agregar un alert
      this.finalizar();
    }

  finalizar(){
    Swal.fire(
      'Buen Trabajo!',
      '',
      'success'
    );
       this.router.navigate(['/home']);
  }

  delateinfo(id_liberacion:number){
    if(confirm('¿Seguro que quieres Eliminarlo?')){
    this.service.delateLiberacion(id_liberacion)
    .subscribe(
      res => {
        this.getinfocontrolconsult();
      },err => {
        console.log(err)
      });

    }
  }
}
