import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 user = {
    "name": "",
    "pass": ""
  };

  num=0;

  constructor(private authServices: AuthService,private router:Router) {}

  ngOnInit(): void {

this.checkLocalStorage();
/* this.GetTokenDecoded(); */
  }

//Si esta logeado no te deja entrar de nuevo al login
  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['home']);
    }
  }

  logIn(name2:HTMLInputElement) {
      this.authServices.singin(this.user)
      .subscribe((res:any) => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('name_user', name2.value);
        this.router.navigate(['home']);
      }/* ,
      (err) =>{
        console.log(err);
        Swal.fire(
        'Buen Trabajo!',
        'Tu orden se creó correctamente',
        'success'
      );
      }*/);
      this.num=1;

  }

/*   GetTokenDecoded() {
    console.log(jwtDecode('token'))

  } */
}
