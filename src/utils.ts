import crypto from 'crypto';

/**
 * Generates a filename based on a template string
 * Supports ${date} and ${hash} placeholders
 * 
 * @param template - The filename template (e.g., "backup-${date}-${hash}.zip")
 * @returns The generated filename with placeholders replaced
 */
export function generateFileName(template: string): string {
  // Replace ${date} with current date in YYYY-MM-DD format
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  let result = template.replace(/\$\{date\}/g, dateStr);
  
  // Replace ${hash} with a random hash (first 8 characters)
  if (result.includes('${hash}')) {
    const randomData = now.getTime().toString() + Math.random().toString();
    const hash = crypto.createHash('md5').update(randomData).digest('hex').substring(0, 8);
    result = result.replace(/\$\{hash\}/g, hash);
  }
  
  return result;
}