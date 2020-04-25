import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { MessageComponent } from './message/message.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ViewpurchasesComponent } from './viewpurchases/viewpurchases.component';
import { NeworderComponent } from './neworder/neworder.component';
import { MilkroutesComponent } from './milkroutes/milkroutes.component';
import { ViewroutedetsComponent } from './viewroutedets/viewroutedets.component';
import { DummyComponent } from './dummy/dummy.component';
import { InhouseprodComponent } from './inhouseprod/inhouseprod.component';
import { ViewstocksComponent } from './viewstocks/viewstocks.component';
import { SupplieropeningbalComponent } from './supplieropeningbal/supplieropeningbal.component';
import { PurchasepaymentComponent } from './purchasepayment/purchasepayment.component';
import { PaymentbookComponent } from './paymentbook/paymentbook.component';
import { CustomeropeningbalComponent } from './customeropeningbal/customeropeningbal.component';
import { SalespaymentComponent } from './salespayment/salespayment.component';
import { ViewallcustomersComponent } from './viewallcustomers/viewallcustomers.component';
import { ViewpurchpaymentsComponent } from './viewpurchpayments/viewpurchpayments.component';
import { ViewsalepaymentsComponent } from './viewsalepayments/viewsalepayments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AddclientComponent,
    ViewclientComponent,
    MessageComponent,
    ProductComponent,
    PurchaseComponent,
    ViewpurchasesComponent,
    NeworderComponent,
    MilkroutesComponent,
    ViewroutedetsComponent,
    DummyComponent,
    SupplieropeningbalComponent,
    PurchasepaymentComponent,
    InhouseprodComponent,
    ViewstocksComponent,
    PaymentbookComponent,
    CustomeropeningbalComponent,
    SalespaymentComponent,
    ViewallcustomersComponent,
    ViewpurchpaymentsComponent,
    ViewsalepaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
