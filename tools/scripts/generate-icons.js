const fs = require('fs');
const path = require('path');
const { sync: globSync } = require('glob');

// Config
const SOURCE_DIR = 'node_modules/remixicon/icons';
const OUTPUT_DIR = 'libs/prism-icons/src/lib/icons';
const BARREL_FILE = 'libs/prism-icons/src/lib/icons.ts'; // Changed to match project structure if needed, or stick to user request. 
// User requested BARREL_FILE = 'libs/prism-icons/src/lib/index.ts';
// But Phase 4 of previous task used src/index.ts. 
// Let's re-read the user request for Phase 2:
// BARREL_FILE = 'libs/prism-icons/src/lib/index.ts';
// Wait, the user request says BARREL_FILE = 'libs/prism-icons/src/lib/index.ts';
// But the exports from Phase 4 were in libs/prism-icons/src/index.ts.
// I'll stick to the user's provided script logic but adjust paths to be correct for the monorepo.

const ACTUAL_BARREL_FILE = 'libs/prism-icons/src/lib/icons.ts';
const MAIN_INDEX_FILE = 'libs/prism-icons/src/index.ts';

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper: Convert "user-smile-line" to "piUserSmileLine"
const toCamelCase = (str) => {
  return 'pi' + str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

console.log('🚀 Starting Icon Generation...');

// 1. Find all SVGs
const svgFiles = globSync(`${SOURCE_DIR}/**/*.svg`);
const iconExports = [];

svgFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(file, '.svg');
  const variableName = toCamelCase(fileName);

  // 2. Extract inner path (Strip <svg> tags)
  const svgContentMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  
  if (svgContentMatch) {
    let svgPath = svgContentMatch[1];
    
    // Clean up: Remove fill="..." to allow CSS coloring
    svgPath = svgPath.replace(/fill="[^"]*"/g, 'fill="currentColor"');

    // 3. Create TS File Content
    const tsContent = `import { PrismIconDef } from '../types';

export const ${variableName}: PrismIconDef = {
  name: '${fileName}',
  data: \`${svgPath.trim()}\`
};
`;

    // Write individual icon file (for tree-shaking)
    fs.writeFileSync(path.join(OUTPUT_DIR, `${fileName}.ts`), tsContent);
    iconExports.push({ name: fileName, variable: variableName });
  }
});

// 4. Generate Internal Barrel File (lib/icons.ts)
const internalBarrelContent = iconExports
  .map(icon => `export * from './icons/${icon.name}';`)
  .join('\n');

fs.writeFileSync(ACTUAL_BARREL_FILE, internalBarrelContent);

// 5. Update Main Index File (src/index.ts) if necessary, or just ensure it exports lib/icons
const mainIndexContent = `export * from './lib/types';
export * from './lib/icons';
`;
fs.writeFileSync(MAIN_INDEX_FILE, mainIndexContent);

console.log(`✅ Successfully generated ${iconExports.length} icons!`);
