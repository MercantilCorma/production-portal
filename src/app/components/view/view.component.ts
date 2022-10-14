import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  now!: Date;
  ordenpro:any = localStorage.getItem('OrdenProduccion');
  constructor(public service:AuthService) { }

  ngOnInit(): void {

    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.service.getdownloadOrden(this.ordenpro)
    .subscribe(
      res=> {
        this.service.ordendepro = res;
      });
    this.service.getdownloadOrdenCalculations(this.ordenpro)
    .subscribe(
      res=> {
        this.service.ordendeproCal = res;
      });

  }


  /*checkData(){
    this.service.getdownloadOrden(this.ordenpro)
      .subscribe(
        res=> {
          this.service.ordendepro = res;
        });
      this.service.getdownloadOrdenCalculations(ordenpro.value)
      .subscribe(
        res=> {
          this.service.ordendeproCal = res;
        });
      //this.num =1;

    }*/


}
