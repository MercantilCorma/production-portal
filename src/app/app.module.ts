/* import { Component, NgModule } from '@angular/core'; */
import { LOCALE_ID,NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';
//routes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent} from './components/orders/orders.component';
import { NavComponent } from './components/nav/nav.component';
import { CorteComponent } from './components/corte/corte.component';
import { SuajeComponent } from './components/suaje/suaje.component';
import { LamiComponent } from './components/lami/lami.component';
import { from } from 'rxjs';
import localEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localEs, 'es');


//providers
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DownloadComponent } from './components/download/download.component';
import { Inspection1Component } from './components/inspection1/inspection1.component';
import { Inspection2Component } from './components/inspection2/inspection2.component';
import { EmpaqueComponent } from './components/empaque/empaque.component';
import { LiberacionComponent } from './components/liberacion/liberacion.component';
import { CalidadComponent } from './components/calidad/calidad.component';
import { StockComponent } from './components/stock/stock.component';
import { ListInspectioComponent } from './components/list-inspectio/list-inspectio.component';
import { CortediscoComponent } from './components/cortedisco/cortedisco.component';
import { RebobinadoComponent } from './components/rebobinado/rebobinado.component';
import { TroqueladoComponent } from './components/troquelado/troquelado.component';
import { CortetwoComponent } from './components/cortetwo/cortetwo.component';
import { SuajetwoComponent } from './components/suajetwo/suajetwo.component';


const routes: Routes = [
  {path:'home',      component: HomeComponent,canActivate:[AuthGuard]},
  {path:'login',     component: LoginComponent},
  {path:'private',   component: PrivateComponent},
  {path:'orders',    component: OrdersComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path:'corte',     component: CorteComponent},
  {path:'corte-bit2',component: CortetwoComponent},
  {path:'suaje',     component: SuajeComponent},
  {path:'suaje-bit2',component: SuajetwoComponent},
  {path:'lami',      component: LamiComponent},
  {path:'cortedisco',component: CortediscoComponent},
  {path:'rebobinado',component: RebobinadoComponent},
  {path:'troquelado',component:TroqueladoComponent},
  {path:'download',  component: DownloadComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path:'inspection-corte',component: Inspection1Component},
  {path:'inspection-suaje',component: Inspection2Component},
  {path:'empaquetado', component:EmpaqueComponent},
  {path:'liberacion', component:LiberacionComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path:'Control-Calidad', component:CalidadComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path:'stock',component:StockComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path:'View-Orden',component:ViewComponent},
  {path:'Lista-Inspeccion',component:ListInspectioComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole: 'Administrador'}},
  {path: '**', pathMatch: 'full', redirectTo:'login'}
];

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FiltroPipe } from './components/pipes/filtro.pipe';
import { ViewComponent } from './components/view/view.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    LoginComponent,
    OrdersComponent,
    NavComponent,
    CorteComponent,
    SuajeComponent,
    LamiComponent,
    DownloadComponent,
    Inspection1Component,
    Inspection2Component,
    EmpaqueComponent,
    LiberacionComponent,
    CalidadComponent,
    StockComponent,
    FiltroPipe,
    ViewComponent,
    ListInspectioComponent,
    CortediscoComponent,
    RebobinadoComponent,
    TroqueladoComponent,
    CortetwoComponent,
    SuajetwoComponent
  ],
  imports: [BrowserModule,
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            RouterModule.forRoot(routes)],
  exports:[ RouterModule,
            LoginComponent,
            CommonModule],


  providers: [
             {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},
             {provide:LOCALE_ID,useValue:'es'},
             DatePipe,
             JwtHelperService,
            {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
