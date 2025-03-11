import { Command } from 'commander';
import { createZip } from './zip';
import { generateFileName } from './utils';
import path from 'path';

const program = new Command();

program
  .name('yc-zip')
  .description('A command-line tool for zipping files and folders')
  .version('1.0.0')
  .requiredOption('-i, --input <path>', 'Source file or folder path')
  .option('-o, --output <path>', 'Output directory path (defaults to current directory)')
  .option('-n, --name <filename>', 'Output filename (supports ${date} and ${hash} templates)')
  .action(async (options) => {
    try {
      const inputPath = path.resolve(options.input);
      const outputDir = options.output ? path.resolve(options.output) : process.cwd();
      const fileName = options.name ? generateFileName(options.name) : `${path.basename(inputPath)}.zip`;
      const outputPath = path.join(outputDir, fileName);

      await createZip(inputPath, outputPath);
      console.log(`Successfully created zip file: ${outputPath}`);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();