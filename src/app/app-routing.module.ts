import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AddclientComponent } from "./addclient/addclient.component";
import { ViewclientComponent } from "./viewclient/viewclient.component";
import { ProductComponent } from "./product/product.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { ViewpurchasesComponent } from "./viewpurchases/viewpurchases.component";
import { NeworderComponent } from "./neworder/neworder.component";
import { MilkroutesComponent } from "./milkroutes/milkroutes.component";
import { InhouseprodComponent } from "./inhouseprod/inhouseprod.component";
import { SupplieropeningbalComponent } from "./supplieropeningbal/supplieropeningbal.component";
import { PurchasepaymentComponent } from "./purchasepayment/purchasepayment.component";
import { CustomeropeningbalComponent } from "./customeropeningbal/customeropeningbal.component";
import { SalespaymentComponent } from "./salespayment/salespayment.component";
import { PaymentbookComponent } from "./paymentbook/paymentbook.component";
import { ViewpurchpaymentsComponent } from "./viewpurchpayments/viewpurchpayments.component";
import { ViewsalepaymentsComponent } from "./viewsalepayments/viewsalepayments.component";
import { AddcustomerComponent } from "./addcustomer/addcustomer.component";
import { AddsupplierComponent } from "./addsupplier/addsupplier.component";
import { WastagemilkComponent } from "./wastagemilk/wastagemilk.component";
import { UpdateorderComponent } from "./updateorder/updateorder.component";
import { PrintrouteComponent } from "./printroute/printroute.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "wastagemilk ", component: WastagemilkComponent },
  { path: "home", component: HomeComponent },
  { path: "addclient/:clientid", component: AddclientComponent },
  { path: "viewclients", component: ViewclientComponent },
  { path: "viewpurchases", component: ViewpurchasesComponent },
  { path: "product", component: ProductComponent },
  { path: "purchase", component: PurchaseComponent },
  { path: "neworder", component: NeworderComponent },
  { path: "routes", component: MilkroutesComponent },
  { path: "inhouseprod", component: InhouseprodComponent },
  { path: "supplieropeningbal", component: SupplieropeningbalComponent },
  { path: "purchasepayment", component: PurchasepaymentComponent },
  { path: "customeropeningbal", component: CustomeropeningbalComponent },
  { path: "salespayment", component: SalespaymentComponent },
  { path: "viewpurchpay", component: ViewpurchpaymentsComponent },
  { path: "viewsalepay", component: ViewsalepaymentsComponent },
  { path: "addcustomer/:clientid", component: AddcustomerComponent },
  { path: "updateorder", component: UpdateorderComponent },
  { path: "addsupplier/:clientid", component: AddsupplierComponent },
  { path: "printroute", component: PrintrouteComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
