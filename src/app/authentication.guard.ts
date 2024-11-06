import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {
  constructor(private loginService: ProductsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.loggedIn) {
      return true; // Allow access to the route
    } else {
      // Navigate to the login component if not logged in
      this.router.navigateByUrl('/login');
      return false; // Block access to the route
    }
  }
}
