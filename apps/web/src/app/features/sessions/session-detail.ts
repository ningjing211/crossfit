import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Session } from '@app/contracts';
import { MovementRepository, SessionRepository } from '@app/frontend/data-access';
import { ClassDetail, ErrorState, LoadingState, type ClassMedia } from '@app/frontend/ui';

type DetailState = 'loading' | 'error' | 'missing' | 'ready';

@Component({
  selector: 'web-session-detail',
  imports: [RouterLink, ClassDetail, LoadingState, ErrorState],
  templateUrl: './session-detail.html',
})
export class SessionDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly sessions = inject(SessionRepository);
  private readonly movements = inject(MovementRepository);

  protected readonly state = signal<DetailState>('loading');
  protected readonly session = signal<Session | null>(null);
  protected readonly media = signal<Record<string, ClassMedia>>({});

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
      const session = await this.sessions.get(id);
      if (!session) {
        this.session.set(null);
        this.state.set('missing');
        return;
      }
      this.session.set(session);
      this.media.set(await this.loadMedia(session));
      this.state.set('ready');
    } catch {
      this.state.set('error');
    }
  }

  private async loadMedia(session: Session): Promise<Record<string, ClassMedia>> {
    const ids = [
      ...new Set(
        session.blocks.flatMap((block) =>
          block.items.map((item) => item.movementId).filter((id): id is string => !!id),
        ),
      ),
    ];
    const entries = await Promise.all(
      ids.map(async (id) => {
        try {
          const movement = await this.movements.get(id);
          if (!movement) {
            return [id, { imageUrl: null, videoUrl: null, cues: '' }] as const;
          }
          const [imageUrl, videoUrl] = await Promise.all([
            this.movements.mediaUrl(movement.imagePath),
            this.movements.mediaUrl(movement.videoPath),
          ]);
          return [id, { imageUrl, videoUrl, cues: movement.cues }] as const;
        } catch {
          return [id, { imageUrl: null, videoUrl: null, cues: '' }] as const;
        }
      }),
    );
    return Object.fromEntries(entries);
  }
}
