import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailLinkDirective } from './directives/email-link.directive';

@NgModule({
  declarations: [EmailLinkDirective],
  exports: [EmailLinkDirective],
  imports: [CommonModule],
})
export class SharedModule {}
