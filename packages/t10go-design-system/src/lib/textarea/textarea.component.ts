import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { T10goFieldComponent } from '../form/field.component';
import { T10goInputBase } from '../form/input-base';

/** Multi-line text control built on the same shared input contract as text and number controls. */
@Component({
  selector: 't10go-textarea',
  imports: [T10goFieldComponent],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => T10goTextareaComponent), multi: true }],
})
export class T10goTextareaComponent extends T10goInputBase<string> {
  readonly value = model('');
  protected readonly emptyValue = '';
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly placeholder = input('');
  readonly rows = input(3);
  readonly maxLength = input<number>();

  protected updateValue(event: Event): void { this.setValue((event.target as HTMLTextAreaElement).value); }
}
