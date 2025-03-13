import { Command } from 'commander';
import { createZip } from './zip';
import { generateFileName } from './utils';
import path from 'path';
import packageFile from '../package.json'
import chalk from 'chalk';

const program = new Command();

// 强制启用颜色
chalk.level = 2;

program
  .name('yc-zip')
  .description('A command-line tool for zipping files and folders')
  .version(packageFile.version)
  .requiredOption('-i, --input <path>', 'Source file or folder path')
  .option('-o, --output <path>', 'Output directory path (defaults to current directory)')
  .option('-n, --name <filename>', 
    `Output filename template. Examples:
    CMD: yc-zip -i ./docs -n "docs-\${YYYYMMDD}-\${hash(4)}.zip"
    PowerShell: yc-zip -i ./docs -n 'docs-\${YYYYMMDD}-\${hash(4)}.zip'
    
    Supports:
    - Date: \${YYYY}, \${MM}, \${DD}, \${HH}, \${mm}, \${ss}
    - Hash: \${hash(n)} where n is length`)
  .action(async (options) => {
    try {
      const inputPath = path.resolve(options.input);
      const outputDir = options.output ? path.resolve(options.output) : process.cwd();
      const fileName = options.name ? generateFileName(options.name) : `${path.basename(inputPath)}.zip`;
      const outputPath = path.join(outputDir, fileName);

      console.log(chalk.blue('[yc-zip] Compressing...'));
      await createZip(inputPath, outputPath);
      console.log(chalk.green('[yc-zip] ✔ Compression completed'));
      console.log(chalk.dim('[yc-zip] Output file: ') + outputPath);
    } catch (error) {
      console.error(chalk.red('[yc-zip] Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();