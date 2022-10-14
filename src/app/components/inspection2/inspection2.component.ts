import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { avance, infoInputs, selectorden } from '../interfaces/orders.interfaces';
import { switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inspection2',
  templateUrl: './inspection2.component.html',
  styleUrls: ['./inspection2.component.css']
})
export class Inspection2Component implements OnInit {
  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  user = localStorage.getItem('name_user');
  name_complet!: string;
  ordersselect: selectorden[] =[];
  inputss:      infoInputs  [] = [];
  num=0;
  miForm2: FormGroup = this.fb.group({
    ordenpro2        :  ['', Validators.required],
    num_parte        :  ['', Validators.required],
    descripcion      :  ['', Validators.required],
    num_visual       :  ['', Validators.required],
    inicial          :  ['', Validators.required],
    dato1            :  ['', Validators.required],
    dato2            :  ['', Validators.required],
    dato3            :  ['', Validators.required],
    dato4            :  ['', Validators.required],
    dato5            :  ['', Validators.required],
    dato6            :  ['', Validators.required],
    dato7            :  ['', Validators.required],
    dato8            :  ['', Validators.required],
    dato9            :  ['', Validators.required],
    dato10           :  ['', Validators.required],
    observaciones    :  ['', Validators.required],
    elaboro          :  ['', Validators.required],
  });

  miForm3: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    op3             :  ['', Validators.required],
    op4             :  ['', Validators.required],
    observaciones   :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
  });

  avance1=0;
  avance2=0;
  avancefinal=0;
  prueba!: avance;


  constructor(public service:AuthService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.getuser();
    //this.getinfoinspeccion();

      this.miForm2.get('ordenpro2')?.valueChanges
      .pipe(
        tap(()=> {
          this.ordersselect=[];
        }),
        switchMap((ordenpro2) => this.service.getinspeccioncorte(ordenpro2))
      )
      .subscribe(
        (res) =>{
          this.getinfoinspeccion2();
          //console.log('hola');
        this.ordersselect = res || [];
      });


      this.miForm2.get('num_parte')?.valueChanges
      .pipe(
        tap(()=> {
          this.inputss=[];
          this.miForm2.get('inicial')?.reset('');
          this.miForm2.get('dato1')?.reset('');
          this.miForm2.get('dato2')?.reset('');
          this.miForm2.get('dato3')?.reset('');
          this.miForm2.get('dato4')?.reset('');
          this.miForm2.get('dato5')?.reset('');
          this.miForm2.get('dato6')?.reset('');
          this.miForm2.get('dato7')?.reset('');
          this.miForm2.get('dato8')?.reset('');
          this.miForm2.get('dato9')?.reset('');
          this.miForm2.get('dato10')?.reset('');
          this.miForm2.get('observaciones')?.reset('');
        }),
        switchMap((num_parte) => this.service.getInputs(num_parte))
      )
      .subscribe(
        (res) =>{
        this.num =1;
        this.inputss = res || [];
      });

  }

  getuser(){
    this.service.getuser(this.user)
    .subscribe((res) => {
      this.service.user = res;
      this.name_complet = res[0]['name_complet'];
    });
  }

  Posinspeccion2(){
        this.service.postinspection2(this.miForm2.value)
        .subscribe(
          res=> {
            console.log(res);
          });
          this.getinfoinspeccion2();
          this.checkAvance();
        }

  getinfoinspeccion2(){
    this.service.getinspecdate2(this.miForm2.value['ordenpro2'])
      .subscribe((res) => {
      this.service.info = res;
    });
    //console.log(this.clientesServices.infocorte);
    //this.num =1;
  }

  Postvigilar2(){
    this.service.postvigilar2(this.miForm3.value)
    .subscribe(
      res=> {
        console.log(res);

      });
      this.miForm3.reset();
      this.finalizar();
    }
    checkAvance(){
      this.service.getCorteAvance1(this.miForm2.value['ordenpro2'])
      .subscribe((res) => {
      this.service.avance = res;
      this.avance1=(res[0]['COUNT(num_parte)']);

          this.service.getAvanceSuaje(this.miForm2.value['ordenpro2'])
          .subscribe((res) => {
          this.service.avance = res;
          this.avance2=(res[0]['COUNT(num_parte)']);
          this.avancefinal = ((this.avance2 * 40) / this.avance1) + 40;
          console.log(this.avancefinal);
           let prueba ={
            avance: this.avancefinal,
          }
          console.log(prueba);

              this.service.putAvance(prueba,this.miForm2.value['ordenpro2'])
              .subscribe(
                res=> {
                  console.log(res);
                });
           });

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

    delateinfo(id:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.service.delateinfoInspection2(id)
      .subscribe(
        res => {
          this.getinfoinspeccion2();
        },err => {
          console.log(err)
        });
      }
      this.checkAvance();
      }
}
