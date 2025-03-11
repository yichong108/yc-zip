# API Reference

This section provides detailed information about the internal API of yc-zip for developers who want to use the library programmatically in their projects.

## Core Functions

### createZip

The main function for creating zip archives from files or directories.

```typescript
async function createZip(inputPath: string, outputPath: string): Promise<void>
```

**Parameters:**

- `inputPath` (string): Path to the file or directory to zip
- `outputPath` (string): Path where the zip file will be created

**Returns:**

- Promise that resolves when the zip operation is complete

**Example:**

```typescript
import { createZip } from 'yc-zip';

async function zipMyFiles() {
  try {
    await createZip('./my-folder', './output/archive.zip');
    console.log('Files zipped successfully!');
  } catch (error) {
    console.error('Error zipping files:', error);
  }
}
```

### generateFileName

Utility function for generating dynamic filenames based on templates.

```typescript
function generateFileName(template: string): string
```

**Parameters:**

- `template` (string): The filename template (e.g., "backup-${date}-${hash}.zip")

**Returns:**

- The generated filename with placeholders replaced

**Supported Placeholders:**

- `${date}`: Current date in YYYY-MM-DD format
- `${hash}`: Random 8-character hash

**Example:**

```typescript
import { generateFileName } from 'yc-zip';

// Generate a filename with the current date
const filename = generateFileName('backup-${date}.zip');
// Result: backup-2023-07-20.zip

// Generate a filename with date and hash
const filenameWithHash = generateFileName('archive-${date}-${hash}.zip');
// Result: archive-2023-07-20-a1b2c3d4.zip
```

## Error Handling

The API functions throw standard JavaScript Error objects that can be caught using try/catch blocks.

```typescript
try {
  await createZip(inputPath, outputPath);
} catch (error) {
  // Handle error
  console.error('Failed to create zip:', error.message);
}
```

## Integration with Other Tools

The yc-zip library can be easily integrated with other Node.js applications and build tools:

```typescript
import { createZip, generateFileName } from 'yc-zip';

// Example integration with a build process
async function buildAndArchive() {
  // Build your project
  await buildProject();
  
  // Create a timestamped archive of the build output
  const archiveName = generateFileName('build-${date}-${hash}.zip');
  await createZip('./dist', `./archives/${archiveName}`);
  
  return archiveName;
}
```