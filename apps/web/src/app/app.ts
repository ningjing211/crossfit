import { Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'web-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly siteMenu = viewChild<ElementRef<HTMLElement>>('siteMenu');

  protected readonly open = signal(false);
  protected readonly narrow = signal(false);
  protected readonly section = signal<'sessions' | 'movements'>('sessions');

  constructor() {
    this.syncSection();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.open.set(false);
        this.syncSection();
      });

    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia('(max-width: 720px)');
    const apply = () => {
      this.narrow.set(query.matches);
      if (!query.matches) {
        this.open.set(false);
      }
    };
    apply();
    query.addEventListener('change', apply);
    this.destroyRef.onDestroy(() => query.removeEventListener('change', apply));
  }

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (!next) {
      return;
    }
    setTimeout(() => {
      this.siteMenu()?.nativeElement.querySelector('a')?.focus();
    });
  }

  protected close(restoreFocus = false): void {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    if (restoreFocus) {
      this.menuButton()?.nativeElement.focus();
    }
  }

  protected onMenuFocusOut(event: FocusEvent): void {
    if (!this.narrow() || !this.open()) {
      return;
    }
    const next = event.relatedTarget;
    const menu = event.currentTarget;
    if (next instanceof Node && menu instanceof HTMLElement && menu.contains(next)) {
      return;
    }
    if (next instanceof Node && this.menuButton()?.nativeElement.contains(next)) {
      return;
    }
    this.close();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close(true);
  }

  private syncSection(): void {
    this.section.set(this.router.url.startsWith('/movements') ? 'movements' : 'sessions');
  }
}
