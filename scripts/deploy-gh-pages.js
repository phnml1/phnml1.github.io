const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');
const cacheRoot = path.join(root, 'node_modules', '.cache', 'gh-pages');
const cacheDir = path.join(cacheRoot, 'https!github.com!phnml1!phnml1.github.io.git');
const branch = 'gh-pages';
const remote = 'origin';

function run(command, args, options = {}) {
  const result = childProcess.spawnSync(command, args, {
    cwd: options.cwd || root,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function output(command, args, options = {}) {
  const result = childProcess.spawnSync(command, args, {
    cwd: options.cwd || root,
    encoding: 'utf8',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }

  return result.stdout.trim();
}

function isGitRepo(dir) {
  return fs.existsSync(path.join(dir, '.git'));
}

function ensureClone(repoUrl) {
  fs.mkdirSync(cacheRoot, { recursive: true });

  if (!isGitRepo(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    run('git', [
      'clone',
      repoUrl,
      cacheDir,
      '--branch',
      branch,
      '--single-branch',
      '--origin',
      remote,
      '--depth',
      '1',
    ]);
  }
}

function clearPublishedFiles() {
  for (const entry of fs.readdirSync(cacheDir)) {
    if (entry === '.git') {
      continue;
    }

    fs.rmSync(path.join(cacheDir, entry), { recursive: true, force: true });
  }
}

if (!fs.existsSync(outDir)) {
  console.error('Missing out directory. Run the build before deploying.');
  process.exit(1);
}

fs.closeSync(fs.openSync(path.join(outDir, '.nojekyll'), 'a'));

const repoUrl = output('git', ['config', '--get', `remote.${remote}.url`]);
ensureClone(repoUrl);

run('git', ['fetch', remote], { cwd: cacheDir });
run('git', ['checkout', branch], { cwd: cacheDir });
run('git', ['reset', '--hard', `${remote}/${branch}`], { cwd: cacheDir });
run('git', ['clean', '-fdx'], { cwd: cacheDir });

clearPublishedFiles();
fs.cpSync(outDir, cacheDir, { recursive: true });

run('git', ['add', '-A'], { cwd: cacheDir });

const hasChanges = childProcess.spawnSync('git', ['diff', '--cached', '--quiet'], {
  cwd: cacheDir,
  shell: false,
});

if (hasChanges.status === 0) {
  console.log('No deploy changes to publish.');
  process.exit(0);
}

run('git', ['commit', '-m', 'Updates'], { cwd: cacheDir });
run('git', ['push', remote, branch], { cwd: cacheDir });
