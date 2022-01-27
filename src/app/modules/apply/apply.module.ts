import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplyRoutingModule } from './apply-routing.module';
import { ApplyComponent } from './apply.component';


@NgModule({
  declarations: [
    ApplyComponent
  ],
  imports: [
    CommonModule,
    ApplyRoutingModule,
    FormsModule
  ]
})
export class ApplyModule { }
