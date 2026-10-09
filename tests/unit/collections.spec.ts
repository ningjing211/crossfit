import { describe, expect, it } from 'vitest';
import { COLLECTIONS, movementImagePath, movementVideoPath } from '@app/contracts';

describe('firestore contract', () => {
  it('uses the collection names from the data model', () => {
    expect(COLLECTIONS.movements).toBe('movements');
    expect(COLLECTIONS.sessions).toBe('sessions');
  });

  it('stores one image and one video per movement', () => {
    expect(movementImagePath('clean')).toBe('movements/clean/image');
    expect(movementVideoPath('clean')).toBe('movements/clean/video');
  });
});
