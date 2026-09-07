# Academia Movimento — Base do Front-end

Base em **Next.js + TypeScript** para a plataforma digital da Academia
Movimento. Componentes reutilizáveis, tema claro/escuro com a
identidade da marca, e dashboards para os perfis **Aluno** e **Admin**.

## Como rodar

Pré-requisito: Node.js 18 ou superior.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`. A tela inicial é o Login/Cadastro:
escolha o perfil (Aluno ou Admin) e envie o formulário.

Como ainda não existe autenticação real, o login funciona assim:

- **Login de teste** (pula tudo): perfil Aluno, e-mail
  `teste@academiamovimento.com`, senha `teste123` → entra direto no
  dashboard com um perfil de exemplo já preenchido (peso, altura,
  objetivo, nível, etc).
- **Qualquer outro e-mail/senha**: salva o nome digitado e te leva pro
  onboarding (só na primeira vez) — ali você preenche idade, peso,
  altura, objetivo e nível de experiência. Depois disso o app já te
  chama pelo nome e usa esses dados pra personalizar a ficha de
  musculação e o dashboard. Nas próximas vezes que você "logar" vai
  direto pro dashboard, sem passar pelo onboarding de novo.

Esses dados ficam salvos no `localStorage` do navegador — se limpar o
cache ou trocar de navegador, o onboarding aparece de novo.

Outros comandos úteis:

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # checagem de lint do Next.js
```

## Estrutura de pastas
components/ Componentes reutilizáveis (Button, Input, Card, Header,
Footer, Sidebar, Layout), cada um em sua própria pasta
com o .tsx e o .module.css correspondente.
pages/ Rotas do Next.js (roteamento por arquivo).
index.tsx → Login/Cadastro
aluno/dashboard.tsx → Dashboard do Aluno
aluno/onboarding.tsx → Questionário inicial (dados do aluno)
aluno/musculacao.tsx → Ficha de treino / musculação
aluno/aulas.tsx → Aulas em grupo
aluno/reservas.tsx → Reservas do aluno
admin/dashboard.tsx → Dashboard do Admin
hooks/ Hooks customizados:
- useTheme: tema claro/escuro
- useUsuario: dados do usuário logado (nome, perfil de
aluno), persistidos no localStorage
services/ Camada de dados. Hoje só tem mockData.ts; quando a API
existir, basta trocar o conteúdo das funções mantendo
a mesma assinatura.
utils/ Funções utilitárias puras (formatação, cálculo de IMC,
etc.) e usuarioStore.ts (leitura/escrita no localStorage).
styles/ CSS global e tokens de tema (globals.css).
types/ Tipos e interfaces TypeScript compartilhados.

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

## Perfil do aluno e onboarding

O hook `useUsuario` (em `hooks/useUsuario.tsx`) guarda o usuário
logado num contexto React e sincroniza com o `localStorage` através
de `utils/usuarioStore.ts`. É esse hook que alimenta o nome exibido
no Header e nas saudações, além dos dados coletados no onboarding
(idade, peso, altura, objetivo, nível de experiência, dias de treino
por semana).

O onboarding (`pages/aluno/onboarding.tsx`) é um formulário em 3
etapas que roda logo após o primeiro login/cadastro do aluno. Dá pra
reabrir a qualquer momento pelo item "Meu perfil" no menu lateral,
pra editar os dados depois.

## Ficha de musculação

`pages/aluno/musculacao.tsx` mostra uma divisão de treino em três
fichas (A, B e C), cada uma com seus exercícios, séries, repetições
e carga sugerida. O aluno pode marcar exercícios como concluídos
(fica salvo só durante a sessão, não persiste), acompanhar o
progresso do treino do dia, ver o foco muscular da semana e o
histórico dos últimos treinos. Os dados vêm de
`services/mockData.ts` (funções `obterFichaMusculacao`,
`obterTreinoDoDia`, `obterHistoricoTreinos`, `obterFocoMuscularSemana`).

O card de IMC usa a função `calcularImc` de `utils/formatters.ts`,
calculado a partir do peso e altura preenchidos no onboarding.

## Dados mockados

Tudo que aparece nos dashboards (aulas, reservas, frequência,
indicadores de engajamento, alertas, fichas de treino) vem de
`services/mockData.ts`. Não há chamadas de API nem autenticação real
nesta entrega — o foco é a interface e a estrutura do projeto.

## Próximos passos sugeridos (fora do escopo desta entrega)

- Autenticação real (NextAuth ou API própria).
- Conectar `services/` a endpoints reais.
- Persistir o progresso de treino (exercícios concluídos, histórico)
  em vez de só na sessão atual.
- Testes de componentes (Jest + Testing Library).
- Acessibilidade adicional (testes com leitor de tela).
