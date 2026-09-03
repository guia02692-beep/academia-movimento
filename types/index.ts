// Tipos centrais da plataforma. Mantidos aqui para serem reaproveitados
// por componentes, páginas e serviços mockados.

export type Tema = "claro" | "escuro";

export type PerfilUsuario = "aluno" | "admin";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
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
