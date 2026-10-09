import { Component, input } from '@angular/core';
import type { Movement } from '@app/contracts';

@Component({
  selector: 'cf-movement-detail',
  templateUrl: './movement-detail.html',
})
export class MovementView {
  readonly movement = input.required<Movement>();
  readonly imageUrl = input<string | null>(null);
  readonly videoUrl = input<string | null>(null);
  protected readonly repdbHref = 'https://repdb.co';
  protected readonly workoutGuideHref = 'https://bryllim.com';
  protected readonly workoutGuideLicenseHref = 'https://creativecommons.org/licenses/by-sa/4.0/';
  protected readonly everkineticHref = 'https://github.com/everkinetic/data';

  protected showsRepdbCredit(url: string | null): boolean {
    return !!url?.includes('/media/repdb/');
  }

  protected showsWorkoutGuideCredit(url: string | null): boolean {
    return !!url?.includes('/media/workout-guide/');
  }
}
