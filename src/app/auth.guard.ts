import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Get the allowed role for the requested route (if any)
    const allowedRole = route.data?.['allowedRole'];

    // Get the user's position from the AuthService
    const userPosition = this.authService.getUserPosition();

    // Check if the user's position matches the allowed role
    if (allowedRole && userPosition !== allowedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
