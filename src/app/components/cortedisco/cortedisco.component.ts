import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NewoperationsService } from 'src/app/services/newoperations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cortedisco',
  templateUrl: './cortedisco.component.html',
  styleUrls: ['./cortedisco.component.css']
})
export class CortediscoComponent implements OnInit {
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
    distancia:    ['', Validators.required],
    campo1:       ['', Validators.required],
    campo2:       ['', Validators.required],
    campo3:       ['', Validators.required],
    campo4:       ['', Validators.required],
    campo5:       ['', Validators.required],
    campo6:       ['', Validators.required],
    campo7:       ['', Validators.required],
    campo8:       ['', Validators.required],
    campo9:       ['', Validators.required],
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
    this.operations.postbitcortedisco(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.get();
    }

    get(){
      this.operations.getbitcortedisco(this.miForm.value['ordenpro'])
        .subscribe((res) => {
        this.operations.bitcortedisco = res;
      });
      //console.log(this.clientesServices.infocorte);
      this.num =1;
    }

    delateinfo(id_bitcortedisco:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.operations.delatebitcortedisco(id_bitcortedisco)
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
