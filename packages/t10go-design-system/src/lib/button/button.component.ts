import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

export type T10goButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type T10goButtonType = 'button' | 'reset' | 'submit';

/** Token-driven action component. It wraps a real button so keyboard and form behavior remain native. */
@Component({
  selector: 't10go-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goButtonComponent {
  readonly variant = input<T10goButtonVariant>('primary');
  readonly type = input<T10goButtonType>('button');
  readonly disabled = input(false);
  readonly block = input(false);

  @HostBinding('class.t10go-button-host--block')
  protected get isBlock(): boolean { return this.block(); }
}
