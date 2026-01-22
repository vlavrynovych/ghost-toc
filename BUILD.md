# Build Instructions

This document explains how to build the minified distribution file from source.

## Prerequisites

- Node.js 14+ and npm

## Installation

Install the development dependencies:

```bash
npm install
```

## Build Commands

### Full Build

Build the minified distribution file:

```bash
npm run build
```

This will:
1. Minify `src/ghost-toc.js` using Terser
2. Wrap the minified code in `<script>` tags
3. Add the header comment
4. Output to `dist/ghost-toc.min.js`

### Clean Build Artifacts

Remove temporary build files:

```bash
npm run clean
```

## Build Process Details

The build process consists of two steps:

### 1. Minification (`build:minify`)

Uses Terser to minify the source code:
- Compresses code (`-c`)
- Mangles variable names (`-m`)
- Preserves important comments (starting with `/*!`)
- Creates temporary file: `dist/ghost-toc.temp.js`

### 2. Wrapping (`build:wrap`)

Runs `scripts/wrap-script.js` which:
- Reads the minified temporary file
- Wraps it in `<script>` tags for Ghost code injection
- Adds version and license header comment
- Outputs final file: `dist/ghost-toc.min.js`
- Cleans up temporary file

## File Structure

```
ghost-toc/
├── src/
│   └── ghost-toc.js          # Source code (edit this)
├── dist/
│   └── ghost-toc.min.js      # Distribution file (auto-generated)
├── scripts/
│   └── wrap-script.js        # Build wrapper script
└── package.json              # Build configuration
```

## Development Workflow

1. Make changes to `src/ghost-toc.js`
2. Run `npm run build` to generate distribution file
3. Test the changes using example files in `examples/`
4. Commit both source and distribution files

## Manual Build (Without npm)

If you prefer not to use npm, you can manually minify:

1. Use any JavaScript minifier (Terser, UglifyJS, etc.)
2. Wrap the output in `<script>` tags
3. Add the header comment:
   ```
   /* Ghost TOC v2.1 | MIT License | github.com/vlavrynovych/ghost-toc */
   ```

## Troubleshooting

### "terser: command not found"

Make sure you've run `npm install` to install development dependencies.

### Build fails on Windows

The `clean` script uses Unix commands. On Windows, either:
- Use Git Bash or WSL
- Manually delete temporary files
- Or modify the clean script in package.json to use Windows commands

## Notes

- The distribution file (`dist/ghost-toc.min.js`) is committed to the repository for easy user access
- Always rebuild before committing changes to source code
- The build is deterministic - same input produces same output
