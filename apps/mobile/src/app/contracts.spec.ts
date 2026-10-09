import { COLLECTIONS } from '@app/contracts';

describe('shared contracts', () => {
  it('is visible to mobile', () => {
    expect(COLLECTIONS.sessions).toBe('sessions');
  });
});
