// Tipos centrais da plataforma. Mantidos aqui para serem reaproveitados
// por componentes, páginas e serviços mockados.

export type Tema = "claro" | "escuro";

export type PerfilUsuario = "aluno" | "admin";

export type SexoBiologico = "masculino" | "feminino" | "prefiro-nao-informar";

export type ObjetivoTreino =
  | "emagrecimento"
  | "hipertrofia"
  | "condicionamento"
  | "saude-geral"
  | "performance";

export type NivelExperiencia = "iniciante" | "intermediario" | "avancado";

// Informações determinantes coletadas no onboarding, usadas para
// personalizar saudações, sugestões de treino e cálculos (ex.: IMC).
export interface PerfilAluno {
  idade?: number;
  sexo?: SexoBiologico;
  alturaCm?: number;
  pesoKg?: number;
  objetivo?: ObjetivoTreino;
  nivelExperiencia?: NivelExperiencia;
  diasPorSemana?: number;
  restricoes?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  perfilAluno?: PerfilAluno;
  onboardingCompleto?: boolean;
}

export interface Aula {
  id: string;
  nome: string;
  professor: string;
  horario: string;
  diaSemana: string;
  vagasDisponiveis: number;
}

export interface Reserva {
  id: string;
  aula: string;
  data: string;
  status: "confirmada" | "pendente" | "cancelada";
}

export interface RegistroFrequencia {
  mes: string;
  presencas: number;
  totalAulas: number;
}

export interface IndicadorEngajamento {
  id: string;
  titulo: string;
  valor: string;
  variacao: string;
  tendencia: "alta" | "baixa" | "estavel";
}

export interface AlertaAdmin {
  id: string;
  titulo: string;
  descricao: string;
  nivel: "info" | "atencao" | "critico";
}

// --- Musculação ---------------------------------------------------

export type GrupoMuscular =
  | "peito"
  | "costas"
  | "pernas"
  | "ombros"
  | "biceps"
  | "triceps"
  | "abdomen"
  | "gluteos";

export interface ExercicioFicha {
  id: string;
  nome: string;
  grupoMuscular: GrupoMuscular;
  series: number;
  repeticoes: string;
  cargaSugeridaKg?: number;
  descanso: string;
}

export interface TreinoMusculacao {
  id: string;
  letra: string;
  nome: string;
  diasSemana: string[];
  exercicios: ExercicioFicha[];
}

export interface RegistroTreinoConcluido {
  id: string;
  data: string;
  treino: string;
  duracaoMin: number;
  volumeTotalKg: number;
}

// Ajustes pessoais ficam separados da ficha prescrita. Desse modo, uma
// atualização do professor não apaga as preferências do aluno.
export interface TreinoPersonalizado {
  treinoId: string;
  ordemExercicios: string[];
  exerciciosOcultos: string[];
  ajustes: Record<string, Partial<Pick<ExercicioFicha, "series" | "repeticoes" | "cargaSugeridaKg" | "descanso">>>;
}

// Registro criado pelo aluno enquanto executa a ficha. Ele preserva a
// resposta real ao treino (não apenas o que foi prescrito) para que a próxima
// sessão possa sugerir uma progressão individual.
export interface SerieRegistrada {
  cargaKg?: number;
  repeticoes?: number;
  rpe?: number;
}

export interface RegistroExercicioSessao {
  exercicioId: string;
  exercicioNome: string;
  series: SerieRegistrada[];
  observacao?: string;
}

export interface SessaoTreino {
  id: string;
  treinoId: string;
  treinoNome: string;
  iniciadaEm: string;
  finalizadaEm?: string;
  exercicios: Record<string, RegistroExercicioSessao>;
}

export interface FocoMuscularSemana {
  grupoMuscular: GrupoMuscular;
  percentualTrabalhado: number;
}
