/**
 * Astro Generator
 * Gera componentes Astro a partir de dados extraídos do Pencil
 */

import fs from 'fs/promises';
import path from 'path';
import { mapComponentToTailwind, generateComponentName } from '../extractors/component-mapper.js';

/**
 * Gera conteúdo de um componente Astro
 * @param {Object} component - Componente do Pencil normalizado
 * @param {Object} tailwindClasses - Classes Tailwind mapeadas
 * @returns {string} Código do componente Astro
 */
function generateAstroComponent(component, tailwindClasses) {
  const componentName = generateComponentName(component.name);
  const timestamp = new Date().toISOString();

  // Determinar tipo de elemento HTML baseado no tipo do componente
  const elementType = inferElementType(component);

  // Gerar Props interface
  const propsInterface = generatePropsInterface(component, elementType);

  // Gerar código do elemento
  const elementCode = generateElementCode(component, elementType, tailwindClasses);

  return `---
// ${componentName}.astro
// 🤖 Auto-generated from Pencil
// Last sync: ${timestamp}
// Source: ${component.name} (ID: ${component.id})

${propsInterface}

const { ${generatePropsDestructuring(component, elementType)} } = Astro.props;

const baseClasses = '${tailwindClasses.classes}';
---

${elementCode}
`;
}

/**
 * Infere o tipo de elemento HTML baseado no componente
 * @param {Object} component - Componente do Pencil
 * @returns {string} Tipo do elemento ('button', 'div', 'section', etc.)
 */
function inferElementType(component) {
  const name = component.name.toLowerCase();

  if (name.includes('button')) return 'button';
  if (name.includes('input')) return 'input';
  if (name.includes('select')) return 'select';
  if (name.includes('card')) return 'div';
  if (name.includes('header')) return 'header';
  if (name.includes('footer')) return 'footer';
  if (name.includes('section')) return 'section';

  return 'div';
}

/**
 * Gera interface de Props para o componente
 * @param {Object} component - Componente do Pencil
 * @param {string} elementType - Tipo do elemento HTML
 * @returns {string} Código da interface
 */
function generatePropsInterface(component, elementType) {
  const baseProps = [
    'class?: string;'
  ];

  // Props específicas por tipo
  if (elementType === 'button') {
    baseProps.push('href?: string;');
    baseProps.push("type?: 'button' | 'submit' | 'reset';");
    baseProps.push('disabled?: boolean;');
  }

  if (elementType === 'input') {
    baseProps.push("type?: 'text' | 'email' | 'password' | 'number';");
    baseProps.push('placeholder?: string;');
    baseProps.push('value?: string;');
    baseProps.push('disabled?: boolean;');
  }

  return `interface Props {
  ${baseProps.join('\n  ')}
}`;
}

/**
 * Gera código de desestruturação das props
 * @param {Object} component - Componente do Pencil
 * @param {string} elementType - Tipo do elemento HTML
 * @returns {string} Código de desestruturação
 */
function generatePropsDestructuring(component, elementType) {
  const props = ['class: className = \'\''];

  if (elementType === 'button') {
    props.push('href', 'type = \'button\'', 'disabled = false');
  }

  if (elementType === 'input') {
    props.push('type = \'text\'', 'placeholder = \'\'', 'value = \'\'', 'disabled = false');
  }

  return props.join(', ');
}

/**
 * Gera código do elemento HTML/Astro
 * @param {Object} component - Componente do Pencil
 * @param {string} elementType - Tipo do elemento HTML
 * @param {Object} tailwindClasses - Classes Tailwind
 * @returns {string} Código do elemento
 */
function generateElementCode(component, elementType, tailwindClasses) {
  if (elementType === 'button') {
    return `<button
  type={type}
  disabled={disabled}
  class={\`\${baseClasses} \${className}\`}
>
  <slot />
</button>`;
  }

  if (elementType === 'input') {
    return `<input
  type={type}
  placeholder={placeholder}
  value={value}
  disabled={disabled}
  class={\`\${baseClasses} \${className}\`}
/>`;
  }

  // Elemento genérico
  return `<${elementType} class={\`\${baseClasses} \${className}\`}>
  <slot />
</${elementType}>`;
}

/**
 * Salva componente Astro em arquivo
 * @param {string} outputDir - Diretório de saída
 * @param {string} fileName - Nome do arquivo
 * @param {string} content - Conteúdo do componente
 */
async function saveComponent(outputDir, fileName, content) {
  const componentsDir = path.join(outputDir, 'components');
  await fs.mkdir(componentsDir, { recursive: true });

  const filePath = path.join(componentsDir, fileName);
  await fs.writeFile(filePath, content, 'utf-8');

  console.log(`  ✓ ${fileName} criado`);
}

/**
 * Gera index.ts para exportar todos os componentes
 * @param {string} outputDir - Diretório de saída
 * @param {Array} componentNames - Lista de nomes de componentes
 */
async function generateIndex(outputDir, componentNames) {
  const componentsDir = path.join(outputDir, 'components');

  const exports = componentNames
    .map(name => `export { default as ${name} } from './${name}.astro';`)
    .join('\n');

  const indexContent = `// Auto-generated exports
// Generated at: ${new Date().toISOString()}

${exports}
`;

  await fs.writeFile(path.join(componentsDir, 'index.ts'), indexContent, 'utf-8');
  console.log('  ✓ index.ts criado');
}

/**
 * Função principal de geração de componentes
 * @param {Object} extractedData - Dados extraídos do Pencil
 * @param {string} outputDir - Diretório de saída
 */
export async function generateComponents(extractedData, outputDir) {
  console.log('⚙️ Gerando componentes Astro...');

  const { components } = extractedData;

  if (!components || components.length === 0) {
    console.log('  ℹ️ Nenhum componente para gerar');
    return;
  }

  const generatedNames = [];

  for (const component of components) {
    // Pular componentes não reutilizáveis
    if (!component.reusable) {
      console.log(`  ⊘ Pulando ${component.name} (não reutilizável)`);
      continue;
    }

    try {
      // Mapear para Tailwind
      const tailwindClasses = mapComponentToTailwind(component);

      // Gerar nome do arquivo
      const componentName = generateComponentName(component.name);
      const fileName = `${componentName}.astro`;

      // Gerar código
      const code = generateAstroComponent(component, tailwindClasses);

      // Salvar arquivo
      await saveComponent(outputDir, fileName, code);

      generatedNames.push(componentName);

    } catch (error) {
      console.error(`  ❌ Erro ao gerar ${component.name}:`, error.message);
    }
  }

  // Gerar index.ts
  if (generatedNames.length > 0) {
    await generateIndex(outputDir, generatedNames);
  }

  console.log(`✅ ${generatedNames.length} componentes gerados!`);

  return generatedNames;
}

/**
 * Limpa componentes gerados antigos
 * @param {string} outputDir - Diretório de saída
 */
export async function cleanGeneratedComponents(outputDir) {
  const componentsDir = path.join(outputDir, 'components');

  try {
    const files = await fs.readdir(componentsDir);

    for (const file of files) {
      if (file.endsWith('.astro') || file === 'index.ts') {
        await fs.unlink(path.join(componentsDir, file));
      }
    }

    console.log('🧹 Componentes antigos removidos');
  } catch (error) {
    // Diretório não existe ainda, ok
  }
}
