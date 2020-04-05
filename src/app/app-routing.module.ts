import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addclient/:clientid', component: AddclientComponent },
  { path: 'viewclients', component: ViewclientComponent },
  { path: 'product', component: ProductComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
