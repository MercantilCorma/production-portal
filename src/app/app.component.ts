import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import{AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'production-portal';
  constructor(private authService:AuthService){}
}
