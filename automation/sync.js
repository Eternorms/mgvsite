/**
 * Sync Script
 * Orquestra o workflow completo: Pencil → Astro → Git
 *
 * NOTA: Este script precisa ser executado via Claude Code
 * pois depende das ferramentas MCP do Pencil
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { extract } from './extractors/pencil-extractor.js';
import { generateComponents, cleanGeneratedComponents } from './generators/astro-generator.js';
import { syncTailwindConfig } from './generators/tailwind-sync.js';
import { commitAndPush } from './git-automation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Carrega configuração
 * @returns {Object} Configuração
 */
async function loadConfig() {
  const configPath = path.join(PROJECT_ROOT, 'automation.config.json');
  const content = await fs.readFile(configPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Função principal de sincronização
 *
 * Esta função deve ser chamada PELO Claude Code, que fornecerá
 * as funções MCP necessárias para acessar o Pencil
 *
 * @param {Object} pencilMCP - Funções MCP do Pencil
 * @param {Function} pencilMCP.getVariables - mcp__pencil__get_variables
 * @param {Function} pencilMCP.batchGet - mcp__pencil__batch_get
 */
export async function sync(pencilMCP) {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🚀 Pencil → Astro → GitHub Automation   ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');

  const startTime = Date.now();

  try {
    // 1. Carregar configuração
    console.log('⚙️ Carregando configuração...');
    const config = await loadConfig();
    console.log('  ✓ Configuração carregada');
    console.log('');

    // 2. Extrair dados do Pencil
    console.log('📦 FASE 1: Extração do Pencil');
    console.log('─'.repeat(50));

    const extractedData = await extract({
      getPencilVariables: pencilMCP.getVariables,
      batchGet: pencilMCP.batchGet,
      cacheDir: path.join(PROJECT_ROOT, config.pencil.cacheDir)
    });

    console.log('');

    // 3. Limpar componentes antigos
    console.log('🧹 FASE 2: Limpeza');
    console.log('─'.repeat(50));

    await cleanGeneratedComponents(
      path.join(PROJECT_ROOT, config.astro.outputDir)
    );

    console.log('');

    // 4. Gerar componentes Astro
    console.log('⚙️ FASE 3: Geração de Componentes');
    console.log('─'.repeat(50));

    const generatedComponents = await generateComponents(
      extractedData,
      path.join(PROJECT_ROOT, config.astro.outputDir)
    );

    console.log('');

    // 5. Sincronizar Tailwind
    console.log('🎨 FASE 4: Sincronização Tailwind');
    console.log('─'.repeat(50));

    const tailwindStats = await syncTailwindConfig(
      extractedData.variables,
      path.join(PROJECT_ROOT, config.tailwind.configPath)
    );

    console.log('');

    // 6. Git automation
    if (config.git.autoCommit) {
      console.log('📤 FASE 5: Git Automation');
      console.log('─'.repeat(50));

      const files = [
        config.astro.outputDir + '/',
        config.tailwind.configPath
      ];

      const stats = {
        componentsGenerated: generatedComponents.length,
        colorsSynced: tailwindStats.colors,
        fontsSynced: tailwindStats.fontFamilies
      };

      await commitAndPush({
        baseDir: PROJECT_ROOT,
        files,
        stats,
        commitPrefix: config.git.commitPrefix,
        autoPush: config.git.autoPush,
        remote: config.git.remote,
        branch: config.git.branch
      });

      console.log('');
    } else {
      console.log('ℹ️ Auto-commit desabilitado (configure autoCommit: true)');
      console.log('');
    }

    // Resumo final
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('╔════════════════════════════════════════════╗');
    console.log('║              ✅ SINCRONIZAÇÃO COMPLETA     ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
    console.log('📊 Resumo:');
    console.log(`  • ${generatedComponents.length} componentes gerados`);
    console.log(`  • ${tailwindStats.colors} cores sincronizadas`);
    console.log(`  • ${tailwindStats.fontFamilies} fontes sincronizadas`);
    console.log(`  • Tempo: ${duration}s`);
    console.log('');

    return {
      success: true,
      stats: {
        components: generatedComponents.length,
        colors: tailwindStats.colors,
        fonts: tailwindStats.fontFamilies,
        duration: duration
      }
    };

  } catch (error) {
    console.error('');
    console.error('╔════════════════════════════════════════════╗');
    console.error('║              ❌ ERRO NA SINCRONIZAÇÃO      ║');
    console.error('╚════════════════════════════════════════════╝');
    console.error('');
    console.error('Detalhes:', error.message);
    console.error('');

    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Wrapper para execução standalone (quando chamado diretamente)
 *
 * NOTA: Não funcionará corretamente porque não tem acesso às ferramentas MCP
 * Este script deve ser executado via Claude Code
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('⚠️ Este script deve ser executado via Claude Code');
  console.log('   Use: "Claude, execute a sincronização do Pencil"');
  console.log('');
  console.log('   Ou configure o file watcher para automação contínua');
  process.exit(1);
}
