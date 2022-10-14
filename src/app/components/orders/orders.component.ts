import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { infoClient, infoInputs, infoPart, infoPlant, OrdersProductions } from '../interfaces/orders.interfaces';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  now!: Date;
  user = localStorage.getItem('name_user');
  orden_produccion!: string;
  foliodeprueba!:String;
  //fecha2!:number;
  cliente2!:string;
  dia = new Date();
  fecha2 =this.dia.getDate() + '' + ( this.dia.getMonth() + 1 ) + '' + (this.dia.getFullYear()+'').slice(-2);
  stockfinal=0;
  stockfinal2=0;
  num=0;
  cantidadpartes!: number;


  miForm: FormGroup = this.fb.group({
    folio            :  ['FO-PRO-01/R4', Validators.required],
    nombre_cliente   :  ['', Validators.required],
    ciudad           :  ['', Validators.required],
    sucursal         :  ['', Validators.required],
    fecha_entrega    :  ['', Validators.required],
    sem_entrega      :  ['', Validators.required],
    ordenpro         :  ['', Validators.required],
    num_parte        :  ['', Validators.required],
    num_articulo     :  ['', Validators.required],
    descripcion      :  ['', Validators.required],
    num_orden_com    :  ['', Validators.required],
    clave            :  ['', Validators.required],
    medida           :  ['', Validators.required],
    pieza_medida     :  ['', Validators.required],
    cantidad         :  ['', Validators.required],
    hojas_cortar     :  ['', Validators.required],
    piezas_caja      :  ['', Validators.required],
    num_paquetes     :  ['', Validators.required],
    cajas_utilizar   :  ['', Validators.required],
    elaboro          :  ['', Validators.required],
    autorizo         :  ['Antonio Corona', Validators.required],
    stock            :  ['', Validators.required],
  });

  miForm2: FormGroup = this.fb.group({
  no_orden     :  ['', Validators.required],
  total        :  ['', Validators.required],
  peso_bruto   :  ['', Validators.required],
  peso_neto    :  ['', Validators.required],
  total_cajas  :  ['', Validators.required],
  });

  ciudades   : infoClient[] = [];
  plantas    : infoPlant [] = [];
  partes     : infoPart  [] = [];
  inputss    : infoInputs  [] = [];
  orders     : any;

  //lenar selectores
  clienteselect: string[] = [];
  plantselect  : string[] = [];
  partslect    : string[]=  [];
  //formulas
  cantidad2 =0;
  hojas_cortar=0;
  num_paquetes =0;
  cajas_utilizar =0;
  total!:number;
  peso_bruto!:number;
  peso_neto!:number;
  total_cajas!:number;
  name_complet!: string;
  folio=0;


  constructor(private fb: FormBuilder, public clientesServices: AuthService, public router:Router) {}

  ngOnInit(): void {
    this.getuser();
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.clienteselect = this.clientesServices.clientes;
    //selector ciudad estado
    this.miForm.get('nombre_cliente')?.valueChanges
    .pipe(
      tap((_) => {
          this.miForm.get('ciudad')?.reset('');
          //this.miForm.get('ordenpro')?.reset('');
        }),
        switchMap((cliente) => this.clientesServices.getclientes(cliente))
      )
      .subscribe((ciudad) => {
        this.ciudades = ciudad;
//folio
        this.cliente2 = this.miForm.value['nombre_cliente'];
        this.fecha2 =(this.dia.getDate() < 10 ? '0' : '') + (this.dia.getDate()) + '' + (( this.dia.getMonth() + 1 )<10 ? '0':'' ) + (this.dia.getMonth()+1)+ '' + (this.dia.getFullYear()+'').slice(-2);
/*         this.foliodeprueba = `${(this.cliente2.substr(0,3).toUpperCase())}${this.fecha2}`;
        console.log(this.foliodeprueba); */
        this.nombre();

        console.log(this.miForm.value['nombre_cliente']);
      });

      //selector Planta
      this.miForm.get('ciudad')?.valueChanges
      .pipe(
        tap(()=>{
            this.plantas=[];
            this.miForm.get('sucursal')?.reset('');
        }),
        switchMap((city,name_client) => this.clientesServices.getplants(city,this.miForm.value['nombre_cliente']))
      )
      .subscribe((sucursal)=>{
        this.plantas = sucursal || [];
      });

    //selector num. de parte
      this.miForm.get('sucursal')?.valueChanges
      .pipe(
        tap(()=>{
            this.partes=[];
            this.miForm.get('num_parte')?.reset(''),
            this.miForm.get('num_articulo')?.reset(''),
            this.miForm.get('descripcion')?.reset(''),
            this.miForm.get('num_orden_com')?.reset(''),
            this.miForm.get('clave')?.reset('');
            this.miForm.get('medida')?.reset('');
            this.miForm.get('pieza_medida')?.reset('');
            this.miForm.get('cantidad')?.reset('');
            this.miForm.get('hojas_cortar')?.reset('');
            this.miForm.get('piezas_caja')?.reset('');
            this.miForm.get('num_paquetes')?.reset('');
            this.miForm.get('cajas_utilizar')?.reset('');
        }),
        switchMap((sucursal) => this.clientesServices.getpart(sucursal))
      )
      .subscribe((num_parte)=>{
        this.partes = num_parte || [];

      });

      //Llenar inputs
        this.miForm.get('num_parte')?.valueChanges
        .pipe(
          tap(()=>{
              this.inputss=[];
              this.miForm.get('hojas_cortar')?.reset('');
              this.miForm.get('num_paquetes')?.reset('');
              this.miForm.get('cajas_utilizar')?.reset('');
          }),
          switchMap((num_parte) => this.clientesServices.getInputs(num_parte))
        )
        .subscribe((input)=>{
          this.inputss = input || [];
        });
}
///////////////

getuser(){
  this.clientesServices.getuser(this.user)
  .subscribe((res) => {
    this.clientesServices.user = res;
    this.name_complet = res[0]['name_complet'];
  });
}

  PostOrdenPro(){
  this.clientesServices.postOrders(this.miForm.value)
  .subscribe(
    res=> {
      console.log(res);
    });

    this.getinfoOrdenPro();
    this.getsum();
    this.getsumcajas();
    this.stock();
    this.PartAddStock();
  }

  PartAddStock(){
    if(this.miForm.value['num_parte'] == '467-301-01'){
      if(this.miForm.value['cantidad'] >= this.miForm.value['stock']){
      //this.cantidadpartes = (this.miForm.value['cantidad']) - (this.miForm.value['stock']); funcion original para stock
      this.cantidadpartes = (this.miForm.value['cantidad']);
      this.clientesServices.getexiststock('467-903-08')
      .subscribe(res =>{
        this.clientesServices.exist = res;
        this.stockfinal= res[0]['stock'] + this.cantidadpartes;
        //this.stockfinal=this.miForm.value['stock'];
        let prueba ={
          stock: this.stockfinal,
        }

        this.clientesServices.putStock(prueba,'467-903-08')
        .subscribe(
          res=> {
            console.log(res);
          });
        });
      }

      }else if (this.miForm.value['num_parte'] == '467-301-02'){
        if(this.miForm.value['cantidad'] >= this.miForm.value['stock']){
        //this.cantidadpartes = (this.miForm.value['cantidad']) - (this.miForm.value['stock']); funcion original para stock
        this.cantidadpartes = (this.miForm.value['cantidad']);
        this.clientesServices.getexiststock('467-903-05')
        .subscribe(res =>{
          this.clientesServices.exist = res;
          this.stockfinal= res[0]['stock'] + this.cantidadpartes;
          //this.stockfinal=this.miForm.value['stock'];
          let prueba ={
            stock: this.stockfinal,
          }
          this.clientesServices.putStock(prueba,'467-903-05')
          .subscribe(
            res=> {
              console.log(res);
            });
          });
        }
     }

  }

  Calcular(){
    //this.hojas_cortar = this.abs(Math.ceil((this.miForm.value['cantidad'] - this.miForm.value['stock'] ) / this.miForm.value['pieza_medida']));
/*  Funcion Original para hacer el calculo con el stock "jalando stock en general"
    this.hojas_cortar = Math.ceil((this.miForm.value['cantidad'] - this.miForm.value['stock'] ) / this.miForm.value['pieza_medida']);
    if(this.hojas_cortar <=0){
      this.hojas_cortar=0;
    }
    this.num_paquetes = (this.miForm.value['cantidad'] / 250);
    this.cajas_utilizar = (this.miForm.value['cantidad'] / this.miForm.value['piezas_caja']);
    this.getinfoOrdenPro(); */

    if(this.miForm.value['num_parte'] == '467-903-08'){
      this.hojas_cortar = Math.ceil((this.miForm.value['cantidad'] - this.miForm.value['stock'] ) / this.miForm.value['pieza_medida']);
      if(this.hojas_cortar <=0){
        this.hojas_cortar=0;
      }
        this.num_paquetes = (this.miForm.value['cantidad'] / 250);
        this.cajas_utilizar = (this.miForm.value['cantidad'] / this.miForm.value['piezas_caja']);
        this.getinfoOrdenPro();

    }else if(this.miForm.value['num_parte'] == '467-903-05'){
      this.hojas_cortar = Math.ceil((this.miForm.value['cantidad'] - this.miForm.value['stock'] ) / this.miForm.value['pieza_medida']);
      if(this.hojas_cortar <=0){
        this.hojas_cortar=0;
      }
        this.num_paquetes = (this.miForm.value['cantidad'] / 250);
        this.cajas_utilizar = (this.miForm.value['cantidad'] / this.miForm.value['piezas_caja']);
        this.getinfoOrdenPro();
    }else{
        this.hojas_cortar = Math.ceil((this.miForm.value['cantidad']) / this.miForm.value['pieza_medida']);
        if(this.hojas_cortar <=0){
          this.hojas_cortar=0;
        }
        this.num_paquetes = (this.miForm.value['cantidad'] / 250);
        this.cajas_utilizar = (this.miForm.value['cantidad'] / this.miForm.value['piezas_caja']);
        this.getinfoOrdenPro();
    }
}

getinfoOrdenPro(){
  this.clientesServices.getinfoOrders(this.miForm.value['ordenpro'])
    .subscribe((res) => {
    this.clientesServices.infoOrders = res;
  });
  this.num=1;
}

getsum(){
  this.clientesServices.getinfosum(this.miForm.value['ordenpro'])
    .subscribe((res) => {
    this.clientesServices.infosum = res;
    this.orden_produccion = this.miForm.value['ordenpro'];
    this.total = (res[0]['SUM(num_paquetes)']);
    this.peso_bruto = ((res[0]['SUM(num_paquetes)']) * 2250);
    this.peso_neto = ((res[0]['SUM(num_paquetes)']) * 2300);
  });
}

getsumcajas(){
  this.clientesServices.getinfosumcajas(this.miForm.value['ordenpro'])
    .subscribe((res) => {
    this.clientesServices.infosum = res;
    this.total_cajas = Math.ceil(res[0]['SUM(cajas_utilizar)']);
  });
 }

 postcalculations(){
  this.clientesServices.postcal(this.miForm2.value)
  .subscribe(
    res=> {
      console.log(res);
    });
       Swal.fire(
         'Buen Trabajo!',
         'Tu orden se creó correctamente',
         'success'
       );
          this.router.navigate(['/home']);
 }


delateinfo(id_order:number,cantidad:any,num_parte:any,stock:any){
  if(confirm('¿Seguro que quieres Eliminarlo?')){
    this.clientesServices.StockinfoOrders(id_order)
    .subscribe((res) => {
      this.clientesServices.stock = res;
      console.log(res);
      this.stockfinal =  res[0]['stock'];
      console.log(this.stockfinal);

      let prueba ={
      stock: this.stockfinal
    }

    this.clientesServices.putStock(prueba,num_parte)
    .subscribe(
      res=> {
        console.log(res);
      ///////////////////////////////////////
      });
      this.clientesServices.delateinfoOrders(id_order)
      .subscribe(
        res => {
          this.getinfoOrdenPro();
          this.getsum();
          this.getsumcajas();
          //this.stockDelate(id_order);

          //actualizacion de stock de ordenes especificas
          if(num_parte == '467-301-01'){
            if(cantidad >= stock){
            this.clientesServices.getexiststock('467-903-08')
            .subscribe(res =>{
              this.clientesServices.exist = res;
              this.stockfinal= res[0]['stock'] - (cantidad - stock);
              //this.stockfinal=this.miForm.value['stock'];
              let prueba ={
                stock: this.stockfinal,
              }

              this.clientesServices.putStock(prueba,'467-903-08')
              .subscribe(
                res=> {
                  console.log(res);

                });
              });
            }
            }else if (num_parte == '467-301-02'){
              if(this.miForm.value['cantidad'] >= this.miForm.value['stock']){
              this.clientesServices.getexiststock('467-903-05')
              .subscribe(res =>{
                this.clientesServices.exist = res;
                this.stockfinal= res[0]['stock'] - (cantidad - stock);
                //this.stockfinal=this.miForm.value['stock'];
                let prueba ={
                  stock: this.stockfinal,
                }

                this.clientesServices.putStock(prueba,'467-903-05')
                .subscribe(
                  res=> {
                    console.log(res);

                  });
                });
              }
            }
        },err => {
          console.log(err)
        });
    });
    }
  }



nombre(){
  if(this.miForm.value['nombre_cliente'] == 'Hella'){
    this.foliodeprueba = `${'HEL'}${this.fecha2}`;

  }else   if(this.miForm.value['nombre_cliente'] == 'Magneti Marelli'){
    this.foliodeprueba = `${'MMS'}${this.fecha2}`;

  }else   if(this.miForm.value['nombre_cliente'] == 'KH Mexico'){
    this.foliodeprueba = `${'KHM'}${this.fecha2}`;

  }else   if(this.miForm.value['nombre_cliente'] == 'Seal&Foam'){
    this.foliodeprueba = `${'SFM'}${this.fecha2}`;

  }else   if(this.miForm.value['nombre_cliente'] == 'Articulos Innovadores Leo'){
    this.foliodeprueba = `${'AIL'}${this.fecha2}`;

  }else if(this.miForm.value['nombre_cliente'] == 'Lucia Espinoza Rodriguez'){
    this.foliodeprueba = `${'LER'}${this.fecha2}`;

  }else if(this.miForm.value['nombre_cliente'] == 'Yomar'){
    this.foliodeprueba = `${'YOM'}${this.fecha2}`;
  }
 }

 stock(){
  this.stockfinal =  (this.miForm.value['stock'] - this.miForm.value['cantidad']);

  let prueba ={
    stock: this.stockfinal,
  }
  if(prueba.stock <=0){
    let prueba ={
      stock: 0,
    }
    this.clientesServices.putStock(prueba,this.miForm.value['num_parte'])
    .subscribe(
      res=> {
        console.log(res);
      });
  }else{
    this.clientesServices.putStock(prueba,this.miForm.value['num_parte'])
  .subscribe(
    res=> {
      console.log(res);
    });
  }
 }

}
