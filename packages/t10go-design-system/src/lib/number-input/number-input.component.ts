import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { T10goFieldComponent } from '../form/field.component';
import { T10goInputBase } from '../form/input-base';

/** Nullable numeric input for amounts, counts, and other scalar values. */
@Component({
  selector: 't10go-number-input',
  imports: [T10goFieldComponent],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => T10goNumberInputComponent), multi: true }],
})
export class T10goNumberInputComponent extends T10goInputBase<number | null> {
  readonly value = model<number | null>(null);
  protected readonly emptyValue = null;
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly placeholder = input('');
  readonly min = input<number>();
  readonly max = input<number>();
  readonly step = input<number | 'any'>(1);

  protected updateValue(event: Event): void { const value = (event.target as HTMLInputElement).valueAsNumber; this.setValue(Number.isNaN(value) ? null : value); }
}
