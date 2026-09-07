import { SessaoTreino } from "@/types";

const CHAVE_SESSOES = "academia-movimento:sessoes-treino";

export function carregarSessoesTreino(): SessaoTreino[] {
  if (typeof window === "undefined") return [];
  try {
    const salvo = window.localStorage.getItem(CHAVE_SESSOES);
    return salvo ? (JSON.parse(salvo) as SessaoTreino[]) : [];
  } catch {
    return [];
  }
}

export function salvarSessaoTreino(sessao: SessaoTreino): void {
  if (typeof window === "undefined") return;
  const sessoes = carregarSessoesTreino();
  const indice = sessoes.findIndex((item) => item.id === sessao.id);
  if (indice >= 0) sessoes[indice] = sessao;
  else sessoes.unshift(sessao);
  window.localStorage.setItem(CHAVE_SESSOES, JSON.stringify(sessoes.slice(0, 50)));
}
