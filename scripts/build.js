/**
 * Build Script for Compass24 Landing Pages
 * 
 * Compiles HTML pages into single, self-contained files without external dependencies.
 * Each output file contains:
 * - All CSS inlined
 * - All JavaScript inlined
 * - Minified for production
 * 
 * Usage:
 *   node scripts/build.js           # Build once
 *   node scripts/build.js --watch   # Watch for changes
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { minify as minifyHtml } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as minifyJs } from 'terser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Pages to build
const PAGES = ['ueber-uns.html', 'jobs.html'];

// CSS files to inline (in order)
const CSS_FILES = [
  'css/design-tokens.css',
  'css/styles.css',
  'css/components/timeline.css',
  'css/components/accordion.css'
];

// JS files to inline (in order)
const JS_FILES = [
  'js/components/image-slider.js',
  'js/components/animated-counter.js',
  'js/main.js'
];

/**
 * Read and concatenate CSS files
 */
async function buildCSS() {
  const cssContents = [];
  
  for (const file of CSS_FILES) {
    try {
      const content = await fs.readFile(path.join(ROOT_DIR, file), 'utf-8');
      cssContents.push(`/* === ${file} === */\n${content}`);
    } catch (err) {
      console.warn(`Warning: Could not read ${file}: ${err.message}`);
    }
  }

  const combinedCSS = cssContents.join('\n\n');
  
  // Minify CSS
  const minified = new CleanCSS({
    level: 2,
    returnPromise: false
  }).minify(combinedCSS);

  if (minified.errors.length > 0) {
    console.error('CSS minification errors:', minified.errors);
  }

  return minified.styles;
}

/**
 * Read and concatenate JS files, converting ES modules to IIFE
 */
async function buildJS() {
  const jsContents = [];

  for (const file of JS_FILES) {
    try {
      let content = await fs.readFile(path.join(ROOT_DIR, file), 'utf-8');
      
      // Remove import/export statements for bundling
      content = content
        .replace(/^import\s+.*?['"]\s*;?\s*$/gm, '')
        .replace(/^export\s+default\s+/gm, '')
        .replace(/^export\s+/gm, '');
      
      jsContents.push(`/* === ${file} === */\n${content}`);
    } catch (err) {
      console.warn(`Warning: Could not read ${file}: ${err.message}`);
    }
  }

  // Wrap in IIFE
  const combinedJS = `(function() {\n'use strict';\n${jsContents.join('\n\n')}\n})();`;

  // Minify JS
  const minified = await minifyJs(combinedJS, {
    compress: {
      drop_console: false,
      passes: 2
    },
    mangle: true,
    format: {
      comments: false
    }
  });

  return minified.code;
}

/**
 * Extract CMS page content from HTML
 */
function extractCMSContent(html) {
  // Find the .cms-page div content
  const startMarker = '<!-- ============================================\n       CMS PAGE CONTENT START';
  const endMarker = '<!-- ============================================\n       CMS PAGE CONTENT END';
  
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    // Fallback: try to find .cms-page div
    const cmsMatch = html.match(/<div class="cms-page">([\s\S]*?)<\/div>\s*<!-- /);
    if (cmsMatch) {
      return cmsMatch[0].replace(/<!-- $/, '');
    }
    console.warn('Could not find CMS content markers, using full body content');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : html;
  }

  // Extract from start to end of CMS content div
  const contentStart = html.indexOf('<div class="cms-page">', startIndex);
  const contentEnd = html.indexOf('</div>', endIndex) + 6;
  
  return html.substring(contentStart, contentEnd);
}

/**
 * Build a single page
 */
async function buildPage(pageName, css, js) {
  console.log(`Building ${pageName}...`);

  const htmlPath = path.join(ROOT_DIR, pageName);
  const html = await fs.readFile(htmlPath, 'utf-8');

  // Extract just the CMS content
  const cmsContent = extractCMSContent(html);

  // Build the output with inlined styles and scripts
  const output = `<!-- 
  Compass24 Landing Page: ${pageName}
  Built: ${new Date().toISOString()}
  
  This is a standalone CMS page content file.
  Inject this content into the .cms-page div on the live site.
-->
<style>
${css}
</style>

${cmsContent}

<script>
${js}
</script>`;

  // Minify HTML
  const minified = await minifyHtml(output, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: false, // Keep the header comment
    minifyCSS: false, // Already minified
    minifyJS: false, // Already minified
    removeAttributeQuotes: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  });

  // Write output
  const outputPath = path.join(DIST_DIR, pageName);
  await fs.writeFile(outputPath, minified, 'utf-8');

  const stats = await fs.stat(outputPath);
  console.log(`  ✓ ${pageName} (${(stats.size / 1024).toFixed(1)} KB)`);

  return outputPath;
}

/**
 * Main build function
 */
async function build() {
  console.log('\n🔨 Building Compass24 Landing Pages...\n');

  // Ensure dist directory exists
  await fs.mkdir(DIST_DIR, { recursive: true });

  // Build CSS and JS once (shared across pages)
  console.log('Compiling CSS...');
  const css = await buildCSS();
  console.log(`  ✓ CSS compiled (${(css.length / 1024).toFixed(1)} KB)\n`);

  console.log('Compiling JavaScript...');
  const js = await buildJS();
  console.log(`  ✓ JavaScript compiled (${(js.length / 1024).toFixed(1)} KB)\n`);

  // Build each page
  console.log('Building pages:');
  for (const page of PAGES) {
    await buildPage(page, css, js);
  }

  console.log('\n✅ Build complete! Output in ./dist/\n');
}

/**
 * Watch mode
 */
async function watch() {
  const chokidar = await import('chokidar');
  
  console.log('👀 Watching for changes...\n');
  
  const watcher = chokidar.watch([
    path.join(ROOT_DIR, '*.html'),
    path.join(ROOT_DIR, 'css/**/*.css'),
    path.join(ROOT_DIR, 'js/**/*.js')
  ], {
    ignoreInitial: true,
    ignored: /node_modules|dist/
  });

  watcher.on('change', async (filePath) => {
    console.log(`\n📝 Changed: ${path.relative(ROOT_DIR, filePath)}`);
    try {
      await build();
    } catch (err) {
      console.error('Build error:', err.message);
    }
  });

  // Initial build
  await build();
}

// Run
const isWatch = process.argv.includes('--watch');
if (isWatch) {
  watch().catch(console.error);
} else {
  build().catch(console.error);
}
