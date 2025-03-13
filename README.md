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
yc-zip -i <input_path> -n "backup-${YYYYMMDDHHmmss}-${hash}.zip"
```

### Command Options

- `-i, --input <path>` (required): Source file or folder path to zip
- `-o, --output <path>` (optional): Output directory path (defaults to current directory)
- `-n, --name <filename>` (optional): Output filename template

### Dynamic Filename Templates

The `--name` option supports the following placeholders:

- `${YYYY}`: Year (e.g., 2024)
- `${MM}`: Month (01-12)
- `${DD}`: Day (01-31)
- `${HH}`: Hour in 24-hour format (00-23)
- `${mm}`: Minutes (00-59)
- `${ss}`: Seconds (00-59)
- `${hash(n)}`: Random n-length hexadecimal hash (0-9, A-F)

Examples:
```bash
# Basic date format
yc-zip -i ./docs -n "docs-${YYYYMMDD}.zip"
# Output: docs-20240115.zip

# Date with time
yc-zip -i ./docs -n "docs-${YYYY}${MM}${DD}-${HH}${mm}.zip"
# Output: docs-20240115-1045.zip

# With custom length hash
yc-zip -i ./docs -n "docs-${YYYYMMDD}-${hash(4)}.zip"
# Output: docs-20240115-A12F.zip
```

```powershell
# Basic date format
yc-zip -i ./docs -n 'docs-${YYYYMMDD}.zip'

# Date with time
yc-zip -i ./docs -n 'docs-${YYYY}${MM}${DD}-${HH}${mm}.zip'

# With custom length hash
yc-zip -i ./docs -n 'docs-${YYYYMMDD}-${hash(4)}.zip'
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

## License

MIT