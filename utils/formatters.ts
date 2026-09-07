/**
 * Formata uma porcentagem de frequência com uma casa decimal.
 */
export function formatarPercentual(presencas: number, total: number): string {
  if (total === 0) return "0%";
  const percentual = (presencas / total) * 100;
  return `${percentual.toFixed(1)}%`;
}

/**
 * Retorna as iniciais de um nome completo (até 2 letras),
 * usadas em avatares simples sem imagem.
 */
export function obterIniciais(nomeCompleto: string): string {
  const partes = nomeCompleto.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? "" : "";
  return `${primeira}${ultima}`.toUpperCase();
}

/**
 * Capitaliza a primeira letra de uma string (ex.: "alta" -> "Alta").
 */
export function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Calcula o IMC a partir do peso (kg) e altura (cm).
 * Retorna null quando os dados ainda não foram informados pelo aluno.
 */
export function calcularImc(pesoKg?: number, alturaCm?: number): number | null {
  if (!pesoKg || !alturaCm) return null;
  const alturaM = alturaCm / 100;
  return pesoKg / (alturaM * alturaM);
}

/** Classifica o IMC nas faixas usuais (referência OMS). */
export function classificarImc(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso adequado";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

const ROTULOS_OBJETIVO: Record<string, string> = {
  emagrecimento: "Emagrecimento",
  hipertrofia: "Ganho de massa",
  condicionamento: "Condicionamento físico",
  "saude-geral": "Saúde geral",
  performance: "Performance esportiva",
};

export function formatarObjetivo(objetivo?: string): string {
  if (!objetivo) return "Objetivo não definido";
  return ROTULOS_OBJETIVO[objetivo] ?? capitalizar(objetivo);
}

const ROTULOS_NIVEL: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export function formatarNivel(nivel?: string): string {
  if (!nivel) return "Nível não definido";
  return ROTULOS_NIVEL[nivel] ?? capitalizar(nivel);
}

const ROTULOS_GRUPO_MUSCULAR: Record<string, string> = {
  peito: "Peito",
  costas: "Costas",
  pernas: "Pernas",
  ombros: "Ombros",
  biceps: "Bíceps",
  triceps: "Tríceps",
  abdomen: "Abdômen",
  gluteos: "Glúteos",
};

export function formatarGrupoMuscular(grupo: string): string {
  return ROTULOS_GRUPO_MUSCULAR[grupo] ?? capitalizar(grupo);
}

/** Retorna o nome do dia da semana atual, no mesmo formato usado nas fichas de treino. */
export function obterDiaSemanaAtual(): string {
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return dias[new Date().getDay()] ?? dias[0]!;
}
