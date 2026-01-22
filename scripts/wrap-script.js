#!/usr/bin/env node

/**
 * Build script to wrap the minified JavaScript in <script> tags
 * and add header comment for the distribution file.
 */

const fs = require('fs');
const path = require('path');

const tempFile = path.join(__dirname, '../dist/ghost-toc.temp.js');
const outputFile = path.join(__dirname, '../dist/ghost-toc.min.js');
const packageFile = path.join(__dirname, '../package.json');

// Read package.json to get version
const packageJson = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
const version = packageJson.version;

// Read the minified code
const minifiedCode = fs.readFileSync(tempFile, 'utf8');

// Create the final output with script tags and header
const output = `<script>
/* Ghost TOC v${version} | MIT License | github.com/vlavrynovych/ghost-toc */
${minifiedCode}
</script>`;

// Write the final file
fs.writeFileSync(outputFile, output, 'utf8');

// Clean up temp file
fs.unlinkSync(tempFile);

console.log('✓ Build complete: dist/ghost-toc.min.js');