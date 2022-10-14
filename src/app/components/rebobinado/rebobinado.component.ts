import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NewoperationsService } from 'src/app/services/newoperations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rebobinado',
  templateUrl: './rebobinado.component.html',
  styleUrls: ['./rebobinado.component.css']
})
export class RebobinadoComponent implements OnInit {
  now!: Date;
  user = localStorage.getItem('name_user');
  ordenpro = localStorage.getItem('OrdenProduccion');
  name_complet!: string;
  num=0;

  miForm: FormGroup = this.fb.group({
    ordenpro:     ['', Validators.required],
    operacion:    ['', Validators.required],
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
    campo9:       ['', Validators.required],
    campo10:       ['', Validators.required],
    campo11:       ['', Validators.required],
    campo12:       ['', Validators.required],
    campo13:       ['', Validators.required],
    campo14:       ['', Validators.required],
    campo15:       ['', Validators.required],
    campo16:       ['', Validators.required],
    campo17:       ['', Validators.required],
    campo18:       ['', Validators.required],
    campo19:       ['', Validators.required],
    observaciones:       ['', Validators.required],

  });
  constructor(public operations:NewoperationsService,public clientesServices:AuthService, private fb:FormBuilder,private router:Router) { }

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
      this.get();
    });
  }

  Post(){
    this.operations.postbitrebobinado(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.get();
    }

    get(){
      this.operations.getbitrebobinado(this.miForm.value['ordenpro'])
        .subscribe((res) => {
        this.operations.bitrebobinado = res;
      });
      //console.log(this.clientesServices.infocorte);
      this.num =1;
    }

    delateinfo(id_bitrebobinado:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.operations.delatebitrebobinado(id_bitrebobinado)
      .subscribe(
        res => {
          this.get();
        },err => {
          console.log(err)
        });
      }
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
