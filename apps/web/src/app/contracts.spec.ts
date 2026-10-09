import { COLLECTIONS } from '@app/contracts';

describe('shared contracts', () => {
  it('is visible to web', () => {
    expect(COLLECTIONS.sessions).toBe('sessions');
  });
});
