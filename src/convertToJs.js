
#!/usr/bin/env node
/**
 * This script converts TypeScript files to JavaScript in the project
 * Run it with: node src/convertToJs.js
 */

const fs = require('fs');
const path = require('path');

// Function to walk through directories
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

// Function to convert a single file from TS to JS
function convertFile(filePath) {
  // Skip non-TypeScript files and read-only files
  if ((!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) || 
      filePath.includes('node_modules') ||
      filePath.includes('vite-env.d.ts')) {
    return;
  }
  
  // Create new file name (.ts -> .js, .tsx -> .jsx)
  const newPath = filePath.replace(/\.tsx?$/, match => 
    match === '.ts' ? '.js' : '.jsx'
  );
  
  console.log(`Converting ${filePath} to ${newPath}`);
  
  try {
    // Read the content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove type annotations
    content = content.replace(/: [A-Za-z<>[\]|&{}()\s]+(?=[,)]|=>|\s+[=;]|$)/g, '');
    content = content.replace(/<[A-Za-z<>[\]|&{}()\s]+>(?=\()/g, '');
    content = content.replace(/interface\s+\w+\s*{[^}]*}/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[^;]*;/g, '');
    
    // Update imports to use .jsx extension
    content = content.replace(/from ['"]([^'"]+)\.tsx?['"]/g, (match, p1) => {
      return `from '${p1}${p1.endsWith('.tsx') ? '.jsx' : '.js'}'`;
    });
    
    // Write the new file
    fs.writeFileSync(newPath, content, 'utf8');
    
    // If the files are different, delete the TypeScript file
    if (filePath !== newPath) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Function to update imports in JS/JSX files to point to JS/JSX files
function updateImportsInFile(filePath) {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) {
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update import paths to .js/.jsx
    content = content.replace(/from ['"]([^'"]+)(\.tsx?)?['"]/g, (match, p1, p2) => {
      // Skip external modules
      if (!p1.startsWith('.') && !p1.startsWith('@/')) {
        return match;
      }
      
      if (p2 === '.tsx') {
        return `from '${p1}.jsx'`;
      } else if (p2 === '.ts') {
        return `from '${p1}.js'`;
      } else {
        return match;
      }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error);
  }
}

// Main function to convert the project
function convertProject() {
  // First convert all TS files to JS
  console.log('Converting TypeScript files to JavaScript...');
  walkDir('src', convertFile);
  
  // Then update all imports
  console.log('Updating import statements...');
  walkDir('src', updateImportsInFile);
  
  console.log('Conversion complete!');
}

// Run the conversion
convertProject();

