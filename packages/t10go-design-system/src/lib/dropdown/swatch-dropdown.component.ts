import { ChangeDetectionStrategy, Component, HostListener, input, model, signal } from '@angular/core';
import { T10goSwatchDropdownOption } from './swatch-dropdown-option.model';

/** A reusable dropdown that presents named options with visible color swatches. */
@Component({
  selector: 't10go-swatch-dropdown',
  templateUrl: './swatch-dropdown.component.html',
  styleUrl: './swatch-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goSwatchDropdownComponent {
  readonly value = model('');
  readonly label = input('Palette');
  readonly options = input<readonly T10goSwatchDropdownOption[]>([]);

  protected readonly isOpen = signal(false);

  protected readonly selectedOption = (): T10goSwatchDropdownOption | undefined =>
    this.options().find((option) => option.value === this.value());

  protected toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  protected select(option: T10goSwatchDropdownOption): void {
    if (option.disabled) {
      return;
    }

    this.value.set(option.value);
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected closeOnEscape(): void {
    this.isOpen.set(false);
  }
}
