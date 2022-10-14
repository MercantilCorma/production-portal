import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { avance, infoInputs, selectorden } from '../interfaces/orders.interfaces';

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css']
})
export class EmpaqueComponent implements OnInit {
  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  user = localStorage.getItem('name_user');
  name_complet!: string;
  ordersselect: selectorden[] =[];
  inputss:      infoInputs  [] = [];
  num=0;
  prueba!: avance;

  miForm: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    op3             :  ['', Validators.required],
    observaciones   :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
  });

  constructor(public service:AuthService, private fb: FormBuilder, private router:Router) { }

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


  infoEmpaque(){
    this.service.postempaque(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      //se puede agregar un alert
      this.checkAvance();
      this.miForm.reset();
      this.finalizar();

    }

    checkAvance(){
      let prueba ={
        avance: 90
      }
      console.log(this.miForm.value['ordenpro']);
      this.service.putAvance(prueba,this.miForm.value['ordenpro'])
      .subscribe(
        res=> {
          console.log(res);
        });
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
