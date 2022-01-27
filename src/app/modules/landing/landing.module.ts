import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxSliderModule
  ]
})
export class LandingModule { }
