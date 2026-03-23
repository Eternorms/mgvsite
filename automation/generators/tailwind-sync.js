/**
 * Tailwind Sync
 * Sincroniza variáveis do Pencil com tailwind.config.mjs
 */

import fs from 'fs/promises';

/**
 * Converte variáveis de cor do Pencil para formato Tailwind
 * @param {Object} colors - Cores do Pencil
 * @returns {Object} Cores no formato Tailwind
 */
function convertColors(colors) {
  const tailwindColors = {};

  for (const [key, value] of Object.entries(colors)) {
    // Converter nome da variável (ex: navy-deep -> navy.deep)
    if (key.includes('-')) {
      const [main, variant] = key.split('-', 2);
      if (!tailwindColors[main]) {
        tailwindColors[main] = {};
      }
      if (variant === main) {
        // Ex: gold-gold -> gold.DEFAULT
        tailwindColors[main].DEFAULT = value;
      } else {
        tailwindColors[main][variant] = value;
      }
    } else {
      // Cor simples
      tailwindColors[key] = value;
    }
  }

  return tailwindColors;
}

/**
 * Converte variáveis de tipografia do Pencil para formato Tailwind
 * @param {Object} typography - Tipografia do Pencil
 * @returns {Object} FontFamily no formato Tailwind
 */
function convertTypography(typography) {
  const fontFamilies = {};

  // Mapear fontes conhecidas
  for (const [key, value] of Object.entries(typography)) {
    if (key.toLowerCase().includes('heading') || value.includes('Libre Baskerville')) {
      fontFamilies.heading = ['Libre Baskerville', 'serif'];
    }
    if (key.toLowerCase().includes('body') || value.includes('Montserrat')) {
      fontFamilies.body = ['Montserrat', 'sans-serif'];
      fontFamilies.accent = ['Montserrat', 'sans-serif'];
    }
  }

  return fontFamilies;
}

/**
 * Converte spacing do Pencil para formato Tailwind
 * @param {Object} spacing - Espaçamentos do Pencil
 * @returns {Object} Spacing no formato Tailwind
 */
function convertSpacing(spacing) {
  const tailwindSpacing = {};

  for (const [key, value] of Object.entries(spacing)) {
    // Remover prefixo 'spacing-' se existir
    const cleanKey = key.replace('spacing-', '');

    // Converter pixel para rem ou usar valor direto
    if (typeof value === 'number') {
      tailwindSpacing[cleanKey] = `${value}px`;
    } else {
      tailwindSpacing[cleanKey] = value;
    }
  }

  return tailwindSpacing;
}

/**
 * Converte borderRadius do Pencil para formato Tailwind
 * @param {Object} borderRadius - Border radius do Pencil
 * @returns {Object} BorderRadius no formato Tailwind
 */
function convertBorderRadius(borderRadius) {
  const tailwindRadius = {};

  for (const [key, value] of Object.entries(borderRadius)) {
    // Remover prefixo 'radius-' se existir
    const cleanKey = key.replace('radius-', '');

    if (typeof value === 'number') {
      tailwindRadius[cleanKey] = `${value}px`;
    } else {
      tailwindRadius[cleanKey] = value;
    }
  }

  return tailwindRadius;
}

/**
 * Lê o arquivo tailwind.config.mjs atual
 * @param {string} configPath - Caminho do arquivo
 * @returns {string} Conteúdo do arquivo
 */
async function readTailwindConfig(configPath) {
  try {
    return await fs.readFile(configPath, 'utf-8');
  } catch (error) {
    throw new Error(`Erro ao ler tailwind.config.mjs: ${error.message}`);
  }
}

/**
 * Atualiza seção de cores no config
 * @param {string} content - Conteúdo atual
 * @param {Object} colors - Novas cores
 * @returns {string} Conteúdo atualizado
 */
function updateColorsSection(content, colors) {
  const colorJson = JSON.stringify(colors, null, 8)
    .replace(/"/g, "'")
    .replace(/\n/g, '\n        ');

  // Encontrar e substituir a seção de cores
  const colorsRegex = /colors:\s*{[^}]*}/gs;

  if (colorsRegex.test(content)) {
    return content.replace(colorsRegex, `colors: ${colorJson}`);
  }

  // Se não existir, adicionar depois de 'extend: {'
  return content.replace(
    /extend:\s*{/,
    `extend: {\n      colors: ${colorJson},`
  );
}

/**
 * Atualiza seção de fontFamily no config
 * @param {string} content - Conteúdo atual
 * @param {Object} fontFamilies - Novas fontes
 * @returns {string} Conteúdo atualizado
 */
function updateFontFamilySection(content, fontFamilies) {
  const fontJson = JSON.stringify(fontFamilies, null, 8)
    .replace(/"/g, "'")
    .replace(/\n/g, '\n        ');

  const fontRegex = /fontFamily:\s*{[^}]*}/gs;

  if (fontRegex.test(content)) {
    return content.replace(fontRegex, `fontFamily: ${fontJson}`);
  }

  return content.replace(
    /colors:\s*{[^}]*},/s,
    `$&\n      fontFamily: ${fontJson},`
  );
}

/**
 * Escreve o arquivo tailwind.config.mjs atualizado
 * @param {string} configPath - Caminho do arquivo
 * @param {string} content - Novo conteúdo
 */
async function writeTailwindConfig(configPath, content) {
  try {
    // Fazer backup do arquivo original
    const backupPath = configPath.replace('.mjs', '.backup.mjs');
    const original = await fs.readFile(configPath, 'utf-8');
    await fs.writeFile(backupPath, original, 'utf-8');

    // Escrever novo conteúdo
    await fs.writeFile(configPath, content, 'utf-8');

    console.log(`  ✓ tailwind.config.mjs atualizado`);
    console.log(`  ✓ Backup salvo em: ${backupPath}`);
  } catch (error) {
    throw new Error(`Erro ao escrever tailwind.config.mjs: ${error.message}`);
  }
}

/**
 * Função principal de sincronização
 * @param {Object} variables - Variáveis extraídas do Pencil
 * @param {string} configPath - Caminho do tailwind.config.mjs
 */
export async function syncTailwindConfig(variables, configPath) {
  console.log('🎨 Sincronizando Tailwind config...');

  try {
    // Ler config atual
    let content = await readTailwindConfig(configPath);

    // Converter variáveis
    const colors = convertColors(variables.colors || {});
    const fontFamilies = convertTypography(variables.typography || {});
    const spacing = convertSpacing(variables.spacing || {});
    const borderRadius = convertBorderRadius(variables.borderRadius || {});

    console.log(`  → ${Object.keys(colors).length} cores para sincronizar`);
    console.log(`  → ${Object.keys(fontFamilies).length} fontes para sincronizar`);

    // Atualizar seções
    content = updateColorsSection(content, colors);
    content = updateFontFamilySection(content, fontFamilies);

    // TODO: Adicionar spacing e borderRadius se necessário

    // Escrever arquivo
    await writeTailwindConfig(configPath, content);

    console.log('✅ Tailwind config sincronizado!');

    return {
      colors: Object.keys(colors).length,
      fontFamilies: Object.keys(fontFamilies).length
    };

  } catch (error) {
    console.error('❌ Erro ao sincronizar Tailwind:', error.message);
    throw error;
  }
}

/**
 * Gera CSS customizado para variáveis não suportadas pelo Tailwind
 * @param {Object} variables - Variáveis do Pencil
 * @param {string} outputPath - Caminho do arquivo CSS
 */
export async function generateCustomCSS(variables, outputPath) {
  const cssVars = [];

  // Gerar variáveis CSS
  cssVars.push(':root {');

  // Cores
  for (const [key, value] of Object.entries(variables.colors || {})) {
    cssVars.push(`  --color-${key}: ${value};`);
  }

  // Spacing
  for (const [key, value] of Object.entries(variables.spacing || {})) {
    cssVars.push(`  --spacing-${key}: ${value}px;`);
  }

  cssVars.push('}');

  const cssContent = `/* Auto-generated CSS variables from Pencil */
/* Generated at: ${new Date().toISOString()} */

${cssVars.join('\n')}
`;

  await fs.writeFile(outputPath, cssContent, 'utf-8');
  console.log(`  ✓ CSS customizado gerado: ${outputPath}`);
}
