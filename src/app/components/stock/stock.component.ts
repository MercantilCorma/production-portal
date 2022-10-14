import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NewoperationsService } from 'src/app/services/newoperations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  num=0;
  stock=0;
  stockfinal=0;
  observaciones !:string;
  miForm: FormGroup = this.fb.group({
    no_parte          :  ['', Validators.required],
    stock             :  ['', Validators.required],
    observaciones     :  ['', Validators.required],
    });

    miForm2: FormGroup = this.fb.group({
      plant          :  ['', Validators.required],
      no_parte       :  ['', Validators.required],
      descrip        :  ['', Validators.required],
      no_orden       :  ['', Validators.required],
      clave          :  ['', Validators.required],
      medida         :  ['', Validators.required],
      pieza_medida   :  ['', Validators.required],
      articulo       :  ['', Validators.required],
      pieza_caja     :  ['', Validators.required],
      num_visual     :  ['', Validators.required],
      stock          :  ['', Validators.required],
      observaciones  :  ['', Validators.required],
      });

  constructor(public service:AuthService, private fb: FormBuilder,public operations:NewoperationsService) { }

  ngOnInit(): void {

    this.home();
  }



  updateADD(){
    this.service.getexiststock(this.miForm.value['no_parte'])
    .subscribe(res =>{
      this.service.exist = res;
      this.stockfinal= res[0]['stock'] + this.miForm.value['stock'];
      //this.stockfinal=this.miForm.value['stock'];
      let prueba ={
        stock: this.stockfinal,
      }

      this.service.putStock(prueba,this.miForm.value['no_parte'])
      .subscribe(
        res=> {
          console.log(res);

        });
        Swal.fire(
          'Buen Trabajo!',
          'Stock Actualizado',
          'success'
        );
       this.home();
      });
  }

  updateResta(){
    this.service.getexiststock(this.miForm.value['no_parte'])
    .subscribe(res =>{
      this.service.exist = res;
      this.stockfinal= res[0]['stock'] - this.miForm.value['stock'];
      //this.stockfinal=this.miForm.value['stock'];
      let prueba ={
        stock: this.stockfinal,
      }

      this.service.putStock(prueba,this.miForm.value['no_parte'])
      .subscribe(
        res=> {
          console.log(res);

        });
        Swal.fire(
          'Buen Trabajo!',
          'Stock Actualizado',
          'success'
        );
       this.home();
      });
  }

  home(){
    this.service.getAdminStock()
    .subscribe(res =>{
      this.service.inventario = res;
    });
  }

  updateObserva(){
    this.service.getexiststock(this.miForm.value['no_parte'])
    .subscribe(res =>{
      this.service.exist = res;
      let prueba ={
        observaciones : this.miForm.value['observaciones'],
      }
      this.service.putObserve(prueba,this.miForm.value['no_parte'])
      .subscribe(
        res=> {
          console.log(res);

        });
        Swal.fire(
          'Buen Trabajo!',
          'Stock Actualizado',
          'success'
        );
       this.home();
      });
  }

  view(){
    this.num=1;
  }
  ocultar(){
    this.num=0;
  }

  Post(){
    this.operations.postnumparte(this.miForm2.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      Swal.fire(
        'Buen Trabajo!',
        'Número de Parte Agregada',
        'success'
      );
      this.home();
    }
}
