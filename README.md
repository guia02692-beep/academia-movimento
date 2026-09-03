# Academia Movimento — Base do Front-end

Base inicial em **Next.js + TypeScript** para a plataforma digital da
Academia Movimento. Estrutura organizada, componentes reutilizáveis,
tema claro/escuro com a identidade da marca e dashboards mockados
para os perfis **Aluno** e **Admin**.

## Como rodar

Pré-requisito: Node.js 18 ou superior.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`. A tela inicial é o Login/Cadastro:
escolha o perfil (Aluno ou Admin) e envie o formulário — como não há
autenticação real nesta entrega, o envio apenas te leva ao dashboard
correspondente.

Outros comandos úteis:

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # checagem de lint do Next.js
```

## Estrutura de pastas

```
components/   Componentes reutilizáveis (Button, Input, Card, Header,
              Footer, Sidebar, Layout), cada um em sua própria pasta
              com o .tsx e o .module.css correspondente.
pages/        Rotas do Next.js (roteamento por arquivo).
  index.tsx           → Login/Cadastro
  aluno/dashboard.tsx → Dashboard do Aluno
  admin/dashboard.tsx → Dashboard do Admin
hooks/        Hooks customizados (useTheme, com o ThemeProvider).
services/     Camada de dados. Hoje só tem mockData.ts; quando a API
              existir, basta trocar o conteúdo das funções mantendo
              a mesma assinatura.
utils/        Funções utilitárias puras (formatação, etc.).
styles/       CSS global e tokens de tema (globals.css).
types/        Tipos e interfaces TypeScript compartilhados.
```

## Sistema de tema

As cores da marca ficam definidas como variáveis CSS em
`styles/globals.css`:

| Token             | Cor       |
|-------------------|-----------|
| `--cor-preto`      | `#171512` |
| `--cor-laranja`    | `#FF6A00` |
| `--cor-cinza-claro`| `#F4F3F1` |
| `--cor-cinza-medio`| `#8C8880` |

O tema claro/escuro é controlado pelo atributo `data-tema` na tag
`<html>` e pelo hook `useTheme()` (em `hooks/useTheme.tsx`), que
persiste a escolha no `localStorage` e respeita a preferência do
sistema operacional no primeiro acesso. O botão de alternância fica
no `Header`.

## Tipografia

Montserrat (títulos) e Open Sans (textos) são carregadas via Google
Fonts em `pages/_document.tsx`, e aplicadas globalmente através das
variáveis `--fonte-titulo` e `--fonte-texto`.

## Estilização

Cada componente usa **CSS Modules** (`Nome.module.css`), escolhido
por já vir pronto no Next.js — sem dependências extras, com escopo
local automático e boa leitura para quem está aprendendo.

## Dados mockados

Tudo que aparece nos dashboards (aulas, reservas, frequência,
indicadores de engajamento, alertas) vem de `services/mockData.ts`.
Não há chamadas de API nem autenticação real nesta entrega — o foco
é a interface e a estrutura do projeto.

## Próximos passos sugeridos (fora do escopo desta entrega)

- Autenticação real (NextAuth ou API própria).
- Conectar `services/` a endpoints reais.
- Testes de componentes (Jest + Testing Library).
- Acessibilidade adicional (testes com leitor de tela).
