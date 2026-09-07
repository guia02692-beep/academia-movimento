// Camada de persistência local do usuário. Como esta entrega não tem
// autenticação real (ver comentário em pages/index.tsx), guardamos o
// perfil no localStorage do navegador, no mesmo espírito do useTheme.
// Quando a API real existir, basta trocar essas funções por chamadas
// fetch/axios mantendo as mesmas assinaturas.

import { Usuario, PerfilAluno } from "@/types";

const CHAVE_ARMAZENAMENTO = "academia-movimento:usuario";

const USUARIO_PADRAO: Usuario = {
  id: "usuario-local",
  nome: "",
  email: "",
  perfil: "aluno",
  onboardingCompleto: false,
};

export function carregarUsuario(): Usuario | null {
  if (typeof window === "undefined") return null;
  const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto) as Usuario;
  } catch {
    return null;
  }
}

function persistir(usuario: Usuario): Usuario {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(usuario));
  }
  return usuario;
}

/** Mescla dados básicos (nome, email, perfil) ao usuário salvo. */
export function salvarUsuario(dados: Partial<Usuario>): Usuario {
  const atual = carregarUsuario() ?? USUARIO_PADRAO;
  return persistir({ ...atual, ...dados });
}

/** Mescla as respostas do onboarding e marca o fluxo como concluído. */
export function salvarPerfilAluno(perfilAluno: PerfilAluno): Usuario {
  const atual = carregarUsuario() ?? USUARIO_PADRAO;
  return persistir({
    ...atual,
    perfilAluno: { ...atual.perfilAluno, ...perfilAluno },
    onboardingCompleto: true,
  });
}

export function limparUsuario(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHAVE_ARMAZENAMENTO);
}
