# 🏡 MGV Imóveis - Astro + Pencil Automation

Template automatizado para desenvolvimento com Astro e design no Pencil, com sincronização automática e commits no GitHub.

---

## ⚡ Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Copiar .env.example para .env (opcional)
cp .env.example .env

# 3. Iniciar desenvolvimento com automação
npm run auto:start
```

Agora você pode:
- ✅ Editar designs no Pencil (`.pencil/pencil-new.pen`)
- ✅ Salvar (Ctrl+S)
- ✅ File watcher detecta mudanças
- ✅ Pedir ao Claude Code para sincronizar
- ✅ Componentes Astro são gerados automaticamente
- ✅ Tailwind config é sincronizado
- ✅ Commit automático no Git (opcional)

---

## 📋 O Que é Este Projeto?

Este é um **template reutilizável** que automatiza o workflow entre:

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐       ┌──────────┐
│  Pencil     │  -->  │  File        │  -->  │  Astro      │  -->  │  GitHub  │
│  Design     │       │  Watcher     │       │  Generator  │       │  Auto    │
│  (.pen)     │       │  (Detecta)   │       │  (Gera)     │       │  Commit  │
└─────────────┘       └──────────────┘       └─────────────┘       └──────────┘
```

### Benefícios

- 🎨 **Design no Pencil** - Crie componentes visuais
- ⚡ **Sync Automático** - Mudanças geram código Astro
- 🎯 **Type-safe** - Componentes Astro com TypeScript
- 🌈 **Tailwind Sync** - Cores e tipografia sincronizadas
- 📤 **Git Automation** - Commits automáticos (opcional)
- 🔄 **Reusável** - Use em qualquer projeto Astro

---

## 🏗️ Estrutura do Projeto

```
mgv-imoveis/
├── .pencil/                       # 📁 Design source
│   ├── pencil-new.pen            # Arquivo de design (edite aqui!)
│   └── .cache/                   # Cache de extração
│
├── automation/                    # 🤖 Scripts de automação
│   ├── watch.js                  # File watcher principal
│   ├── sync.js                   # Script de sincronização
│   ├── extractors/
│   │   ├── pencil-extractor.js   # Extrai dados do .pen
│   │   └── component-mapper.js   # Mapeia para Tailwind
│   ├── generators/
│   │   ├── astro-generator.js    # Gera componentes Astro
│   │   └── tailwind-sync.js      # Sincroniza Tailwind config
│   └── git-automation.js         # Auto commit + push
│
├── src/                           # Astro project
│   ├── components/               # Componentes manuais
│   ├── generated/                # 🔄 AUTO-GERADOS
│   │   ├── components/           # Componentes do Pencil
│   │   └── styles/               # Estilos extraídos
│   ├── layouts/
│   ├── pages/
│   └── styles/
│
├── public/
│   └── images/
│
├── automation.config.json         # ⚙️ Configuração da automação
├── .env.example                   # Variáveis de ambiente
├── tailwind.config.mjs           # Tailwind config
└── package.json
```

---

## 🚀 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia Astro dev server (porta 3000)
npm run build            # Build do projeto
npm run preview          # Preview da build

# Automação Pencil
npm run pencil:watch     # Inicia file watcher sozinho
npm run auto:start       # Dev server + File watcher (RECOMENDADO)
```

---

## 🎨 Como Usar

### 1. Configurar Pencil

1. Abra o Pencil
2. Crie ou abra `.pencil/pencil-new.pen`
3. Crie componentes reutilizáveis:
   - `Button/Primary`
   - `Card/Property`
   - `Input/Text`
   - etc.

4. Defina variáveis de design:
   - Cores: `navy`, `gold`, `graphite`
   - Tipografia: `font-heading`, `font-body`
   - Espaçamentos: `spacing-sm`, `spacing-md`
   - Border radius: `radius-sm`, `radius-md`

### 2. Iniciar Automação

```bash
npm run auto:start
```

Isso inicia:
- ✅ Astro dev server (localhost:3000)
- ✅ File watcher (monitora .pen)

### 3. Editar e Sincronizar

1. **Edite o design** no Pencil
2. **Salve** (Ctrl+S)
3. **File watcher detecta** mudança
4. **Console mostra notificação**
5. **Fale com Claude Code**: "Claude, sincronize o Pencil"
6. **Automação executa** e gera componentes

### 4. Usar Componentes Gerados

```astro
---
// src/pages/index.astro
import { ButtonPrimary, CardProperty } from '../generated/components';
---

<ButtonPrimary>
  Ver Imóveis
</ButtonPrimary>

<CardProperty>
  <!-- Conteúdo do card -->
</CardProperty>
```

---

## ⚙️ Configuração

### `automation.config.json`

```json
{
  "git": {
    "autoCommit": true,          // Auto-commit habilitado
    "autoPush": false,            // Auto-push desabilitado (segurança)
    "branch": "main"
  },
  "watch": {
    "enabled": true,
    "debounce": 500              // ms
  }
}
```

### `.env` (opcional)

```env
# GitHub Token (apenas se autoPush = true)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

**Como obter GitHub Token:**
1. Acesse https://github.com/settings/tokens
2. Crie novo token (classic)
3. Permissões: `repo` (acesso completo)
4. Copie o token e cole no `.env`

---

## 🔄 Como Funciona

1. **Extração**: Pencil MCP tools leem o `.pen` file
2. **Mapeamento**: Props do Pencil → Classes Tailwind
3. **Geração**: Cria componentes `.astro`
4. **Sincronização**: Atualiza `tailwind.config.mjs`
5. **Git**: Commit automático (opcional)

---

## 🚨 Troubleshooting

### "Arquivo .pen não encontrado"

```bash
mkdir .pencil
# Abrir Pencil e salvar como .pencil/pencil-new.pen
```

### "Git push failed - Authentication"

1. Criar GitHub token: https://github.com/settings/tokens
2. Adicionar ao `.env`: `GITHUB_TOKEN=ghp_...`
3. Ou desabilitar auto-push: `"autoPush": false`

### "Componentes não gerados"

- [ ] Componentes marcados como "reusable" no Pencil?
- [ ] Nome segue padrão: `Tipo/Nome`?
- [ ] Sincronização executada via Claude Code?

---

## 📚 Referências

- **Astro**: https://docs.astro.build
- **Tailwind CSS**: https://tailwindcss.com
- **Pencil**: Ferramenta de design

---

**MGV Imóveis** - Desenvolvido com ❤️ usando Astro, Pencil, Tailwind CSS e Claude Code

**Última atualização**: 2026-03-23 | **Versão**: 1.0.0
