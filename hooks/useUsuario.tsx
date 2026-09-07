import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Usuario, PerfilAluno } from "@/types";
import {
  carregarUsuario,
  salvarUsuario as salvarUsuarioNoStorage,
  salvarPerfilAluno as salvarPerfilAlunoNoStorage,
  limparUsuario as limparUsuarioNoStorage,
} from "@/utils/usuarioStore";

interface UsuarioContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  salvarUsuario: (dados: Partial<Usuario>) => Usuario;
  salvarPerfilAluno: (perfilAluno: PerfilAluno) => Usuario;
  sair: () => void;
}

const UsuarioContext = createContext<UsuarioContextValue | undefined>(undefined);

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Assim como no tema, a leitura do localStorage só acontece no client
  // para evitar divergência entre o render do servidor e o navegador.
  useEffect(() => {
    setUsuario(carregarUsuario());
    setCarregando(false);
  }, []);

  const salvarUsuario = useCallback((dados: Partial<Usuario>) => {
    const atualizado = salvarUsuarioNoStorage(dados);
    setUsuario(atualizado);
    return atualizado;
  }, []);

  const salvarPerfilAluno = useCallback((perfilAluno: PerfilAluno) => {
    const atualizado = salvarPerfilAlunoNoStorage(perfilAluno);
    setUsuario(atualizado);
    return atualizado;
  }, []);

  const sair = useCallback(() => {
    limparUsuarioNoStorage();
    setUsuario(null);
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, carregando, salvarUsuario, salvarPerfilAluno, sair }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario(): UsuarioContextValue {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error("useUsuario precisa ser usado dentro de um UsuarioProvider");
  }
  return contexto;
}
