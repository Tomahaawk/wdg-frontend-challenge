import { Component, Self, forwardRef, Input, Optional } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NgControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() errorMessages: { key: string; value: string }[] = [];
  @Input() set type(value: string) {
    this._type = value || 'text';
  }
  @Input() disabled: boolean;

  _async: boolean = false;
  _type: string;
  value: any = '';

  onChange(...values) {}
  onTouched(...values) {}

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  handleChange(event: any) {
    this.onChange(event.target.value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
