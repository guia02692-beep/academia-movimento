# Academia Movimento

Projeto de interface para a plataforma digital da Academia Movimento, desenvolvido com Next.js e TypeScript.

A aplicação possui áreas para alunos e administração, tema claro/escuro, onboarding de treino, perfil do aluno, aulas, reservas e acompanhamento de musculação.

## Tecnologias

- Next.js 14
- React 18
- TypeScript
- CSS Modules
- LocalStorage para persistência local temporária

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

## Acesso

A tela inicial possui somente o acesso de aluno. Qualquer e-mail e senha informados direcionam a pessoa para o onboarding, onde ela completa ou revisa seus dados antes de acessar o painel.

Enquanto o backend não existe, há uma credencial fixa para testar a área administrativa:

```text
E-mail: admin@academiamovimento.com
Senha: admin123
```

Essa opção não aparece na interface de login.

> Importante: este acesso é apenas temporário para a fase de interface. A autenticação real deve ser implementada no backend.

## Funcionalidades

### Área do aluno

- Dashboard com visão geral da rotina.
- Onboarding em três etapas para personalização do treino.
- Tela “Meu perfil” para consultar dados pessoais e decidir se deseja editá-los.
- Cadastro e edição de nome, e-mail, celular, endereço, altura, peso, objetivo, perfil de treino, frequência semanal e restrições.
- Página de musculação com fichas A, B e C.
- Personalização de exercícios, séries, repetições, carga e descanso.
- Checklist para acompanhar os exercícios concluídos durante o treino.
- Registro de séries, repetições, carga e RPE.
- Cronômetro de descanso.
- Calendário semanal de treino:
  - Verde: treino concluído.
  - Cinza: dia de descanso.
  - Vermelho: treino previsto que não foi realizado.
- Aulas em grupo e reservas.

### Área administrativa

- Dashboard de visão geral.
- Lista de alunos.
- Alertas administrativos.

### Interface

- Tema claro e escuro.
- Layout responsivo.
- Componentes reutilizáveis.
- Logo do cabeçalho sem redirecionamento ao clicar.
- Ícone de musculação alinhado visualmente aos demais itens do menu.

## Estrutura do projeto

```text
components/     Componentes reutilizáveis da interface
hooks/          Hooks de tema e usuário
pages/          Páginas e rotas da aplicação
  aluno/        Área do aluno
  admin/        Área administrativa
services/       Dados simulados da aplicação
styles/         Estilos globais e variáveis de tema
types/          Tipos TypeScript compartilhados
utils/          Formatações e persistência local
```

## Rotas principais

```text
/                    Login e cadastro
/aluno/onboarding    Personalização inicial do aluno
/aluno/dashboard     Painel do aluno
/aluno/musculacao    Ficha, checklist e calendário de treino
/aluno/perfil        Consulta e edição de perfil
/aluno/aulas         Aulas em grupo
/aluno/reservas      Reservas do aluno
/admin/dashboard     Painel administrativo
/admin/alunos        Gestão de alunos
/admin/alertas       Alertas administrativos
```

## Persistência local

Como o backend ainda não foi iniciado, os dados são armazenados no `localStorage` do navegador.

São persistidos localmente:

- Dados básicos do usuário.
- Perfil físico e de treino.
- Sessões de musculação concluídas.
- Personalizações da ficha de treino.
- Tema escolhido.

Ao limpar os dados do navegador ou utilizar outro navegador, as informações locais serão removidas.

## Dados simulados

A aplicação utiliza dados simulados em `services/mockData.ts` para alimentar dashboards, aulas, reservas, alertas e fichas de musculação.

Não existem chamadas de API ou autenticação real nesta etapa.

## Comandos úteis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Próximos passos

- Criar backend e banco de dados.
- Implementar autenticação segura.
- Remover credenciais administrativas fixas.
- Conectar as páginas a APIs reais.
- Persistir os dados de treino por usuário no banco.
- Criar validações adicionais para formulários.
- Adicionar testes automatizados.
