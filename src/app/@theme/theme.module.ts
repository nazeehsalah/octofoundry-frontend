import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
const COMPONENTS = [MainLayoutComponent];
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    ToastrModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ThemeModule {}
