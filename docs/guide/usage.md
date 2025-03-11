# Usage Guide

This guide explains how to use the yc-zip command-line tool to compress files and folders.

## Basic Usage

The most basic way to use yc-zip is to specify an input file or folder that you want to compress:

```bash
yc-zip -i <input_path>
```

This will create a zip file in the current directory with the same name as the input file or folder.

## Command Options

yc-zip supports the following command-line options:

| Option | Description |
|--------|-------------|
| `-i, --input <path>` | **Required**. The source file or folder to compress |
| `-o, --output <path>` | Optional. The output directory where the zip file will be saved (defaults to current directory) |
| `-n, --name <filename>` | Optional. The output filename template (supports dynamic placeholders) |

## Examples

### Zipping a Single File

```bash
yc-zip -i document.pdf
```

This will create `document.pdf.zip` in the current directory.

### Zipping a Directory

```bash
yc-zip -i ./project-folder
```

This will create `project-folder.zip` in the current directory.

### Specifying an Output Directory

```bash
yc-zip -i ./project-folder -o ./backups
```

This will create `project-folder.zip` in the `./backups` directory.

### Using Dynamic Filename Templates

yc-zip supports dynamic filename templates with the following placeholders:

- `${date}`: Current date in YYYY-MM-DD format
- `${hash}`: Random 8-character hash

For example:

```bash
yc-zip -i ./project-folder -n "backup-${date}-${hash}.zip"
```

This might create a file like `backup-2023-07-20-a1b2c3d4.zip`.

### Combining Options

You can combine all options together:

```bash
yc-zip -i ./project-folder -o ./backups -n "project-${date}.zip"
```

This will create a file like `project-2023-07-20.zip` in the `./backups` directory.

## Error Handling

yc-zip will display helpful error messages if something goes wrong:

- If the input path doesn't exist
- If the output directory can't be created
- If there are permission issues

## Next Steps

For more advanced usage and API documentation, check out the [API Reference](../api/index.md) section.