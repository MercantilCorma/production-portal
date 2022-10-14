import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { avance, infoInputs, infoPart, selectorden } from '../interfaces/orders.interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection1',
  templateUrl: './inspection1.component.html',
  styleUrls: ['./inspection1.component.css']
})
export class Inspection1Component implements OnInit {
  ordendeproduccion = localStorage.getItem('OrdenProduccion');
  imagen!: Array<File>;
  mostrar=0;
  mostrar2=0;

  miForm: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    tipo            :  ['', Validators.required],
    lote            :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
  });

  miForm1: FormGroup = this.fb.group({
    ordenpro          :  ['', Validators.required],
    modelo            :  ['', Validators.required],
    lote              :  ['', Validators.required],
    cantidad          :  ['', Validators.required],
    elaboro           :  ['', Validators.required],
  });

  miForm2: FormGroup = this.fb.group({
    ordenpro2        :  ['', Validators.required],
    num_parte        :  ['', Validators.required],
    descripcion      :  ['', Validators.required],
    medida           :  ['', Validators.required],
    modelo           :  ['', Validators.required],
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
  user = localStorage.getItem('name_user');
  name_complet!: string;
  ordersselect: selectorden[] =[];
  inputss:      infoInputs  [] = [];
  num=0;
  avance1=0;
  avance2=0;
  avancefinal=0;

  miForm3: FormGroup = this.fb.group({
    ordenpro        :  ['', Validators.required],
    op1             :  ['', Validators.required],
    op2             :  ['', Validators.required],
    op3             :  ['', Validators.required],
    op4             :  ['', Validators.required],
    op5             :  ['', Validators.required],
    observaciones   :  ['', Validators.required],
    elaboro         :  ['', Validators.required],
  });

  miForm4: FormGroup = this.fb.group({
    avance        :  ['', Validators.required],
  });
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
          this.getinfoinspeccion();
            this.getpapel();
            this.getfolio();
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
      //this.checkAvance();
    });
  }

  Posinspeccion(){
    this.service.postinspection(this.miForm2.value)
    .subscribe(
      res=> {
        console.log(res);
      });
      this.getinfoinspeccion();
      this.checkAvance();
    }

    getinfoinspeccion(){
      this.service.getinspecdate(this.miForm2.value['ordenpro2'])
        .subscribe((res) => {
        this.service.info = res;
      });
      //console.log(this.clientesServices.infocorte);
      //this.num =1;
    }

    Postpapel(){
      this.service.postpapel(this.miForm.value)
      .subscribe(
        res=> {
          console.log(res);
        });
        this.miForm.get('tipo')?.reset('');
        this.miForm.get('lote')?.reset('');
        this.getpapel();
        this.mostrar=1;
      }

      getpapel(){
        this.service.getdownloaInspectionpapel(this.miForm1.value['ordenpro'])
        .subscribe(
          res=> {
            this.service.papel = res;
          });
      }





      Postfolio(){
        this.service.postfolio(this.miForm1.value)
        .subscribe(
          res=> {
            console.log(res);
          });
          this.miForm1.get('modelo')?.reset('');
          this.miForm1.get('lote')?.reset('');
          this.miForm1.get('cantidad')?.reset('');
          this.getfolio();
          this.mostrar2=1;
        }

        getfolio(){
          this.service.getdownloaInspectionfolio(this.miForm1.value['ordenpro'])
          .subscribe(
            res=> {
              this.service.folio = res;
            });
        }

    Postvigilar(){
          this.service.postvigilar(this.miForm3.value)
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

            this.service.getCorteAvance2(this.miForm2.value['ordenpro2'])
            .subscribe((res) => {
            this.service.avance = res;
            this.avance2=(res[0]['COUNT(num_parte)']);
            this.avancefinal = (this.avance2 * 40) / this.avance1;
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

      onUpload(){
        let formData = new FormData();
        for(let i=0; i<this.imagen.length; i++){
            formData.append("uploads[]",this.imagen[i],this.imagen[i].name);
        }
        this.service.subir(formData).subscribe(res =>{
          console.log('Response:', res)
        });
        Swal.fire(
          'Imagen Agregada!',
          '',
          'success'
        );
      }

      fileChange(e:any){
      this.imagen = e.target.files;
    }


    delateinfo(id:number){
      if(confirm('¿Seguro que quieres Eliminarlo?')){
      this.service.delateinfoInspection1(id)
      .subscribe(
        res => {
          this.getinfoinspeccion();
        },err => {
          console.log(err)
        });
      }
      this.checkAvance();
      }

      delateinfoPapel(id_papel:number){
        if(confirm('¿Seguro que quieres Eliminarlo?')){
        this.service.delateinfoPapel(id_papel)
        .subscribe(
          res => {
            this.getinfoinspeccion();
          },err => {
            console.log(err)
          });
        }
        this.getpapel();
        this.mostrar=0;
      }

      delateinfoFolio(id_folio:number){
        if(confirm('¿Seguro que quieres Eliminarlo?')){
        this.service.delateinfoFolio(id_folio)
        .subscribe(
          res => {
            this.getinfoinspeccion();
          },err => {
            console.log(err)
          });
        }
        this.getfolio();
        this.mostrar2=0;
      }

      verinfo(){
        this.getpapel();
        this.mostrar=1;
      }

      verinfo2(){
        this.getpapel();
        this.mostrar2=1;
      }
}
