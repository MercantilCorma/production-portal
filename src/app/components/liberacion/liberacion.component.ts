import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { infoInputs, selectorden } from '../interfaces/orders.interfaces';

@Component({
  selector: 'app-liberacion',
  templateUrl: './liberacion.component.html',
  styleUrls: ['./liberacion.component.css']
})
export class LiberacionComponent implements OnInit {
  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  user = localStorage.getItem('name_user');
  name_complet!: string;
  ordersselect: selectorden[] =[];
  inputss:      infoInputs  [] = [];
  num=0;
  num2=0;
  inspection!:  string | undefined;

  miForm: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    op3             :  ['', Validators.required],
    op4             :  ['', Validators.required],
    op5             :  ['', Validators.required],
    cajas_apro      :  ['', Validators.required],
    cajas_def       :  ['', Validators.required],
    total           :  ['', Validators.required],
    observaciones   :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
  });

  miForm3: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    AC              :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
    inspection      :  ['', Validators.required],
  });
  constructor(public service:AuthService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.getuser();
  }

  getuser(){
    this.service.getuser(this.user)
    .subscribe((res) => {
      this.service.user = res;
      this.name_complet = res[0]['name_complet'];
    });
  }


  infolibe(){
    this.service.postliberacion(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);

      });
      this.checkAvance();
      //this.miForm.reset();
      //this.getuser();
      this.miForm.get('op1')?.reset('');
      this.miForm.get('op2')?.reset('');
      this.miForm.get('op3')?.reset('');
      this.miForm.get('op4')?.reset('');
      this.miForm.get('op5')?.reset('');
      this.miForm.get('cajas_apro')?.reset('');
      this.miForm.get('cajas_def')?.reset('');
      this.miForm.get('total')?.reset('');
      this.miForm.get('observaciones')?.reset('');


    }

    checkAvance(){
      let prueba ={
        avance: 100
      }
      //console.log(this.miForm.value['ordenpro']);
      this.service.putAvance(prueba,this.miForm.value['ordenpro'])
      .subscribe(
        res=> {
          console.log(res);
        });
    }

    checksi(){
      this.num2 =1;
      this.service.getelaborar2(this.miForm.value['ordenpro'])
      .subscribe((res) => {
        this.service.infofin = res;
        //this.inspection = res[0]['elaboro'] + ' ' + '' + ' ' + res[1]['elaboro'];
        this.inspection = res[0]['elaboro'];
       // this.getinfocontrolconsult();

      });
}
    checkno(){
      this.num2 =0;
      this.service.getelaborar2(this.miForm.value['ordenpro'])
      .subscribe((res) => {
        this.service.infofin = res;
        //console.log(res[0]['elaboro']);
        //this.inspection = res[0]['elaboro'] + ' ' + '' + ' ' + res[1]['elaboro'];
        this.inspection = res[0]['elaboro'];
        this.miForm3.get('AC')?.reset('-');
        //this.getinfocontrolconsult();
      });
    }

    postSalida2(){
      this.service.postsalida2(this.miForm3.value)
      .subscribe(
        res=> {
          console.log(res);
        });
    this.finalizar();
        //se puede agregar un alert
    }

    finalizar(){
      Swal.fire(
        'Buen Trabajo!',
        '',
        'success'
      );
         this.router.navigate(['/home']);
    }
}
