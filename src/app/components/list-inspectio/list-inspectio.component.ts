import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { selectorden } from '../interfaces/orders.interfaces';

@Component({
  selector: 'app-list-inspectio',
  templateUrl: './list-inspectio.component.html',
  styleUrls: ['./list-inspectio.component.css']
})
export class ListInspectioComponent implements OnInit {
  now!: Date;
  ordersselect: selectorden[] =[];
  num = 0;
  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  nombre_cliente = localStorage.getItem('nombre_cliente');
  user = localStorage.getItem('name_user');
  name_complet!: string;
  miForm: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    motivo          :  ['', Validators.required],
    elabora         :  ['', Validators.required],
    cliente         :  ['', Validators.required],
    fecha           :  ['', Validators.required],
    identificacion  :  ['', Validators.required],
    lote            :  ['', Validators.required],
    observaciones   :  ['', Validators.required],
    numero          :  ['', Validators.required],
    inspection      :  ['', Validators.required],
    cumple          :  ['', Validators.required],
    comentarios     :  ['', Validators.required],

  });

  constructor(public service:AuthService, private fb: FormBuilder, private router:Router) {
  }

  ngOnInit(): void {
    this.getuser();
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.miForm.get('ordenpro')?.valueChanges
    .pipe(
      tap(()=> {
        this.ordersselect=[];
      }),
      switchMap((ordenpro) => this.service.getinspeccioncorte(ordenpro))
    )
    .subscribe(
      (res) =>{
        //this.getinfoinspeccion2();
        //console.log('hola');
      this.ordersselect = res || [];
    });


  }
  getuser(){
    this.service.getuser(this.user)
    .subscribe((res) => {
      this.service.user = res;
      this.name_complet = res[0]['name_complet'];
    });
  }

  Post(){
    this.service.list(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      //this.miForm.reset();
      //this.finalizar();
      this.getinfo();
    }

    getinfo(){
      this.service.getList(this.miForm.value['ordenpro'])
        .subscribe((res) => {
        this.service.lista = res;
      });
      //console.log(this.clientesServices.infocorte);
      this.num =1;
    }

    delateinfo(id_list_inspection:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.service.delateinfolista(id_list_inspection)
      .subscribe(
        res => {
          this.getinfo();
        },err => {
          console.log(err)
        });
      }
      //this.checkAvance();
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
