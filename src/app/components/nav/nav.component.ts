import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  now!: Date;
  user = localStorage.getItem('name_user');
/*   dia = new Date();
  dateDay =this.dia.getDate() + '-' + ( this.dia.getMonth() + 1 ) + '-' + this.dia.getFullYear() +
      ' / '+ this.dia.getHours() + ':' + this.dia.getMinutes(); */

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name_user');
    localStorage.removeItem('OrdenProduccion');
    this.router.navigate(['/login'])
  }


}
