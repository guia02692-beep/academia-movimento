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
