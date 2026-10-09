import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'cf-text-field',
  styleUrl: './text-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField),
      multi: true,
    },
  ],
  template: `
    <label>
      <span>{{ label() }}</span>
      @if (multiline()) {
        <textarea rows="4" [value]="value" (input)="onInput($event)" (blur)="onTouched()"></textarea>
      } @else {
        <input [type]="type()" [value]="value" (input)="onInput($event)" (blur)="onTouched()" />
      }
    </label>
  `,
})
export class TextField implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly multiline = input(false);
  readonly type = input('text');

  protected value = '';
  private notifyChange: (value: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.notifyChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.value = value;
    this.notifyChange(value);
  }
}
