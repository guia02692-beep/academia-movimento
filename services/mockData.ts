// Camada de "serviço" mockada. Quando a API real existir, cada função
// aqui pode ser substituída por uma chamada fetch/axios mantendo a mesma
// assinatura, sem precisar alterar os componentes que a consomem.

import {
  Aula,
  Reserva,
  RegistroFrequencia,
  IndicadorEngajamento,
  AlertaAdmin,
} from "@/types";

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
