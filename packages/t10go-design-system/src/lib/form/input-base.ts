import { computed, Directive, input, ModelSignal, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

let nextControlId = 0;

/**
 * Shared behavior for single-value form controls in the design system.
 *
 * Concrete controls provide their initial/empty value and call `setValue`
 * when a user changes the control.
 */
@Directive()
export abstract class T10goInputBase<TValue> implements ControlValueAccessor {
  private readonly generatedId = `t10go-control-${nextControlId++}`;
  private readonly formDisabled = signal(false);

  abstract readonly value: ModelSignal<TValue>;
  protected abstract readonly emptyValue: TValue;

  readonly disabled = input(false);
  readonly id = input<string>();
  readonly name = input<string>();
  readonly required = input(false);

  protected readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly isDisabled = computed(
    () => this.disabled() || this.formDisabled(),
  );

  private onChange: (value: TValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: TValue | null | undefined): void {
    this.value.set(value ?? this.emptyValue);
  }

  registerOnChange(onChange: (value: TValue) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected setValue(value: TValue): void {
    this.value.set(value);
    this.onChange(value);
  }

  protected markTouched(): void {
    this.onTouched();
  }
}
