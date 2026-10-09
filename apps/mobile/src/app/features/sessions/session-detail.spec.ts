import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import type { Session } from '@app/contracts';
import { MovementRepository, SessionRepository } from '@app/frontend/data-access';
import { of } from 'rxjs';
import { SessionDetail } from './session-detail';

const session: Session = {
  id: 's1',
  title: 'WOD October 7',
  trainedOn: '2026-10-07',
  location: '',
  equipment: '',
  weather: '',
  athleteNote: '',
  coachNote: '',
  blocks: [
    {
      id: 'warmup',
      title: 'Warm-Up',
      scheme: '',
      items: [
        {
          id: 'row',
          movementId: 'single-arm-row',
          name: 'Single Arm Row',
          sets: '',
          frequencyAndTime: '10',
          tempo: '',
          note: '5/5',
        },
      ],
    },
  ],
};

describe('SessionDetail', () => {
  beforeEach(() => {
    const params = convertToParamMap({ id: 's1' });
    TestBed.configureTestingModule({
      imports: [SessionDetail],
      providers: [
        provideIonicAngular(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(params), snapshot: { paramMap: params } },
        },
        { provide: SessionRepository, useValue: { get: () => Promise.resolve(session) } },
        {
          provide: MovementRepository,
          useValue: {
            get: () => Promise.resolve(null),
            mediaUrl: () => Promise.resolve(null),
          },
        },
      ],
    });
  });

  it('shows the class without edit controls', async () => {
    const fixture = TestBed.createComponent(SessionDetail);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Warm-Up');
    expect(text).toContain('左邊');
    expect(text).toContain('右邊');
    expect(text).toContain('5 下');
    expect(text).not.toContain('新增');
    expect(text).not.toContain('儲存');
    expect(text).not.toContain('學生的感受');
  });
});
