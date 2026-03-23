/**
 * Git Automation
 * Automatiza commits e pushes para GitHub
 */

import simpleGit from 'simple-git';
import fs from 'fs/promises';
import path from 'path';

/**
 * Inicializa instância do Git
 * @param {string} baseDir - Diretório base do repositório
 * @returns {Object} Instância do simple-git
 */
function initGit(baseDir) {
  return simpleGit(baseDir);
}

/**
 * Verifica se o diretório é um repositório Git
 * @param {Object} git - Instância do simple-git
 * @returns {boolean} True se for repositório Git
 */
async function isGitRepo(git) {
  try {
    await git.status();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Obtém status do repositório
 * @param {Object} git - Instância do simple-git
 * @returns {Object} Status do git
 */
async function getStatus(git) {
  return await git.status();
}

/**
 * Adiciona arquivos ao staging
 * @param {Object} git - Instância do simple-git
 * @param {Array} files - Lista de arquivos para adicionar
 */
async function stageFiles(git, files) {
  console.log('  → Staging arquivos...');

  for (const file of files) {
    try {
      await git.add(file);
      console.log(`    ✓ ${file}`);
    } catch (error) {
      console.error(`    ❌ Erro ao adicionar ${file}:`, error.message);
    }
  }
}

/**
 * Cria commit
 * @param {Object} git - Instância do simple-git
 * @param {string} message - Mensagem do commit
 * @returns {Object} Resultado do commit
 */
async function createCommit(git, message) {
  console.log('  → Criando commit...');

  try {
    const result = await git.commit(message);
    console.log(`    ✓ Commit criado: ${result.commit.substring(0, 7)}`);
    return result;
  } catch (error) {
    throw new Error(`Falha ao criar commit: ${error.message}`);
  }
}

/**
 * Faz push para remote
 * @param {Object} git - Instância do simple-git
 * @param {string} remote - Nome do remote (ex: 'origin')
 * @param {string} branch - Nome da branch
 */
async function pushToRemote(git, remote, branch) {
  console.log(`  → Pushing para ${remote}/${branch}...`);

  try {
    await git.push(remote, branch);
    console.log('    ✓ Push concluído');
  } catch (error) {
    throw new Error(`Falha ao fazer push: ${error.message}`);
  }
}

/**
 * Gera mensagem de commit automática
 * @param {Object} stats - Estatísticas da sincronização
 * @param {string} prefix - Prefixo da mensagem
 * @returns {string} Mensagem de commit
 */
function generateCommitMessage(stats, prefix = '🤖 Auto-sync from Pencil') {
  const timestamp = new Date().toISOString();
  const lines = [prefix];

  if (stats.componentsGenerated > 0) {
    lines.push(`- Gerados ${stats.componentsGenerated} componentes`);
  }

  if (stats.colorsSynced > 0) {
    lines.push(`- Sincronizadas ${stats.colorsSynced} cores`);
  }

  if (stats.fontsSynced > 0) {
    lines.push(`- Sincronizadas ${stats.fontsSynced} fontes`);
  }

  lines.push('');
  lines.push(`Timestamp: ${timestamp}`);
  lines.push('Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>');

  return lines.join('\n');
}

/**
 * Verifica se há mudanças para commitar
 * @param {Object} git - Instância do simple-git
 * @returns {boolean} True se há mudanças
 */
async function hasChanges(git) {
  const status = await getStatus(git);
  return status.files.length > 0;
}

/**
 * Executa auto-commit
 * @param {Object} options - Opções do commit
 * @param {string} options.baseDir - Diretório base
 * @param {Array} options.files - Arquivos para adicionar
 * @param {Object} options.stats - Estatísticas para mensagem
 * @param {string} options.commitPrefix - Prefixo da mensagem
 * @returns {Object} Resultado do commit
 */
export async function autoCommit({ baseDir, files, stats, commitPrefix }) {
  console.log('📤 Iniciando auto-commit...');

  const git = initGit(baseDir);

  // Verificar se é repositório Git
  if (!(await isGitRepo(git))) {
    console.warn('⚠️ Não é um repositório Git. Execute "git init" primeiro.');
    return null;
  }

  try {
    // Verificar se há mudanças
    if (!(await hasChanges(git))) {
      console.log('  ℹ️ Nenhuma mudança para commitar');
      return null;
    }

    // Stage arquivos
    await stageFiles(git, files);

    // Verificar se ainda há mudanças staged
    const status = await getStatus(git);
    if (status.staged.length === 0) {
      console.log('  ℹ️ Nenhum arquivo staged');
      return null;
    }

    // Criar commit
    const message = generateCommitMessage(stats, commitPrefix);
    const result = await createCommit(git, message);

    console.log('✅ Auto-commit concluído!');
    return result;

  } catch (error) {
    console.error('❌ Erro no auto-commit:', error.message);
    throw error;
  }
}

/**
 * Executa auto-push
 * @param {Object} options - Opções do push
 * @param {string} options.baseDir - Diretório base
 * @param {string} options.remote - Nome do remote
 * @param {string} options.branch - Nome da branch
 */
export async function autoPush({ baseDir, remote = 'origin', branch = 'main' }) {
  console.log('📤 Iniciando auto-push...');

  const git = initGit(baseDir);

  try {
    // Verificar se há commits para fazer push
    const status = await getStatus(git);

    if (status.ahead === 0) {
      console.log('  ℹ️ Nenhum commit para fazer push');
      return null;
    }

    // Push para remote
    await pushToRemote(git, remote, branch);

    console.log('✅ Auto-push concluído!');
    return true;

  } catch (error) {
    console.error('❌ Erro no auto-push:', error.message);

    // Se erro de autenticação, dar dica
    if (error.message.includes('Authentication') || error.message.includes('permission')) {
      console.log('');
      console.log('💡 Dica: Configure GITHUB_TOKEN no arquivo .env');
      console.log('   Crie um token em: https://github.com/settings/tokens');
    }

    throw error;
  }
}

/**
 * Executa commit e push (workflow completo)
 * @param {Object} options - Opções completas
 */
export async function commitAndPush(options) {
  try {
    // Commit
    const commitResult = await autoCommit(options);

    if (!commitResult) {
      console.log('ℹ️ Nenhum commit criado, pulando push');
      return null;
    }

    // Push (se habilitado)
    if (options.autoPush) {
      await autoPush({
        baseDir: options.baseDir,
        remote: options.remote,
        branch: options.branch
      });
    } else {
      console.log('ℹ️ Auto-push desabilitado (configure autoPush: true)');
    }

    return commitResult;

  } catch (error) {
    console.error('❌ Erro no workflow Git:', error.message);
    throw error;
  }
}

/**
 * Inicializa repositório Git (se não existir)
 * @param {string} baseDir - Diretório base
 */
export async function initRepository(baseDir) {
  const git = initGit(baseDir);

  if (await isGitRepo(git)) {
    console.log('✓ Repositório Git já existe');
    return true;
  }

  try {
    await git.init();
    console.log('✓ Repositório Git inicializado');

    // Criar .gitignore se não existir
    const gitignorePath = path.join(baseDir, '.gitignore');
    try {
      await fs.access(gitignorePath);
    } catch {
      const gitignoreContent = `# Dependencies
node_modules/

# Environment
.env
.env.local

# Build
dist/
.astro/

# Cache
.pencil/.cache

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
`;
      await fs.writeFile(gitignorePath, gitignoreContent);
      console.log('✓ .gitignore criado');
    }

    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar repositório:', error.message);
    return false;
  }
}
