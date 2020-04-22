import { reddit } from './reddit';

describe('reddit', () => {
  it('should work', async () => {
    expect(await (await reddit().getDefaultSubreddits()).length).toBeGreaterThan(0);
  });
});