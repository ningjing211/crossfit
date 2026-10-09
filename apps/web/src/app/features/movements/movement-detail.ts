import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Movement } from '@app/contracts';
import { MovementRepository } from '@app/frontend/data-access';
import { ErrorState, LoadingState, MovementView } from '@app/frontend/ui';

type DetailState = 'loading' | 'error' | 'missing' | 'ready';

@Component({
  selector: 'web-movement-detail',
  imports: [RouterLink, MovementView, LoadingState, ErrorState],
  templateUrl: './movement-detail.html',
})
export class MovementDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly movements = inject(MovementRepository);

  protected readonly state = signal<DetailState>('loading');
  protected readonly movement = signal<Movement | null>(null);
  protected readonly imageUrl = signal<string | null>(null);
  protected readonly videoUrl = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        void this.load(id);
      }
    });
  }

  protected retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      void this.load(id);
    }
  }

  private async load(id: string): Promise<void> {
    this.state.set('loading');
    try {
      const movement = await this.movements.get(id);
      if (!movement) {
        this.movement.set(null);
        this.state.set('missing');
        return;
      }
      this.movement.set(movement);
      this.imageUrl.set(await this.movements.mediaUrl(movement.imagePath));
      this.videoUrl.set(await this.movements.mediaUrl(movement.videoPath));
      this.state.set('ready');
    } catch {
      this.state.set('error');
    }
  }
}
