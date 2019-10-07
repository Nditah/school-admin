import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { OutsideideClickableDirective } from './outsideide-clickable.directive';

@NgModule({
  declarations: [
    SelectComponent,
    OutsideideClickableDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectComponent,
    OutsideideClickableDirective,
  ]
})
export class CustomFormsFieldModule { }
