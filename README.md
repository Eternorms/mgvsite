# MGV Imóveis

Site institucional e catálogo de imóveis da MGV Imóveis, construído com Astro, Tailwind CSS e React.

## Stack

- Astro 6
- Tailwind CSS 3 via PostCSS
- React 19
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev
```

O servidor local padrão do Astro usa `http://localhost:3000`. Para escolher outra porta:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

## Verificação

```bash
npm run build
npm audit --audit-level=moderate
```

O build executa `astro check` antes de gerar os arquivos estáticos.

## Estrutura Principal

- `src/pages`: páginas do site, catálogo, blog e páginas legais.
- `src/components`: header, footer, blocos da home e componentes de UI.
- `src/data`: conteúdo estruturado de imóveis, posts e configurações do site.
- `src/styles/global.css`: estilos globais e utilitários Tailwind.

## Conteúdo

Os imóveis ficam em `src/data/properties.ts`.
Os posts do blog ficam em `src/data/blogPosts.ts`.
Dados de contato, regiões, estatísticas e slides ficam em `src/data/siteConfig.ts`.
