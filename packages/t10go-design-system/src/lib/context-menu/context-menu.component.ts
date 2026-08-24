import { ElementRef, HostListener, inject, signal } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * A projected dropdown menu. Mark its trigger with `t10goContextMenuTrigger`
 * and its panel with `t10goContextMenuContent`.
 */
@Component({
  selector: 't10go-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.t10go-context-menu--open]': 'isOpen()',
  },
})
export class T10goContextMenuComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('click', ['$event'])
  protected onHostClick(event: MouseEvent): void {
    const target = event.target as Element | null;

    if (target?.closest('[t10goContextMenuTrigger]')) {
      this.toggle();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close();
  }
}
