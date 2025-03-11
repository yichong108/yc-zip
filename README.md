# yc-zip

A command-line tool for zipping files and folders with support for dynamic file naming.

## Features

- Zip single files or entire directories
- Customizable output directory
- Dynamic file naming with date and hash templates
- Written in TypeScript with full type safety
- Built with modern tooling (Vite, ESLint, Prettier)

## Installation

```bash
npm install -g yc-zip
```

## Usage

```bash
# Basic usage - zip a file or directory
yc-zip -i <input_path>

# Specify output directory
yc-zip -i <input_path> -o <output_directory>

# Use dynamic filename template
yc-zip -i <input_path> -n "backup-${date}-${hash}.zip"
```

### Command Options

- `-i, --input <path>` (required): Source file or folder path to zip
- `-o, --output <path>` (optional): Output directory path (defaults to current directory)
- `-n, --name <filename>` (optional): Output filename template

### Dynamic Filename Templates

The `--name` option supports the following placeholders:

- `${date}`: Current date in YYYY-MM-DD format
- `${hash}`: Random 8-character hash

Example:
```bash
yc-zip -i ./docs -n "docs-${date}-${hash}.zip"
# Output: docs-2023-07-15-a1b2c3d4.zip
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## Documentation

For detailed documentation, run:

```bash
npm run docs:dev
```

## License

MIT