import { ChangeDetectionStrategy, Component, forwardRef, OnInit, input, model, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { T10goFieldComponent } from '../form/field.component';
import { T10goInputBase } from '../form/input-base';
import { T10goDropdownOption } from './dropdown-option.model';

export type T10goDropdownOptionsLoader = () => Promise<readonly T10goDropdownOption[]>;

/** A single-select dropdown with an optional asynchronous options loader. */
@Component({
  selector: 't10go-dropdown',
  imports: [T10goFieldComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => T10goDropdownComponent),
      multi: true,
    },
  ],
})
export class T10goDropdownComponent extends T10goInputBase<string> implements OnInit {
  readonly value = model('');
  protected readonly emptyValue = '';

  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly placeholder = input('Select an option');
  readonly options = input<readonly T10goDropdownOption[]>([]);
  readonly optionsLoader = input<T10goDropdownOptionsLoader>();

  protected readonly loadedOptions = signal<readonly T10goDropdownOption[] | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly loadError = signal<string | null>(null);

  ngOnInit(): void {
    if (this.optionsLoader()) {
      void this.reloadOptions();
    }
  }

  async reloadOptions(): Promise<void> {
    const loader = this.optionsLoader();

    if (!loader) {
      return;
    }

    this.isLoading.set(true);
    this.loadError.set(null);

    try {
      this.loadedOptions.set(await loader());
    } catch {
      this.loadError.set('Options could not be loaded.');
    } finally {
      this.isLoading.set(false);
    }
  }

  protected selectValue(event: Event): void {
    this.setValue((event.target as HTMLSelectElement).value);
  }

  protected readonly currentOptions = (): readonly T10goDropdownOption[] =>
    this.loadedOptions() ?? this.options();

  protected readonly message = (): string | undefined =>
    this.error() ?? this.loadError() ?? undefined;
}
