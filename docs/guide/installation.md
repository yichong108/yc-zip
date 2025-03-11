# Installation Guide

This guide will walk you through the process of installing the yc-zip command-line tool on your system.

## Prerequisites

Before installing yc-zip, make sure you have the following prerequisites installed on your system:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

You can check if you have Node.js and npm installed by running the following commands in your terminal:

```bash
node --version
npm --version
```

## Global Installation

The recommended way to install yc-zip is globally, which makes the command available system-wide:

```bash
npm install -g yc-zip
```

After installation, you can verify that yc-zip is installed correctly by running:

```bash
yc-zip --version
```

This should display the version number of the installed yc-zip tool.

## Local Installation

If you prefer to install yc-zip locally in your project, you can run:

```bash
npm install yc-zip
```

When installed locally, you can run the tool using npx:

```bash
npx yc-zip -i <input_path>
```

## Building from Source

If you want to build yc-zip from source, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yc-zip.git
   cd yc-zip
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link the package globally (optional):
   ```bash
   npm link
   ```

Now you can use the yc-zip command from anywhere on your system.

## Next Steps

Once you have yc-zip installed, check out the [Usage Guide](./usage.md) to learn how to use the tool effectively.