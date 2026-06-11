import { describe, expect, it } from 'vitest';

describe('project test harness', () => {
  it('runs unit tests in CI', () => {
    expect(true).toBe(true);
  });

  it('has a valid Node test environment', () => {
    expect(typeof process.version).toBe('string');
  });
});
