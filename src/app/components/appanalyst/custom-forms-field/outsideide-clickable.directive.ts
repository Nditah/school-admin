import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[aaOutsideideClickable]'
})
export class OutsideideClickableDirective {

  constructor(private _elementRef: ElementRef) {}

  // tslint:disable-next-line:no-output-rename
  @Output('aaOutsideClick') clickable: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickable.emit(null);
    }
  }

}
