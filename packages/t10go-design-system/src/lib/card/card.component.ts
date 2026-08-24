import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

export type T10goCardPadding = 'none' | 'sm' | 'md' | 'lg';

/** A reusable elevated surface for grouped application content. */
@Component({
  selector: 't10go-card',
  template: '<ng-content />',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goCardComponent {
  readonly padding = input<T10goCardPadding>('md');

  @HostBinding('class.t10go-card') protected readonly cardClass = true;
  @HostBinding('attr.data-padding') protected get cardPadding(): T10goCardPadding { return this.padding(); }
}
