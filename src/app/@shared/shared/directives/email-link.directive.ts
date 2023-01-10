import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appEmailLink]',
})
export class EmailLinkDirective implements OnChanges {
  @Input() email: string = '';
  constructor(private el: ElementRef) {}
  ngOnChanges(): void {
    this.el.nativeElement.href = `mailto:${this.email}`;
  }
}
