import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lami',
  templateUrl: './lami.component.html',
  styleUrls: ['./lami.component.css']
})
export class LamiComponent implements OnInit {
  now!: Date;
  dia: Date = new Date();
  dateDay =this.dia.getDate() + '-' + ( this.dia.getMonth() + 1 ) + '-' + this.dia.getFullYear()
  user = localStorage.getItem('name_user');
  ordenpro = localStorage.getItem('OrdenProduccion');
  name_complet!: string;
  num=0;

  miForm: FormGroup = this.fb.group({
    ordenpro:     ['', Validators.required],
    operacion:    ['', Validators.required],
    velocidadON:  ['', Validators.required],
    velocidadOFF: ['', Validators.required],
    fecha:        ['', Validators.required],
    hora:         ['', Validators.required],
    responsable:  ['', Validators.required],
    campo1:       ['', Validators.required],
    campo2:       ['', Validators.required],
    campo3:       ['', Validators.required],
    campo4:       ['', Validators.required],
    campo5:       ['', Validators.required],
    campo6:       ['', Validators.required],
    campo7:       ['', Validators.required],
    campo8:       ['', Validators.required],
    observaciones:       ['', Validators.required],

  });
  constructor(public clientesServices:AuthService, private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.getuser();

  }

  getuser(){
    this.clientesServices.getuser(this.user)
    .subscribe((res) => {
      this.clientesServices.user = res;
      this.name_complet = res[0]['name_complet'];
      this.getinfolami();
    });
  }
  Postbitlami(){
        this.clientesServices.postbitlami(this.miForm.value)
        .subscribe(
          res=> {
            console.log(res);
          });
          this.getinfolami();
        }

        getinfolami(){
          this.clientesServices.getbitlami(this.miForm.value['ordenpro'],this.miForm.value['fecha'])
            .subscribe((res) => {
            this.clientesServices.infolami = res;
          });
          //console.log(this.clientesServices.infocorte);
          this.num =1;
        }

        finalizar(){
          Swal.fire(
            'Buen Trabajo!',
            '',
            'success'
          );
             this.router.navigate(['/home']);
        }
    delateinfo(id_lami:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.clientesServices.delateinfoOrdersLami(id_lami)
      .subscribe(
        res => {
          this.getinfolami();
        },err => {
          console.log(err)
        });
      }
    }



}
