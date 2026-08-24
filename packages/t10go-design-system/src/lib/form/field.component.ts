import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Shared label, hint, and error presentation for design-system controls. */
@Component({
  selector: 't10go-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goFieldComponent {
  readonly controlId = input.required<string>();
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly required = input(false);
}
