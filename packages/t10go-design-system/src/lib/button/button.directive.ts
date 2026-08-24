import { Directive, HostBinding, input } from '@angular/core';

export type T10goButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type T10goButtonSize = 'sm' | 'md' | 'lg';

/** Applies a consistent, accessible T10GO button treatment to a native button or link. */
@Directive({ selector: 'button[t10goButton], a[t10goButton]' })
export class T10goButtonDirective {
  readonly variant = input<T10goButtonVariant>('primary');
  readonly size = input<T10goButtonSize>('md');
  readonly block = input(false);

  @HostBinding('class.t10go-button') protected readonly buttonClass = true;
  @HostBinding('attr.data-variant') protected get buttonVariant(): T10goButtonVariant { return this.variant(); }
  @HostBinding('attr.data-size') protected get buttonSize(): T10goButtonSize { return this.size(); }
  @HostBinding('attr.data-block') protected get isBlock(): string | null { return this.block() ? '' : null; }
}
