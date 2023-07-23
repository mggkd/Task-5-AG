import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): any {
    // return this.authService.isLoggedIn();
    if(localStorage.getItem('currentUser')){
      return true
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
