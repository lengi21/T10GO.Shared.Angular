import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { T10goNavigationItem } from './models/navigation-item.model';

@Component({
  selector: 't10go-sidebar-item',
  imports: [RouterLink, forwardRef(() => T10goSidebarItemComponent)],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goSidebarItemComponent {
  readonly item = input.required<T10goNavigationItem>();
  protected readonly expanded = signal(false);

  protected readonly hasChildren = (): boolean => Boolean(this.item().children?.length);

  protected toggleExpanded(): void {
    if (this.hasChildren()) {
      this.expanded.update((value) => !value);
    }
  }
}
