/**
 * Component Mapper
 * Mapeia propriedades do Pencil para classes Tailwind CSS
 */

/**
 * Converte padding do Pencil para classes Tailwind
 * @param {Array|number} padding - [top, right, bottom, left] ou [vertical, horizontal] ou número único
 * @returns {string} Classes Tailwind
 */
export function mapPadding(padding) {
  if (!padding) return '';

  if (typeof padding === 'number') {
    // Padding uniforme
    return `p-${pxToTailwindSpacing(padding)}`;
  }

  if (Array.isArray(padding)) {
    if (padding.length === 2) {
      // [vertical, horizontal]
      const [v, h] = padding;
      return `py-${pxToTailwindSpacing(v)} px-${pxToTailwindSpacing(h)}`;
    }
    if (padding.length === 4) {
      // [top, right, bottom, left]
      const [t, r, b, l] = padding;
      if (t === b && r === l) {
        return `py-${pxToTailwindSpacing(t)} px-${pxToTailwindSpacing(r)}`;
      }
      // Padding individual
      return `pt-${pxToTailwindSpacing(t)} pr-${pxToTailwindSpacing(r)} pb-${pxToTailwindSpacing(b)} pl-${pxToTailwindSpacing(l)}`;
    }
  }

  return '';
}

/**
 * Converte gap do Pencil para classe Tailwind
 * @param {number} gap - Gap em pixels
 * @returns {string} Classe Tailwind
 */
export function mapGap(gap) {
  if (!gap) return '';
  return `gap-${pxToTailwindSpacing(gap)}`;
}

/**
 * Converte layout do Pencil para classes Tailwind
 * @param {string} layout - 'horizontal', 'vertical', 'grid', etc.
 * @returns {string} Classes Tailwind
 */
export function mapLayout(layout) {
  const layoutMap = {
    'horizontal': 'flex flex-row',
    'vertical': 'flex flex-col',
    'grid': 'grid',
    'stack': 'relative'
  };

  return layoutMap[layout] || '';
}

/**
 * Converte fill (background) do Pencil para classe Tailwind
 * @param {string} fill - Cor (hex ou variável como '$gold')
 * @returns {string} Classe Tailwind
 */
export function mapFill(fill) {
  if (!fill) return '';

  // Se é variável ($nome)
  if (fill.startsWith('$')) {
    const colorName = fill.substring(1);
    return `bg-${colorName}`;
  }

  // Se é hex, não podemos mapear diretamente (precisa estar no Tailwind config)
  // Retorna a variável esperada
  return 'bg-gray-100';
}

/**
 * Converte cornerRadius do Pencil para classe Tailwind
 * @param {string|number} cornerRadius - Raio ou variável como '$radius-sm'
 * @returns {string} Classe Tailwind
 */
export function mapCornerRadius(cornerRadius) {
  if (!cornerRadius) return '';

  // Se é variável ($radius-sm)
  if (typeof cornerRadius === 'string' && cornerRadius.startsWith('$radius-')) {
    const size = cornerRadius.replace('$radius-', '');
    return `rounded-${size}`;
  }

  // Se é número
  if (typeof cornerRadius === 'number') {
    if (cornerRadius <= 4) return 'rounded-sm';
    if (cornerRadius <= 8) return 'rounded-md';
    if (cornerRadius <= 12) return 'rounded-lg';
    return 'rounded-xl';
  }

  return '';
}

/**
 * Converte fontSize do Pencil para classe Tailwind
 * @param {string|number} fontSize - Tamanho ou variável como '$font-size-body'
 * @returns {string} Classe Tailwind
 */
export function mapFontSize(fontSize) {
  if (!fontSize) return '';

  // Se é variável ($font-size-body-sm)
  if (typeof fontSize === 'string' && fontSize.startsWith('$font-size-')) {
    const sizeKey = fontSize.replace('$font-size-', '');

    const sizeMap = {
      'display': 'text-display',
      'h1': 'text-h1',
      'h2': 'text-h2',
      'h3': 'text-h3',
      'h4': 'text-h4',
      'body-lg': 'text-body-lg',
      'body': 'text-body',
      'body-sm': 'text-body-sm',
      'caption': 'text-caption'
    };

    return sizeMap[sizeKey] || 'text-base';
  }

  // Se é número (px)
  if (typeof fontSize === 'number') {
    if (fontSize <= 12) return 'text-xs';
    if (fontSize <= 14) return 'text-sm';
    if (fontSize <= 16) return 'text-base';
    if (fontSize <= 18) return 'text-lg';
    if (fontSize <= 20) return 'text-xl';
    return 'text-2xl';
  }

  return '';
}

/**
 * Converte fontWeight do Pencil para classe Tailwind
 * @param {string|number} fontWeight - Peso da fonte
 * @returns {string} Classe Tailwind
 */
export function mapFontWeight(fontWeight) {
  if (!fontWeight) return '';

  const weightMap = {
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-extrabold',
    '900': 'font-black'
  };

  return weightMap[String(fontWeight)] || '';
}

/**
 * Converte fontFamily do Pencil para classe Tailwind
 * @param {string} fontFamily - Nome da fonte
 * @returns {string} Classe Tailwind
 */
export function mapFontFamily(fontFamily) {
  if (!fontFamily) return '';

  if (fontFamily.includes('Libre Baskerville')) return 'font-heading';
  if (fontFamily.includes('Montserrat')) return 'font-body';

  return '';
}

/**
 * Converte cor de texto do Pencil para classe Tailwind
 * @param {string} fill - Cor do texto
 * @returns {string} Classe Tailwind
 */
export function mapTextColor(fill) {
  if (!fill) return '';

  // Se é variável ($nome)
  if (fill.startsWith('$')) {
    const colorName = fill.substring(1);
    return `text-${colorName}`;
  }

  return 'text-gray-900';
}

/**
 * Converte pixels para escala de spacing do Tailwind
 * @param {number} px - Valor em pixels
 * @returns {number} Valor da escala Tailwind
 */
function pxToTailwindSpacing(px) {
  // Tailwind usa múltiplos de 4px (1 = 4px, 2 = 8px, etc.)
  const spacing = Math.round(px / 4);
  return Math.max(0, spacing);
}

/**
 * Mapeia todas as propriedades de um componente
 * @param {Object} component - Componente do Pencil
 * @returns {Object} Classes Tailwind organizadas
 */
export function mapComponentToTailwind(component) {
  const classes = {
    layout: '',
    spacing: '',
    background: '',
    border: '',
    text: '',
    size: ''
  };

  // Layout
  if (component.props.layout) {
    classes.layout = mapLayout(component.props.layout);
  }

  // Spacing (padding + gap)
  if (component.props.padding) {
    classes.spacing += ' ' + mapPadding(component.props.padding);
  }
  if (component.props.gap) {
    classes.spacing += ' ' + mapGap(component.props.gap);
  }

  // Background
  if (component.props.fill && component.type !== 'text') {
    classes.background = mapFill(component.props.fill);
  }

  // Border radius
  if (component.props.cornerRadius) {
    classes.border = mapCornerRadius(component.props.cornerRadius);
  }

  // Text properties (se for texto)
  if (component.type === 'text' && component.props.fill) {
    classes.text += ' ' + mapTextColor(component.props.fill);
  }
  if (component.props.fontSize) {
    classes.text += ' ' + mapFontSize(component.props.fontSize);
  }
  if (component.props.fontWeight) {
    classes.text += ' ' + mapFontWeight(component.props.fontWeight);
  }
  if (component.props.fontFamily) {
    classes.text += ' ' + mapFontFamily(component.props.fontFamily);
  }

  // Combinar tudo
  const allClasses = Object.values(classes)
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' '); // Remove espaços duplos

  return {
    classes: allClasses,
    breakdown: classes
  };
}

/**
 * Gera nome de componente Astro a partir do nome Pencil
 * @param {string} pencilName - Nome no Pencil (ex: 'Button/Primary')
 * @returns {string} Nome do componente Astro (ex: 'ButtonPrimary')
 */
export function generateComponentName(pencilName) {
  // Remove caracteres especiais e converte para PascalCase
  return pencilName
    .split('/')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}
