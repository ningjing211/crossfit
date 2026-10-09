import { describe, expect, it } from 'vitest';
import { VALIDATION, movementNameError, sessionProgramError } from '@app/contracts';

describe('validation', () => {
  it('requires a movement name', () => {
    expect(movementNameError('  ')).toBe(VALIDATION.movementName);
    expect(movementNameError('Clean')).toBeNull();
  });

  it('requires a real class date and block text', () => {
    expect(sessionProgramError({ trainedOn: '', blocks: [] })).toBe(VALIDATION.trainedOn);
    expect(sessionProgramError({ trainedOn: '2026-02-31', blocks: [] })).toBe(VALIDATION.trainedOn);
    expect(
      sessionProgramError({
        trainedOn: '2026-10-07',
        blocks: [{ id: 'b', title: ' ', scheme: '', items: [] }],
      }),
    ).toBe(VALIDATION.blockTitle);
    expect(
      sessionProgramError({
        trainedOn: '2026-10-07',
        blocks: [
          {
            id: 'b',
            title: 'Warm-Up',
            scheme: '',
            items: [
              {
                id: 'i',
                movementId: null,
                name: '',
                sets: '',
                frequencyAndTime: '10',
                tempo: '',
                note: '5/5',
              },
            ],
          },
        ],
      }),
    ).toBe(VALIDATION.itemName);
    expect(sessionProgramError({ trainedOn: '2026-10-07', blocks: [] })).toBeNull();
  });
});
