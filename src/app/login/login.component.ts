import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
userName?: string;
password?: string;
constructor(private loginS: ProductsService, private router: Router, private _snackBar: MatSnackBar ){}
login(){
  if(this.userName == "affra" && this.password == "affra123"){
    this._snackBar.open('You are Logged In '+ this.userName, 'success',{
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
    this.loginS.login();
    this.router.navigateByUrl("alldetails");
  }
   else{
    this._snackBar.open('Incorrect UserName oe Password', 'Failed',{
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
}
