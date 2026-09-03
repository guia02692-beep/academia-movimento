import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Tema } from "@/types";

interface ThemeContextValue {
  tema: Tema;
  alternarTema: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const CHAVE_ARMAZENAMENTO = "academia-movimento:tema";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro");

  // Recupera a preferência salva (ou a do sistema) apenas no client,
  // evitando divergência entre render do servidor e do navegador.
  useEffect(() => {
    const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO) as Tema | null;
    if (salvo === "claro" || salvo === "escuro") {
      setTema(salvo);
      return;
    }
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTema(prefereEscuro ? "escuro" : "claro");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, tema);
  }, [tema]);

  function alternarTema() {
    setTema((atual: Tema) => (atual === "claro" ? "escuro" : "claro"));
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error("useTheme precisa ser usado dentro de um ThemeProvider");
  }
  return contexto;
}
