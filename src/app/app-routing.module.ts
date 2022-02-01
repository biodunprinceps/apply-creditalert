import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageGuard } from './guards/local-storage.guard';
import { ChangePasswordComponent } from './modules/offer/change-password/change-password.component';

const routes: Routes = [
{ path: '', redirectTo:'apply' , pathMatch: 'full' },
{ path: 'apply', loadChildren: () => import('./modules/apply/apply.module').then(m => m.ApplyModule) },
{ path: 'offer', loadChildren: () => import('./modules/offer/offer.module').then(m => m.OfferModule), canActivate:[LocalStorageGuard] },
{path: 'dashboard/change-password', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
