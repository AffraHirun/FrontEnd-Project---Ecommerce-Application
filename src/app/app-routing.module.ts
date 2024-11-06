import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './authentication.guard';
import { candeactivateGuard } from './candeactivate.guard';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AlldetailsComponent } from './alldetails/alldetails.component';

const routes: Routes = [
  { path: 'homec',
   component: HomeComponent 
  },

  {
    path: 'aboutus',
    component: AboutusComponent
  },

  { path: 'order/:id', 
  component: OrderViewComponent,
  canDeactivate: [candeactivateGuard] //unsaved data alert
},

  { 
    path: 'login', 
  component: LoginComponent },


  { 
    path: 'alldetails', 
  component: AlldetailsComponent,
  canActivate: [authenticationGuard] 
},
  { path: '', 
  redirectTo: 'homec', 
  pathMatch: 'full' },
  { 
    path: "**", 
    component: PagenotfoundComponent }  //any path that doesnt match the defined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
