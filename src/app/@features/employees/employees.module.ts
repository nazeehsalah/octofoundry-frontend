import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule, COMPONENTS } from './employees-routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { SharedModule } from '@shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class EmployeesModule {}
