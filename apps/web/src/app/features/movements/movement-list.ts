import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Movement } from '@app/contracts';
import { MovementRepository } from '@app/frontend/data-access';
import { EmptyState, ErrorState, LoadingState, splitMovementName } from '@app/frontend/ui';

type ListState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error' }
  | { kind: 'ready'; movements: Movement[] };

@Component({
  selector: 'web-movement-list',
  imports: [RouterLink, LoadingState, EmptyState, ErrorState],
  templateUrl: './movement-list.html',
})
export class MovementList {
  private readonly movements = inject(MovementRepository);
  protected readonly state = signal<ListState>({ kind: 'loading' });

  constructor() {
    void this.reload();
  }

  protected splitName(name: string): { english: string; chinese: string } {
    return splitMovementName(name);
  }

  protected reload(): void {
    this.state.set({ kind: 'loading' });
    void this.movements
      .list()
      .then((movements) => {
        this.state.set(movements.length ? { kind: 'ready', movements } : { kind: 'empty' });
      })
      .catch(() => this.state.set({ kind: 'error' }));
  }
}
