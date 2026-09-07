import { TreinoPersonalizado } from "@/types";

const CHAVE_PERSONALIZACOES = "academia-movimento:treinos-personalizados";

export function carregarTreinosPersonalizados(): TreinoPersonalizado[] {
  if (typeof window === "undefined") return [];
  try {
    const salvo = window.localStorage.getItem(CHAVE_PERSONALIZACOES);
    return salvo ? (JSON.parse(salvo) as TreinoPersonalizado[]) : [];
  } catch {
    return [];
  }
}

export function salvarTreinoPersonalizado(treino: TreinoPersonalizado): void {
  if (typeof window === "undefined") return;
  const todos = carregarTreinosPersonalizados();
  const indice = todos.findIndex((item) => item.treinoId === treino.treinoId);
  if (indice >= 0) todos[indice] = treino;
  else todos.push(treino);
  window.localStorage.setItem(CHAVE_PERSONALIZACOES, JSON.stringify(todos));
}

export function removerTreinoPersonalizado(treinoId: string): void {
  if (typeof window === "undefined") return;
  const restantes = carregarTreinosPersonalizados().filter((item) => item.treinoId !== treinoId);
  window.localStorage.setItem(CHAVE_PERSONALIZACOES, JSON.stringify(restantes));
}
