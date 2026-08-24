import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { T10goNavigationItem } from './models/navigation-item.model';
import { T10goSidebarItemComponent } from './sidebar-item.component';

@Component({
  selector: 't10go-sidebar',
  imports: [T10goSidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class T10goSidebarComponent {
  readonly items = input.required<readonly T10goNavigationItem[]>();
  readonly ariaLabel = input('Main navigation');
}
