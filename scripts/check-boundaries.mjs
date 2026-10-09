import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function walk(dir, visit) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.name === 'node_modules' ||
      entry.name === '.angular' ||
      fullPath === path.join(root, 'functions', 'lib')
    ) {
      continue;
    }
    if (entry.isDirectory()) {
      walk(fullPath, visit);
    } else {
      visit(fullPath);
    }
  }
}

walk(path.join(root, 'apps/web'), (file) => {
  if (!/\.(ts|html|scss|css|json)$/.test(file)) {
    return;
  }
  const text = fs.readFileSync(file, 'utf8');
  for (const token of ['@ionic/', '@capacitor/']) {
    if (text.includes(token)) {
      errors.push(`${path.relative(root, file)} contains ${token}`);
    }
  }
});

walk(path.join(root, 'functions/src'), (file) => {
  if (!/\.(ts|js|mjs)$/.test(file)) {
    return;
  }
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('@app/frontend') || text.includes('shared/frontend')) {
    errors.push(`${path.relative(root, file)} imports shared frontend code`);
  }
});

const angular = JSON.parse(fs.readFileSync(path.join(root, 'angular.json'), 'utf8'));
const webOutput = angular.projects.web.architect.build.options.outputPath;
const mobileOutput = angular.projects.mobile.architect.build.options.outputPath;

if (webOutput?.base !== 'dist/apps/web' || webOutput?.browser !== 'browser') {
  errors.push('web build must output to dist/apps/web/browser');
}
if (mobileOutput?.base !== 'www' || mobileOutput?.browser !== '') {
  errors.push('mobile build must output to www/');
}

for (const style of angular.projects.web.architect.build.options.styles ?? []) {
  const value = String(style);
  if (value.includes('ionic') || value.includes('capacitor')) {
    errors.push(`web styles include ${value}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('boundaries ok');
