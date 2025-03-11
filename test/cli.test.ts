import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Mock dependencies
vi.mock('fs');
vi.mock('child_process');

describe('CLI Integration Tests', () => {
  // Setup mocks
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock fs functions
    fs.existsSync = vi.fn().mockReturnValue(true);
    // @ts-ignore
    fs.statSync = vi.fn().mockReturnValue({
      isDirectory: vi.fn().mockReturnValue(false),
    });
  });

  it('should zip a file with default options', async () => {
    // Mock exec to simulate CLI execution
    vi.mocked(execPromise).mockResolvedValue({
      stdout: 'Successfully created zip file: /path/to/output/file.zip\n',
      stderr: ''
    });

    // Execute CLI command
    const { stdout, stderr } = await execPromise('node bin/yc-zip.js -i /path/to/file.txt');
    
    // Verify
    expect(stderr).toBe('');
    expect(stdout).toContain('Successfully created zip file:');
  });

  it('should zip a directory with custom output path', async () => {
    // Setup
    // @ts-ignore
    fs.statSync = vi.fn().mockReturnValue({
      isDirectory: vi.fn().mockReturnValue(true),
    });
    
    // Mock exec to simulate CLI execution
    vi.mocked(execPromise).mockResolvedValue({
      stdout: 'Successfully created zip file: /custom/output/directory.zip\n',
      stderr: ''
    });

    // Execute CLI command
    const { stdout, stderr } = await execPromise('node bin/yc-zip.js -i /path/to/directory -o /custom/output');
    
    // Verify
    expect(stderr).toBe('');
    expect(stdout).toContain('Successfully created zip file: /custom/output/directory.zip');
  });

  it('should zip a file with custom filename', async () => {
    // Mock exec to simulate CLI execution
    vi.mocked(execPromise).mockResolvedValue({
      stdout: 'Successfully created zip file: /path/to/output/custom-name.zip\n',
      stderr: ''
    });

    // Execute CLI command
    const { stdout, stderr } = await execPromise('node bin/yc-zip.js -i /path/to/file.txt -n custom-name.zip');
    
    // Verify
    expect(stderr).toBe('');
    expect(stdout).toContain('Successfully created zip file:');
    expect(stdout).toContain('custom-name.zip');
  });
});