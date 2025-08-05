import { createClient } from './bot';

describe('Bot', () => {
  test('should create Discord client', () => {
    const client = createClient();
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
  });
}); 