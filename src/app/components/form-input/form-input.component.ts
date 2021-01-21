import { Component, Self, forwardRef, Input, Optional } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NgControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FieldType } from 'src/app/enums/field-type.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() errorMessages: { key: string; value: string }[] = [];
  @Input() set type(value: FieldType) {
    this._type = value || FieldType.TEXT;
  }
  _async: boolean = false;
  _type: FieldType;

  constructor(@Self() public ngControl: NgControl) {
    debugger;
    this.ngControl.valueAccessor = this;
    this._type = FieldType.TEXT;
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
