import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cortetwo',
  templateUrl: './cortetwo.component.html',
  styleUrls: ['./cortetwo.component.css']
})
export class CortetwoComponent implements OnInit {
now!: Date;
dia: Date = new Date();
dateDay =this.dia.getDate() + '-' + ( this.dia.getMonth() + 1 ) + '-' + this.dia.getFullYear()
user = localStorage.getItem('name_user');
ordenpro = localStorage.getItem('OrdenProduccion');
name_complet!: string;
num=0;
selectope!:string;
operaciones:string[] =[];

miForm: FormGroup = this.fb.group({
  ordenpro:     ['', Validators.required],
  operacion:    ['', Validators.required],
  articulo:     ['', Validators.required],
  velocidad:    ['', Validators.required],
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
  campo9:       ['', Validators.required],
  campo10:       ['', Validators.required],
  campo11:       ['', Validators.required],
  campo12:       ['', Validators.required],
  campo13:       ['', Validators.required],
  campo14:       ['', Validators.required],
  campo15:       ['', Validators.required],
});

  constructor(private fb: FormBuilder, public clientesServices:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.getuser();
    this.operaciones = this.clientesServices.operacion;

  }


  getuser(){
    this.clientesServices.getuser(this.user)
    .subscribe((res) => {
      this.clientesServices.user = res;
      this.name_complet = res[0]['name_complet'];
       this.getinfocorte();
    });

  }

  Postbitcorte(){
    this.clientesServices.postbitcortetwo(this.miForm.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.getinfocorte();
    }

    getinfocorte(){
      this.clientesServices.getbitcortetwo(this.miForm.value['ordenpro'],this.miForm.value['fecha'])
        .subscribe((res) => {
        this.clientesServices.infocorte = res;
      });
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
    const url = this.router.serializeUrl(this.router.createUrlTree(['/inspection-corte']));
    window.open(url,'_blank');
  }

    delateinfo(id_corte:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.clientesServices.delateinfoOrdersCortetwo(id_corte)
      .subscribe(
        res => {
          this.getinfocorte();
        },err => {
          console.log(err)
        });

      }
    }
}
