import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { obterIniciais } from "@/utils/formatters";
import styles from "./Header.module.css";

interface HeaderProps {
  nomeUsuario: string;
}

export function Header({ nomeUsuario }: HeaderProps) {
  const { tema, alternarTema } = useTheme();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.marca}>
        Academia Movimento
      </Link>

      <div className={styles.acoes}>
        <button
          type="button"
          onClick={alternarTema}
          className={styles.botaoTema}
          aria-label="Alternar tema claro e escuro"
        >
          {tema === "claro" ? "Modo escuro" : "Modo claro"}
        </button>

        <div className={styles.avatar} title={nomeUsuario}>
          {obterIniciais(nomeUsuario)}
        </div>
      </div>
    </header>
  );
}
