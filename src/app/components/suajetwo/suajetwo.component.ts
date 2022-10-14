import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suajetwo',
  templateUrl: './suajetwo.component.html',
  styleUrls: ['./suajetwo.component.css']
})
export class SuajetwoComponent implements OnInit {
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
    posicion:     ['', Validators.required],
    observacion:  ['', Validators.required],
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
  });

  constructor(public clientesServices:AuthService,private fb: FormBuilder,private router:Router) { }

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
      this.getinfosuaje();
    });
  }

  Postbitsuaje(){
    this.clientesServices.postbitsuajetwo(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.getinfosuaje();
    }

    getinfosuaje(){
      this.clientesServices.getbitsuajetwo(this.miForm.value['ordenpro'],this.miForm.value['fecha'])
        .subscribe((res) => {
        this.clientesServices.infosuaje = res;
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

    bit2(){
      //this.router.navigate(['/home']);
      this.router.navigate(['/inspection-suaje']);
      const url = this.router.serializeUrl(this.router.createUrlTree(['/inspection-suaje']));
      window.open(url,'_blank');
    }

    delateinfo(id_suaje:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.clientesServices.delateinfoOrdersSuajetwo(id_suaje)
      .subscribe(
        res => {
          this.getinfosuaje();
        },err => {
          console.log(err)
        });
      }
    }
}
