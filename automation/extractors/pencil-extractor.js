/**
 * Pencil Extractor
 * Extrai dados do arquivo .pen usando Pencil MCP tools
 *
 * NOTA: Este script é executado no contexto do Claude Code
 * e tem acesso às ferramentas MCP do Pencil
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Extrai variáveis do Pencil (cores, tipografia, espaçamentos)
 * @param {Function} getPencilVariables - Função que chama mcp__pencil__get_variables
 * @returns {Object} Variáveis organizadas por categoria
 */
export async function extractVariables(getPencilVariables) {
  const variables = await getPencilVariables();

  const organized = {
    colors: {},
    typography: {},
    spacing: {},
    borderRadius: {},
    other: {}
  };

  // Organizar variáveis por categoria
  for (const [key, value] of Object.entries(variables)) {
    // Cores (começam com # ou são nomes de cor)
    if (typeof value === 'string' && value.startsWith('#')) {
      organized.colors[key] = value;
    }
    // Fontes
    else if (key.includes('font') || key.includes('Font')) {
      organized.typography[key] = value;
    }
    // Espaçamentos (números)
    else if (key.includes('spacing') || key.includes('space')) {
      organized.spacing[key] = value;
    }
    // Border radius
    else if (key.includes('radius') || key.includes('Radius')) {
      organized.borderRadius[key] = value;
    }
    // Outros
    else {
      organized.other[key] = value;
    }
  }

  return organized;
}

/**
 * Extrai componentes reutilizáveis do Pencil
 * @param {Function} batchGet - Função que chama mcp__pencil__batch_get
 * @returns {Array} Lista de componentes extraídos
 */
export async function extractComponents(batchGet) {
  // Buscar todos os componentes reutilizáveis
  // Padrões comuns: Button/, Card/, Input/, Header/, Footer/, etc.
  const patterns = [
    'Button/*',
    'Card/*',
    'Input/*',
    'Select/*',
    'Header/*',
    'Footer/*',
    'Toast/*',
    'Skeleton/*',
    'Logo/*'
  ];

  const components = [];

  for (const pattern of patterns) {
    try {
      const results = await batchGet({ patterns: [pattern] });
      if (results && results.length > 0) {
        components.push(...results);
      }
    } catch (error) {
      console.warn(`⚠️ Nenhum componente encontrado para padrão: ${pattern}`);
    }
  }

  return components;
}

/**
 * Normaliza dados do componente Pencil para formato padrão
 * @param {Object} component - Componente raw do Pencil
 * @returns {Object} Componente normalizado
 */
export function normalizeComponent(component) {
  return {
    id: component.id,
    name: component.name || 'Unnamed',
    type: component.type || 'frame',
    reusable: component.reusable || false,
    props: {
      layout: component.layout,
      gap: component.gap,
      padding: component.padding,
      fill: component.fill,
      cornerRadius: component.cornerRadius,
      width: component.width,
      height: component.height,
      ...component.props
    },
    children: component.children || []
  };
}

/**
 * Salva dados extraídos em cache
 * @param {string} cacheDir - Diretório de cache
 * @param {Object} data - Dados a serem salvos
 */
export async function saveToCache(cacheDir, data) {
  try {
    await fs.mkdir(cacheDir, { recursive: true });

    const timestamp = new Date().toISOString();
    const cacheFile = path.join(cacheDir, 'extracted-data.json');

    const cacheData = {
      timestamp,
      data
    };

    await fs.writeFile(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`💾 Cache salvo em: ${cacheFile}`);
  } catch (error) {
    console.error('❌ Erro ao salvar cache:', error.message);
  }
}

/**
 * Carrega dados do cache
 * @param {string} cacheDir - Diretório de cache
 * @returns {Object|null} Dados do cache ou null se não existir
 */
export async function loadFromCache(cacheDir) {
  try {
    const cacheFile = path.join(cacheDir, 'extracted-data.json');
    const content = await fs.readFile(cacheFile, 'utf-8');
    const cacheData = JSON.parse(content);

    console.log(`📦 Cache carregado: ${cacheData.timestamp}`);
    return cacheData.data;
  } catch (error) {
    console.log('ℹ️ Nenhum cache encontrado');
    return null;
  }
}

/**
 * Função principal de extração
 * @param {Object} options - Opções de extração
 * @param {Function} options.getPencilVariables - Função MCP get_variables
 * @param {Function} options.batchGet - Função MCP batch_get
 * @param {string} options.cacheDir - Diretório de cache
 * @returns {Object} Dados extraídos { variables, components }
 */
export async function extract({ getPencilVariables, batchGet, cacheDir }) {
  console.log('🔍 Extraindo dados do Pencil...');

  try {
    // Extrair variáveis
    console.log('  → Extraindo variáveis...');
    const variables = await extractVariables(getPencilVariables);
    console.log(`  ✓ ${Object.keys(variables.colors).length} cores encontradas`);
    console.log(`  ✓ ${Object.keys(variables.typography).length} fontes encontradas`);

    // Extrair componentes
    console.log('  → Extraindo componentes...');
    const rawComponents = await extractComponents(batchGet);
    const components = rawComponents.map(normalizeComponent);
    console.log(`  ✓ ${components.length} componentes encontrados`);

    const extractedData = {
      variables,
      components,
      metadata: {
        extractedAt: new Date().toISOString(),
        componentCount: components.length,
        variableCount: Object.keys(variables.colors).length +
                       Object.keys(variables.typography).length +
                       Object.keys(variables.spacing).length
      }
    };

    // Salvar em cache
    if (cacheDir) {
      await saveToCache(cacheDir, extractedData);
    }

    console.log('✅ Extração concluída!');
    return extractedData;

  } catch (error) {
    console.error('❌ Erro durante extração:', error.message);
    throw error;
  }
}
