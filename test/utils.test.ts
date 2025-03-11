import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateFileName } from '../src/utils';

describe('generateFileName', () => {
  // Save original Date implementation
  const RealDate = global.Date;
  
  beforeEach(() => {
    // Mock Date to return a fixed date
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate('2023-01-15T12:00:00Z');
      }
      static now() {
        return new RealDate('2023-01-15T12:00:00Z').getTime();
      }
    } as DateConstructor;
  });

  afterEach(() => {
    // Restore original Date
    global.Date = RealDate;
  });

  it('should replace ${date} with current date', () => {
    const template = 'backup-${date}.zip';
    const result = generateFileName(template);
    expect(result).toBe('backup-2023-01-15.zip');
  });

  it('should return the template unchanged if no placeholders are present', () => {
    const template = 'backup.zip';
    const result = generateFileName(template);
    expect(result).toBe('backup.zip');
  });
});