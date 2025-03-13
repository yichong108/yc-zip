import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import chalk from 'chalk';

/**
 * Creates a zip file from the specified input path
 * @param inputPath - Path to the file or directory to zip
 * @param outputPath - Path where the zip file will be created
 * @returns Promise that resolves when the zip operation is complete
 */
export async function createZip(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create a file to write the zip to
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level (0-9)
    });

    // Listen for all archive data to be written
    output.on('close', () => {
      resolve();
    });

    // Handle errors
    archive.on('error', (err) => {
      console.error(chalk.red('[yc-zip] Archive error:'), err);
      reject(err);
    });

    // Check if input path exists
    if (!fs.existsSync(inputPath)) {
      const error = new Error(`Input path does not exist: ${inputPath}`);
      console.error(chalk.red('[yc-zip] Path error:'), error.message);
      reject(error);
      return;
    }

    // Pipe archive data to the file
    archive.pipe(output);

    // Get stats about the input path
    const stats = fs.statSync(inputPath);

    if (stats.isDirectory()) {
      // Add a directory to the archive
      archive.directory(inputPath, path.basename(inputPath));
    } else {
      // Add a file to the archive
      archive.file(inputPath, { name: path.basename(inputPath) });
    }

    // Finalize the archive
    archive.finalize();
  });
}