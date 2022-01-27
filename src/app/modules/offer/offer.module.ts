import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { CameraComponent } from './camera/camera.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CompletedComponent } from './completed/completed.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CameraTriggerComponent } from './components/camera/cameratrigger.component';
import { MobilenavComponent } from './components/mobilenav/mobilenav.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    OfferComponent,
    CameraTriggerComponent,
    CameraComponent,
    LoanOfferComponent,
    StepperComponent,
    CompletedComponent,
    SidenavComponent,
    DashboardComponent,
    MobilenavComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    WebcamModule,
    NgxSliderModule,
    FormsModule,
    NgxSkeletonLoaderModule
  ]
})
export class OfferModule { }
