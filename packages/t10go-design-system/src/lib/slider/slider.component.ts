import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { T10goInputBase } from '../form/input-base';

/**
 * A theme-aware numeric range control.
 *
 * Supports both `[(value)]` binding and Angular forms.
 */
@Component({
  selector: 't10go-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => T10goSliderComponent),
      multi: true,
    },
  ],
})
export class T10goSliderComponent extends T10goInputBase<number> {
  /** The current numeric value. Supports two-way binding with `[(value)]`. */
  readonly value = model(0);
  protected readonly emptyValue = 0;
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly label = input<string>();
  readonly ariaLabel = input<string>();
  readonly showValue = input(false);
  readonly valueFormatter = input<(value: number) => string>();

  protected readonly displayedValue = computed(() => {
    const value = this.value();
    return this.valueFormatter()?.(value) ?? String(value);
  });

  protected updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;

    if (Number.isNaN(value)) {
      return;
    }

    this.setValue(value);
  }
}
