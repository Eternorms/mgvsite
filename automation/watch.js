/**
 * File Watcher
 * Monitora mudanças no arquivo .pen e notifica quando sincronização é necessária
 */

import chokidar from 'chokidar';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Cores para console
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

/**
 * Log colorido
 */
function log(emoji, message, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${emoji} ${color}${message}${colors.reset}`);
}

/**
 * Carrega configuração
 */
async function loadConfig() {
  const configPath = path.join(PROJECT_ROOT, 'automation.config.json');
  const content = await fs.readFile(configPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Cria arquivo de flag para indicar mudança pendente
 */
async function createSyncFlag() {
  const flagPath = path.join(PROJECT_ROOT, '.pencil', '.sync-pending');
  await fs.writeFile(flagPath, new Date().toISOString(), 'utf-8');
}

/**
 * Remove arquivo de flag
 */
async function removeSyncFlag() {
  const flagPath = path.join(PROJECT_ROOT, '.pencil', '.sync-pending');
  try {
    await fs.unlink(flagPath);
  } catch {
    // Arquivo não existe, ok
  }
}

/**
 * Debounce para evitar múltiplas execuções
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Handler de mudanças no arquivo .pen
 */
async function handlePencilChange(filePath) {
  console.log('');
  log('📝', 'Mudança detectada no Pencil!', colors.cyan);
  log('📁', `Arquivo: ${path.basename(filePath)}`, colors.dim);
  console.log('');

  // Criar flag de sync pendente
  await createSyncFlag();

  // Instruções para o usuário
  console.log(colors.yellow + '┌' + '─'.repeat(58) + '┐' + colors.reset);
  console.log(colors.yellow + '│' + colors.bright + '  ⚡ Sincronização necessária!'.padEnd(58) + colors.yellow + '│' + colors.reset);
  console.log(colors.yellow + '├' + '─'.repeat(58) + '┤' + colors.reset);
  console.log(colors.yellow + '│' + '  Para sincronizar, execute no Claude Code:'.padEnd(58) + '│' + colors.reset);
  console.log(colors.yellow + '│' + colors.reset + '    ' + colors.green + '"Claude, execute a sincronização do Pencil"'.padEnd(54) + colors.yellow + '│' + colors.reset);
  console.log(colors.yellow + '│' + ''.padEnd(58) + '│' + colors.reset);
  console.log(colors.yellow + '│' + '  Ou use o comando:'.padEnd(58) + '│' + colors.reset);
  console.log(colors.yellow + '│' + colors.reset + '    ' + colors.cyan + 'npm run pencil:sync'.padEnd(54) + colors.yellow + '│' + colors.reset);
  console.log(colors.yellow + '└' + '─'.repeat(58) + '┘' + colors.reset);
  console.log('');

  // Emitir som de notificação (se disponível)
  process.stdout.write('\x07');
}

/**
 * Inicia o file watcher
 */
async function startWatcher() {
  console.log('');
  console.log(colors.bright + colors.blue + '╔' + '═'.repeat(58) + '╗' + colors.reset);
  console.log(colors.bright + colors.blue + '║' + '  📡 Pencil File Watcher'.padEnd(59) + '║' + colors.reset);
  console.log(colors.bright + colors.blue + '╚' + '═'.repeat(58) + '╝' + colors.reset);
  console.log('');

  try {
    // Carregar configuração
    const config = await loadConfig();
    const watchPaths = config.watch.paths.map(p => path.join(PROJECT_ROOT, p));
    const debounceMs = config.watch.debounce || 500;

    log('⚙️', 'Carregando configuração...', colors.dim);
    log('📁', `Monitorando: ${config.watch.paths.join(', ')}`, colors.dim);
    log('⏱️', `Debounce: ${debounceMs}ms`, colors.dim);
    console.log('');

    // Verificar se .pen file existe
    const pencilPath = path.join(PROJECT_ROOT, config.pencil.sourceFile);
    try {
      await fs.access(pencilPath);
      log('✓', `Arquivo encontrado: ${config.pencil.sourceFile}`, colors.green);
    } catch {
      log('⚠️', `Arquivo não encontrado: ${config.pencil.sourceFile}`, colors.yellow);
      log('ℹ️', 'O watcher aguardará a criação do arquivo', colors.dim);
    }

    console.log('');
    console.log(colors.green + '✓ File watcher ativo!' + colors.reset);
    console.log(colors.dim + '  Pressione Ctrl+C para parar' + colors.reset);
    console.log('');
    console.log('─'.repeat(60));
    console.log('');

    // Criar watcher com debounce
    const debouncedHandler = debounce(handlePencilChange, debounceMs);

    const watcher = chokidar.watch(watchPaths, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    watcher
      .on('change', (filePath) => {
        debouncedHandler(filePath);
      })
      .on('add', (filePath) => {
        log('➕', `Arquivo criado: ${path.basename(filePath)}`, colors.green);
      })
      .on('error', (error) => {
        log('❌', `Erro no watcher: ${error.message}`, colors.red);
      });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('');
      log('🛑', 'Parando file watcher...', colors.yellow);
      await watcher.close();
      await removeSyncFlag();
      console.log('');
      log('✓', 'File watcher parado', colors.green);
      console.log('');
      process.exit(0);
    });

  } catch (error) {
    console.error('');
    log('❌', `Erro ao iniciar watcher: ${error.message}`, colors.red);
    console.error('');
    process.exit(1);
  }
}

// Iniciar watcher
startWatcher();
