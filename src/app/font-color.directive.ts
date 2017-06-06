import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[myFontColor]'
})
export class FontColorDirective implements OnInit {

  @Input('myFontColor') fontColor: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.style.color = this.fontColor;
  }
}
