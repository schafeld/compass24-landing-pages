/**
 * Build Script for Compass24 Landing Pages
 * 
 * Compiles HTML pages into single, self-contained files for CMS injection.
 * Each output file contains:
 * - All CSS scoped under a unique wrapper class
 * - All JavaScript inlined
 * - Only the CMS content (no header/footer)
 * - Ready to inject via document.querySelector('.cms-page').innerHTML = content
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

// Unique wrapper class to scope all CSS and prevent conflicts
const WRAPPER_CLASS = 'compass24-landing-2026';

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
 * Scope all CSS selectors with wrapper class to prevent style leakage
 * Uses a proper CSS parser approach to handle nested @media blocks
 */
function scopeCSSSelectors(css, wrapperClass) {
  // Use a state machine approach to properly handle CSS structure
  let result = '';
  let i = 0;
  let depth = 0; // Track nesting depth
  let inAtRule = false;
  let atRuleType = '';
  
  while (i < css.length) {
    // Check for @ rules
    if (css[i] === '@') {
      // Find the @ rule name
      let atRuleMatch = css.slice(i).match(/^@([\w-]+)/);
      if (atRuleMatch) {
        atRuleType = atRuleMatch[1];
        
        // Handle @keyframes and @font-face - preserve as-is
        if (atRuleType === 'keyframes' || atRuleType === 'font-face') {
          // Find the complete block
          let blockStart = css.indexOf('{', i);
          if (blockStart !== -1) {
            let blockDepth = 1;
            let blockEnd = blockStart + 1;
            while (blockEnd < css.length && blockDepth > 0) {
              if (css[blockEnd] === '{') blockDepth++;
              else if (css[blockEnd] === '}') blockDepth--;
              blockEnd++;
            }
            result += css.slice(i, blockEnd);
            i = blockEnd;
            continue;
          }
        }
        
        // Handle @media and other at-rules - preserve the at-rule, scope the contents
        if (atRuleType === 'media' || atRuleType === 'supports' || atRuleType === 'layer') {
          // Find opening brace
          let bracePos = css.indexOf('{', i);
          if (bracePos !== -1) {
            // Output the @media part as-is
            result += css.slice(i, bracePos + 1);
            i = bracePos + 1;
            
            // Now process the content inside the @media block
            let mediaDepth = 1;
            let mediaContent = '';
            let mediaEnd = i;
            
            while (mediaEnd < css.length && mediaDepth > 0) {
              if (css[mediaEnd] === '{') mediaDepth++;
              else if (css[mediaEnd] === '}') mediaDepth--;
              
              if (mediaDepth > 0) {
                mediaContent += css[mediaEnd];
              }
              mediaEnd++;
            }
            
            // Recursively scope the content inside @media
            result += scopeSimpleCSS(mediaContent, wrapperClass);
            result += '}';
            i = mediaEnd;
            continue;
          }
        }
      }
    }
    
    // Regular CSS outside @-rules - scope it
    // Find the next rule
    let nextAt = css.indexOf('@', i);
    let chunk = nextAt === -1 ? css.slice(i) : css.slice(i, nextAt);
    
    if (chunk.trim()) {
      result += scopeSimpleCSS(chunk, wrapperClass);
    }
    
    if (nextAt === -1) break;
    i = nextAt;
  }
  
  return result;
}

/**
 * Scope simple CSS (no nested @-rules) with wrapper class
 */
function scopeSimpleCSS(css, wrapperClass) {
  return css.replace(
    /([^{}]+)\{/g,
    (match, selectors) => {
      // Skip empty selectors
      if (!selectors.trim()) return match;
      
      // Skip :root
      if (selectors.includes(':root')) return match;
      
      // Process comma-separated selectors
      const scopedSelectors = selectors
        .split(',')
        .map(sel => {
          sel = sel.trim();
          if (!sel) return sel;
          
          // Skip :root
          if (sel === ':root') return sel;
          
          // Convert html/body to wrapper
          if (sel === 'html' || sel === 'body') {
            return `.${wrapperClass}`;
          }
          
          // Convert * to wrapper *
          if (sel === '*') {
            return `.${wrapperClass} *`;
          }
          
          // Already scoped?
          if (sel.includes(wrapperClass)) return sel;
          
          // Scope the selector
          return `.${wrapperClass} ${sel}`;
        })
        .join(', ');
      
      return scopedSelectors + '{';
    }
  );
}

/**
 * Read and concatenate CSS files, then scope them
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

  let combinedCSS = cssContents.join('\n\n');
  
  // Scope all CSS selectors with the wrapper class
  combinedCSS = scopeCSSSelectors(combinedCSS, WRAPPER_CLASS);
  
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
 * Modify selectors to work within wrapper
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
      
      // Scope document.querySelector calls to wrapper
      content = content
        .replace(
          /document\.querySelectorAll\(\s*(['"`])([^'"`]+)\1\s*\)/g,
          `document.querySelectorAll($1.${WRAPPER_CLASS} $2$1)`
        )
        .replace(
          /document\.querySelector\(\s*(['"`])([^'"`]+)\1\s*\)/g,
          (match, quote, selector) => {
            // Don't scope if it's already scoped or if it's selecting the wrapper itself
            if (selector.includes(WRAPPER_CLASS) || selector === '.cms-page') {
              return match;
            }
            return `document.querySelector(${quote}.${WRAPPER_CLASS} ${selector}${quote})`;
          }
        );
      
      jsContents.push(`/* === ${file} === */\n${content}`);
    } catch (err) {
      console.warn(`Warning: Could not read ${file}: ${err.message}`);
    }
  }

  // Wrap in IIFE
  const combinedJS = `(function() {
'use strict';
// All DOM queries are scoped to .${WRAPPER_CLASS}

${jsContents.join('\n\n')}
})();`;

  // Minify JS and convert to ES5 (no template literals/backticks)
  const minified = await minifyJs(combinedJS, {
    ecma: 5, // Convert to ES5 - this removes template literals
    compress: {
      drop_console: false,
      passes: 2,
      ecma: 5
    },
    mangle: true,
    format: {
      comments: false,
      ecma: 5
    }
  });

  // Post-process: convert any remaining template literals to string concatenation
  // Terser sometimes doesn't convert complex template literals
  let code = minified.code;
  code = convertTemplateLiteralsToStrings(code);

  return code;
}

/**
 * Convert template literals (backticks) to regular string concatenation
 * This ensures no backticks remain in the output
 * Recursively handles nested template literals
 */
function convertTemplateLiteralsToStrings(code) {
  // Keep converting until no backticks remain
  let maxIterations = 100; // Safety limit
  let iterations = 0;
  
  while (code.includes('`') && iterations < maxIterations) {
    code = convertTemplateLiteralsOnce(code);
    iterations++;
  }
  
  return code;
}

/**
 * Single pass of template literal conversion
 */
function convertTemplateLiteralsOnce(code) {
  let result = '';
  let i = 0;
  
  while (i < code.length) {
    // Check for backtick
    if (code[i] === '`') {
      // Found template literal start
      let templateContent = '';
      i++; // Skip opening backtick
      let parts = [];
      
      while (i < code.length && code[i] !== '`') {
        // Handle escape sequences
        if (code[i] === '\\' && i + 1 < code.length) {
          templateContent += code[i] + code[i + 1];
          i += 2;
          continue;
        }
        
        // Handle ${...} expressions
        if (code[i] === '$' && code[i + 1] === '{') {
          // Add any accumulated string content
          if (templateContent) {
            parts.push('"' + escapeForDoubleQuote(templateContent) + '"');
            templateContent = '';
          }
          
          i += 2; // Skip ${
          
          // Find matching closing brace, accounting for nested braces and strings
          let braceDepth = 1;
          let expr = '';
          let inString = false;
          let stringChar = '';
          
          while (i < code.length && braceDepth > 0) {
            const ch = code[i];
            
            // Track string boundaries (but not backticks - we want to process those)
            if (!inString && (ch === '"' || ch === "'")) {
              inString = true;
              stringChar = ch;
            } else if (inString && ch === stringChar && code[i-1] !== '\\') {
              inString = false;
              stringChar = '';
            }
            
            if (!inString) {
              if (ch === '{') braceDepth++;
              else if (ch === '}') braceDepth--;
            }
            
            if (braceDepth > 0) {
              expr += ch;
            }
            i++;
          }
          
          // Add the expression (it may contain nested backticks - will be processed in next iteration)
          parts.push('(' + expr + ')');
          continue;
        }
        
        templateContent += code[i];
        i++;
      }
      
      // Add remaining string content
      if (templateContent) {
        parts.push('"' + escapeForDoubleQuote(templateContent) + '"');
      }
      
      // Build concatenation
      if (parts.length === 0) {
        result += '""';
      } else if (parts.length === 1) {
        result += parts[0];
      } else {
        result += parts.join('+');
      }
      
      i++; // Skip closing backtick
      continue;
    }
    
    result += code[i];
    i++;
  }
  
  return result;
}

/**
 * Escape a string for use in double quotes
 */
function escapeForDoubleQuote(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Extract INNER content of .cms-page (not including the div itself)
 * This excludes header and footer which are outside .cms-page
 */
function extractCMSInnerContent(html) {
  // Find start marker
  const startMarker = 'CMS PAGE CONTENT START';
  const endMarker = 'CMS PAGE CONTENT END';
  
  const startMarkerIndex = html.indexOf(startMarker);
  const endMarkerIndex = html.indexOf(endMarker);
  
  if (startMarkerIndex === -1 || endMarkerIndex === -1) {
    console.warn('Could not find CMS content markers');
    // Fallback: try to extract inner content of .cms-page
    const match = html.match(/<div class="cms-page"[^>]*>([\s\S]*?)<\/div>\s*<!--\s*={40,}/);
    if (match) {
      return match[1].trim();
    }
    return '';
  }
  
  // Find the opening <div class="cms-page"> after the start marker
  const cmsOpenTagStart = html.indexOf('<div class="cms-page">', startMarkerIndex);
  if (cmsOpenTagStart === -1) {
    console.warn('Could not find cms-page opening tag');
    return '';
  }
  
  // Find the closing tag after the content
  const cmsOpenTagEnd = html.indexOf('>', cmsOpenTagStart) + 1;
  
  // Find the closing </div> before the end marker
  const beforeEndMarker = html.substring(0, endMarkerIndex);
  const lastDivClose = beforeEndMarker.lastIndexOf('</div>');
  
  if (lastDivClose === -1 || lastDivClose < cmsOpenTagEnd) {
    console.warn('Could not find cms-page closing tag');
    return '';
  }
  
  // Extract inner content (between opening and closing tags)
  const innerContent = html.substring(cmsOpenTagEnd, lastDivClose);
  
  return innerContent.trim();
}

/**
 * Build a single page
 */
async function buildPage(pageName, css, js) {
  console.log(`Building ${pageName}...`);

  const htmlPath = path.join(ROOT_DIR, pageName);
  const html = await fs.readFile(htmlPath, 'utf-8');

  // Extract just the inner CMS content (no header/footer)
  const innerContent = extractCMSInnerContent(html);
  
  if (!innerContent) {
    console.error(`  ✗ Could not extract CMS content from ${pageName}`);
    return null;
  }

  // Build the final output with scoped wrapper
  // Encode JS as base64 and use img onload to decode and execute
  // This ensures JS runs even when HTML is injected via innerHTML
  const jsBase64 = Buffer.from(js).toString('base64');
  
  const output = `<!--
  Compass24 Landing Page: ${pageName}
  Built: ${new Date().toISOString()}
  Wrapper class: .${WRAPPER_CLASS}
  
  INJECTION: Simply copy this entire content and inject it via:
  document.querySelector('.cms-page').innerHTML = 'COPIED_CONTENT';
-->
<style>
${css}
</style>

<div class="${WRAPPER_CLASS}">
${innerContent}
</div>

<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="display:none" onload="(new Function(atob('${jsBase64}')))()">`;

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
    removeStyleLinkTypeAttributes: true,
    preserveLineBreaks: false
  });

  // Write HTML output
  const outputPath = path.join(DIST_DIR, pageName);
  await fs.writeFile(outputPath, minified, 'utf-8');

  // Also create a JS injection file for easier use
  // Use JSON.stringify to safely encode content (handles all special chars including backticks)
  const jsonEncodedContent = JSON.stringify(minified);
  
  const jsInjectionContent = `/**
 * Compass24 Landing Page Injector: ${pageName}
 * Built: ${new Date().toISOString()}
 * 
 * USAGE OPTIONS:
 * 
 * 1. Auto-inject on page load:
 *    <script src="${pageName.replace('.html', '.inject.js')}" data-auto-inject></script>
 * 
 * 2. Manual injection:
 *    <script src="${pageName.replace('.html', '.inject.js')}"></script>
 *    <script>injectCompass24LandingPage('.cms-page');</script>
 * 
 * 3. Custom target:
 *    injectCompass24LandingPage('#my-container');
 */
(function() {
  var content = ${jsonEncodedContent};
  
  window.injectCompass24LandingPage = function(selector) {
    selector = selector || '.cms-page';
    var target = document.querySelector(selector);
    if (target) {
      target.innerHTML = content;
      console.log('[Compass24] Landing page injected into', selector);
      return true;
    } else {
      console.error('[Compass24] Target element not found:', selector);
      return false;
    }
  };
  
  // Auto-inject if script has data-auto-inject attribute
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  if (currentScript && currentScript.hasAttribute('data-auto-inject')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        injectCompass24LandingPage();
      });
    } else {
      injectCompass24LandingPage();
    }
  }
})();
`;

  const jsOutputPath = path.join(DIST_DIR, pageName.replace('.html', '.inject.js'));
  await fs.writeFile(jsOutputPath, jsInjectionContent, 'utf-8');

  const stats = await fs.stat(outputPath);
  const jsStats = await fs.stat(jsOutputPath);
  console.log(`  ✓ ${pageName} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(`  ✓ ${pageName.replace('.html', '.inject.js')} (${(jsStats.size / 1024).toFixed(1)} KB)`);

  return outputPath;
}

/**
 * Main build function
 */
async function build() {
  console.log('\n🔨 Building Compass24 Landing Pages...\n');
  console.log(`📦 Scoped wrapper class: .${WRAPPER_CLASS}\n`);

  // Ensure dist directory exists
  await fs.mkdir(DIST_DIR, { recursive: true });

  // Build CSS and JS once (shared across pages)
  console.log('Compiling CSS (scoped to wrapper)...');
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
  console.log('📋 Injection options:');
  console.log('   1. HTML file: Copy content from dist/*.html into CMS');
  console.log('   2. Auto-inject: <script src="*.inject.js" data-auto-inject></script>');
  console.log('   3. Manual: injectCompass24LandingPage(".cms-page");\n');
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
