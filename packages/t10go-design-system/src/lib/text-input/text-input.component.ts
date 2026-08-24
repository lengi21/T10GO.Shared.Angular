import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { T10goFieldComponent } from '../form/field.component';
import { T10goInputBase } from '../form/input-base';

export type T10goTextInputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

/** General single-line text input built on the shared ControlValueAccessor base. */
@Component({
  selector: 't10go-text-input',
  imports: [T10goFieldComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => T10goTextInputComponent), multi: true }],
})
export class T10goTextInputComponent extends T10goInputBase<string> {
  readonly value = model('');
  protected readonly emptyValue = '';
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly placeholder = input('');
  readonly type = input<T10goTextInputType>('text');
  readonly autocomplete = input<string>();
  readonly minLength = input<number>();
  readonly maxLength = input<number>();

  protected updateValue(event: Event): void { this.setValue((event.target as HTMLInputElement).value); }
}
