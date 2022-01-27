import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageGuard } from 'src/app/guards/local-storage.guard';
import { CameraComponent } from './camera/camera.component';
import { CompletedComponent } from './completed/completed.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { OfferComponent } from './offer.component';

const routes: Routes = [

  { path: '', component: OfferComponent, children : [
    {path: 'loan-offer', component: LoanOfferComponent},
    {path: '', redirectTo: 'loan-offer', pathMatch: 'full'},
    {path: 'facial-recognition', component: CameraComponent},
    {path: 'completed', component: CompletedComponent},
  ], canActivate:[LocalStorageGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
