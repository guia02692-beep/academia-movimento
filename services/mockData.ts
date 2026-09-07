// Camada de "serviço" mockada. Quando a API real existir, cada função
// aqui pode ser substituída por uma chamada fetch/axios mantendo a mesma
// assinatura, sem precisar alterar os componentes que a consomem.

import {
  Aula,
  Reserva,
  RegistroFrequencia,
  IndicadorEngajamento,
  AlertaAdmin,
  TreinoMusculacao,
  RegistroTreinoConcluido,
  FocoMuscularSemana,
} from "@/types";
import { obterDiaSemanaAtual } from "@/utils/formatters";

export function obterProximasAulas(): Aula[] {
  return [
    {
      id: "aula-1",
      nome: "Treino Funcional",
      professor: "Marcos Vinícius",
      horario: "07:00",
      diaSemana: "Segunda-feira",
      vagasDisponiveis: 4,
    },
    {
      id: "aula-2",
      nome: "Spinning",
      professor: "Camila Torres",
      horario: "18:30",
      diaSemana: "Quarta-feira",
      vagasDisponiveis: 0,
    },
    {
      id: "aula-3",
      nome: "Jiu-Jitsu Fundamentos",
      professor: "Rafael Souza",
      horario: "19:30",
      diaSemana: "Sexta-feira",
      vagasDisponiveis: 8,
    },
  ];
}

export function obterReservas(): Reserva[] {
  return [
    { id: "reserva-1", aula: "Treino Funcional", data: "09/09", status: "confirmada" },
    { id: "reserva-2", aula: "Spinning", data: "11/09", status: "pendente" },
    { id: "reserva-3", aula: "Jiu-Jitsu Fundamentos", data: "13/09", status: "cancelada" },
  ];
}

export function obterFrequencia(): RegistroFrequencia {
  return {
    mes: "Agosto",
    presencas: 14,
    totalAulas: 18,
  };
}

export function obterIndicadoresEngajamento(): IndicadorEngajamento[] {
  return [
    {
      id: "indicador-1",
      titulo: "Alunos ativos",
      valor: "482",
      variacao: "+6,4%",
      tendencia: "alta",
    },
    {
      id: "indicador-2",
      titulo: "Check-ins na semana",
      valor: "1.230",
      variacao: "+2,1%",
      tendencia: "alta",
    },
    {
      id: "indicador-3",
      titulo: "Taxa de renovação",
      valor: "78%",
      variacao: "-3,0%",
      tendencia: "baixa",
    },
    {
      id: "indicador-4",
      titulo: "Ocupação média das turmas",
      valor: "84%",
      variacao: "0,0%",
      tendencia: "estavel",
    },
  ];
}

// --- Musculação -----------------------------------------------------
// Ficha em split ABC, referência comum em apps de treino (Strong,
// Hevy, Gympass): cada letra concentra grupos musculares específicos
// e se repete em dois dias fixos da semana.

export function obterFichaMusculacao(): TreinoMusculacao[] {
  return [
    {
      id: "treino-a",
      letra: "A",
      nome: "Peito, Ombro e Tríceps",
      diasSemana: ["Segunda-feira", "Quinta-feira"],
      exercicios: [
        { id: "a1", nome: "Supino reto com barra", grupoMuscular: "peito", series: 4, repeticoes: "8-10", cargaSugeridaKg: 40, descanso: "90s" },
        { id: "a2", nome: "Supino inclinado com halteres", grupoMuscular: "peito", series: 3, repeticoes: "10-12", cargaSugeridaKg: 16, descanso: "75s" },
        { id: "a3", nome: "Crucifixo na polia", grupoMuscular: "peito", series: 3, repeticoes: "12-15", cargaSugeridaKg: 10, descanso: "60s" },
        { id: "a4", nome: "Desenvolvimento militar", grupoMuscular: "ombros", series: 3, repeticoes: "8-10", cargaSugeridaKg: 20, descanso: "90s" },
        { id: "a5", nome: "Elevação lateral", grupoMuscular: "ombros", series: 3, repeticoes: "12-15", cargaSugeridaKg: 8, descanso: "60s" },
        { id: "a6", nome: "Tríceps corda", grupoMuscular: "triceps", series: 3, repeticoes: "12-15", cargaSugeridaKg: 18, descanso: "60s" },
      ],
    },
    {
      id: "treino-b",
      letra: "B",
      nome: "Costas e Bíceps",
      diasSemana: ["Terça-feira", "Sexta-feira"],
      exercicios: [
        { id: "b1", nome: "Puxada frente na polia", grupoMuscular: "costas", series: 4, repeticoes: "8-10", cargaSugeridaKg: 45, descanso: "90s" },
        { id: "b2", nome: "Remada curvada com barra", grupoMuscular: "costas", series: 3, repeticoes: "8-10", cargaSugeridaKg: 40, descanso: "90s" },
        { id: "b3", nome: "Remada unilateral com halter", grupoMuscular: "costas", series: 3, repeticoes: "10-12", cargaSugeridaKg: 18, descanso: "75s" },
        { id: "b4", nome: "Rosca direta com barra", grupoMuscular: "biceps", series: 3, repeticoes: "10-12", cargaSugeridaKg: 20, descanso: "60s" },
        { id: "b5", nome: "Rosca alternada com halteres", grupoMuscular: "biceps", series: 3, repeticoes: "12", cargaSugeridaKg: 10, descanso: "60s" },
      ],
    },
    {
      id: "treino-c",
      letra: "C",
      nome: "Pernas e Glúteos",
      diasSemana: ["Quarta-feira", "Sábado"],
      exercicios: [
        { id: "c1", nome: "Agachamento livre", grupoMuscular: "pernas", series: 4, repeticoes: "8-10", cargaSugeridaKg: 50, descanso: "120s" },
        { id: "c2", nome: "Leg press 45°", grupoMuscular: "pernas", series: 4, repeticoes: "10-12", cargaSugeridaKg: 120, descanso: "90s" },
        { id: "c3", nome: "Cadeira extensora", grupoMuscular: "pernas", series: 3, repeticoes: "12-15", cargaSugeridaKg: 35, descanso: "60s" },
        { id: "c4", nome: "Elevação pélvica", grupoMuscular: "gluteos", series: 4, repeticoes: "10-12", cargaSugeridaKg: 40, descanso: "75s" },
        { id: "c5", nome: "Panturrilha em pé", grupoMuscular: "pernas", series: 4, repeticoes: "15-20", cargaSugeridaKg: 60, descanso: "45s" },
      ],
    },
  ];
}

/** Retorna a ficha do dia (se houver treino previsto para hoje). */
export function obterTreinoDoDia(): TreinoMusculacao | null {
  const hoje = obterDiaSemanaAtual();
  return obterFichaMusculacao().find((ficha) => ficha.diasSemana.includes(hoje)) ?? null;
}

export function obterHistoricoTreinos(): RegistroTreinoConcluido[] {
  return [
    { id: "h1", data: "04/09", treino: "Treino A · Peito, Ombro e Tríceps", duracaoMin: 58, volumeTotalKg: 4120 },
    { id: "h2", data: "02/09", treino: "Treino C · Pernas e Glúteos", duracaoMin: 64, volumeTotalKg: 5860 },
    { id: "h3", data: "31/08", treino: "Treino B · Costas e Bíceps", duracaoMin: 52, volumeTotalKg: 3740 },
    { id: "h4", data: "29/08", treino: "Treino A · Peito, Ombro e Tríceps", duracaoMin: 55, volumeTotalKg: 3960 },
  ];
}

export function obterFocoMuscularSemana(): FocoMuscularSemana[] {
  return [
    { grupoMuscular: "pernas", percentualTrabalhado: 90 },
    { grupoMuscular: "costas", percentualTrabalhado: 70 },
    { grupoMuscular: "peito", percentualTrabalhado: 65 },
    { grupoMuscular: "ombros", percentualTrabalhado: 55 },
    { grupoMuscular: "gluteos", percentualTrabalhado: 60 },
    { grupoMuscular: "biceps", percentualTrabalhado: 45 },
    { grupoMuscular: "triceps", percentualTrabalhado: 40 },
    { grupoMuscular: "abdomen", percentualTrabalhado: 30 },
  ];
}

export function obterAlertasAdmin(): AlertaAdmin[] {
  return [
    {
      id: "alerta-1",
      titulo: "Turma de Spinning lotada",
      descricao: "Todas as vagas de quarta-feira às 18h30 foram preenchidas.",
      nivel: "info",
    },
    {
      id: "alerta-2",
      titulo: "Queda na frequência",
      descricao: "12 alunos não comparecem há mais de 2 semanas.",
      nivel: "atencao",
    },
    {
      id: "alerta-3",
      titulo: "Renovações vencendo",
      descricao: "9 planos vencem nos próximos 5 dias sem renovação registrada.",
      nivel: "critico",
    },
  ];
}
