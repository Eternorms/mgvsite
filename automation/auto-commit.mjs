/**
 * Auto-commit script for MGV Imóveis
 * - Monitors .pen files for changes
 * - Auto-commits every 1 hour (or on significant changes)
 * - Runs in background
 */

import { exec } from 'child_process';
import { watch, statSync, existsSync } from 'fs';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  commitInterval: 60 * 60 * 1000, // 1 hour in ms
  watchPaths: ['.pencil'],
  watchExtensions: ['.pen'],
  projectRoot: process.cwd(),
};

let lastCommitTime = Date.now();
let pendingChanges = false;

// Colors for console
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

async function runGitCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: CONFIG.projectRoot });
    return { success: true, output: stdout.trim(), error: stderr };
  } catch (error) {
    return { success: false, output: '', error: error.message };
  }
}

async function hasUncommittedChanges() {
  const result = await runGitCommand('git status --porcelain');
  return result.success && result.output.length > 0;
}

async function autoCommit() {
  const hasChanges = await hasUncommittedChanges();

  if (!hasChanges) {
    log('Sem alterações para commit', 'blue');
    return false;
  }

  log('Detectadas alterações, iniciando auto-commit...', 'yellow');

  // Stage all changes
  const addResult = await runGitCommand('git add -A');
  if (!addResult.success) {
    log(`Erro ao adicionar arquivos: ${addResult.error}`, 'red');
    return false;
  }

  // Create commit with timestamp
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR');
  const timeStr = now.toLocaleTimeString('pt-BR');
  const commitMessage = `🔄 Auto-save: ${dateStr} ${timeStr}

Commit automático do design system e código.

Co-Authored-By: Auto-Commit Bot <bot@mgvimoveis.com>`;

  const commitResult = await runGitCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

  if (commitResult.success) {
    log(`✅ Commit realizado com sucesso!`, 'green');
    lastCommitTime = Date.now();
    pendingChanges = false;
    return true;
  } else {
    log(`Erro no commit: ${commitResult.error}`, 'red');
    return false;
  }
}

function startFileWatcher() {
  CONFIG.watchPaths.forEach(watchPath => {
    if (!existsSync(watchPath)) {
      log(`Path não encontrado: ${watchPath}`, 'yellow');
      return;
    }

    watch(watchPath, { recursive: true }, (eventType, filename) => {
      if (filename && CONFIG.watchExtensions.some(ext => filename.endsWith(ext))) {
        log(`Alteração detectada: ${filename}`, 'blue');
        pendingChanges = true;
      }
    });

    log(`👁️ Monitorando: ${watchPath}`, 'green');
  });
}

function startAutoCommitTimer() {
  log(`⏰ Auto-commit configurado para cada ${CONFIG.commitInterval / 1000 / 60} minutos`, 'green');

  setInterval(async () => {
    const timeSinceLastCommit = Date.now() - lastCommitTime;

    if (timeSinceLastCommit >= CONFIG.commitInterval) {
      log('⏰ Intervalo de 1 hora atingido', 'yellow');
      await autoCommit();
    }
  }, 60 * 1000); // Check every minute
}

async function init() {
  console.log('\n');
  log('🚀 MGV Auto-Commit iniciado', 'green');
  log('=' .repeat(50), 'blue');

  // Check if git repo exists
  const gitCheck = await runGitCommand('git status');
  if (!gitCheck.success) {
    log('❌ Este diretório não é um repositório Git!', 'red');
    log('Execute: git init', 'yellow');
    process.exit(1);
  }

  // Start watchers and timers
  startFileWatcher();
  startAutoCommitTimer();

  // Initial commit check
  log('Verificando alterações pendentes...', 'blue');
  await autoCommit();

  log('=' .repeat(50), 'blue');
  log('Pressione Ctrl+C para parar', 'yellow');
  console.log('\n');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n👋 Auto-commit encerrado', 'yellow');
  process.exit(0);
});

// Start
init();
