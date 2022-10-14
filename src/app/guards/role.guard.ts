import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode'
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  authToken:any;

  constructor(
    private authService: AuthService,
    public router: Router){}

  canActivate(route: ActivatedRouteSnapshot):boolean{

/*     const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    this.authToken = token;
    console.log(decode(this.authToken)); */
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    this.authToken = token;
    let decodetoken:any = {};
    decodetoken = decode(this.authToken);
    //console.log(decodetoken.rol);

    //console.log(token);
    //if( !this.authService.isAuth() || this.authToken['rol:'] !== expectedRole){
    if( !this.authService.isAuth() || decodetoken.rol !== expectedRole){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario no Autorizado'
      });
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

}
