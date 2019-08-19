import { Component, OnInit, forwardRef, Input, OnChanges, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isEmpty, deepPropsExist, getDeepObjValue } from '../../../../helpers';

interface SelectOption {
  value?: any;
  label?: any;
  subLabel?: any;
  text?: any;
  subText?: any;
  id?: any;
}

@Component({
  // tslint:appDisabled-next-line:component-selector
  selector: 'appanalyst-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements OnInit, OnChanges, DoCheck, ControlValueAccessor {
  _value: any;
  oldValue: any;
  @Input() placeholder?: string;
  @Input() bindValue: string;
  @Input() bindLabel: string;
  @Input() bindSubLabel?: string;
  @Input() items: SelectOption[];
  @Input() valueSearchable?: boolean;
  @Input() appDisabled?: boolean;
  @ViewChild('search') search: ElementRef;
  placeholderValue: string;
  openOptionList = false;
  records: SelectOption[];
  prevRecords: SelectOption[];
  touched: boolean;
  searchValue = false;
  propagateChange: any = () => {};
  propagateTouch: any = () => {};

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.placeholderValue = this.placeholder;
    if (Array.isArray(this.items)) {
      this.records = [...this.items];
      const selectItem = this.items.find(item => `${item[this.bindValue]}`.toLowerCase() === `${this._value}`.toLowerCase());
      if (!isEmpty(selectItem)) {
        this.search.nativeElement.value = selectItem[this.bindLabel];
      }
    }

    if (!isEmpty(this.valueSearchable)) {
      this.searchValue = this.valueSearchable;
    }
  }

  ngDoCheck() {
    if (
      this._value !== this.oldValue
      && Array.isArray(this.items)
      && !isEmpty(this._value)
      ) {
      const selectItem = this.items.find(item => `${item[this.bindValue]}`.toLowerCase() === `${this._value}`.toLowerCase());
      if (!isEmpty(selectItem)) {
        this.search.nativeElement.value = selectItem[this.bindLabel];
      }
      this.oldValue = this._value;
    }
  }

  onOpenOptionList() {
    if (this.appDisabled) {
      return;
    }
    this.search.nativeElement.value = '';
    this.openOptionList = true;
    this.onTouched();
    this.propagateChange(null);
  }

  onCloseOptionList() {
    this.openOptionList = false;
  }


  onOptionClick(record) {
    this.propagateChange(record[this.bindValue]);
    this.search.nativeElement.value = record[this.bindLabel];
    this.records = [...this.items];
    this.openOptionList = false;
  }

  onSearch(evt) {
    const value = evt.target.value;
    this.records = this.items.filter(item => (
        isEmpty(value, true)
        || `${item[this.bindLabel]}`.toLowerCase().indexOf(value.toLowerCase()) > -1
        || ( this.searchValue === true ? `${item[this.bindValue]}`.toLowerCase().indexOf(value.toLowerCase()) > -1 : false )
        || (deepPropsExist(item, this.bindSubLabel) ? `${item[this.bindSubLabel]}`.toLowerCase().indexOf(value.toLowerCase()) > -1 : false)
    ));
  }

  getContent(obj, ...props) {
    return getDeepObjValue(obj, ...props);
  }

  onTouched() {
    this.propagateTouch();
  }

  writeValue(value: any) {
    if ( value ) {
     this._value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }

}
