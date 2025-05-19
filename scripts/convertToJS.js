
#!/usr/bin/env node
/**
 * This is a simple script to help convert TypeScript files to JavaScript.
 * To use it, you'll need to:
 * 1. Make this file executable: chmod +x scripts/convertToJS.js
 * 2. Run it from the project root: ./scripts/convertToJS.js
 */

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

function renameFile(filePath) {
  // Skip non-TypeScript files
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
    return;
  }
  
  // Create new file name (.ts -> .js, .tsx -> .jsx)
  const newPath = filePath.replace(/\.tsx?$/, match => 
    match === '.ts' ? '.js' : '.jsx'
  );
  
  console.log(`Renaming ${filePath} to ${newPath}`);
  fs.renameSync(filePath, newPath);
}

console.log('Converting TypeScript files to JavaScript...');
walkDir('src', renameFile);
console.log('Done!');

/**
 * Note: This script handles only the file extension changes.
 * You'll still need to manually update the file contents to remove TypeScript-specific code.
 */
