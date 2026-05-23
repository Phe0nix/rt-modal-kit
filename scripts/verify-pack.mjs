import { execSync } from 'node:child_process';

const requiredFiles = [
  'dist/rt-modal-kit.js',
  'dist/rt-modal-kit.cjs',
  'dist/index.css',
  'dist/types/index.d.ts',
  'README.md',
  'LICENSE',
];

let packJsonRaw = '';

try {
  packJsonRaw = execSync('npm pack --dry-run --json', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch (error) {
  const stderr = error && typeof error === 'object' && 'stderr' in error
    ? String(error.stderr)
    : '';
  console.error('Failed to run npm pack --dry-run --json');
  if (stderr) console.error(stderr);
  process.exit(1);
}

let packInfo;

try {
  const parsed = JSON.parse(packJsonRaw);
  packInfo = Array.isArray(parsed) ? parsed[0] : parsed;
} catch (error) {
  console.error('Failed to parse npm pack JSON output.');
  process.exit(1);
}

const fileList = Array.isArray(packInfo?.files)
  ? packInfo.files.map((entry) => entry.path)
  : [];

const missing = requiredFiles.filter((file) => !fileList.includes(file));

if (missing.length > 0) {
  console.error('Package verification failed. Missing expected files in npm tarball:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Package verification passed. Required build artifacts are present.');
