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
        <span className={styles.marcaSimbolo}>M</span>
        <span>
          <strong>movimento</strong>
          <small>academia</small>
        </span>
      </Link>

      <div className={styles.acoes}>
        <button
          type="button"
          onClick={alternarTema}
          className={styles.botaoTema}
          aria-label="Alternar tema claro e escuro"
        >
          <span aria-hidden="true">{tema === "claro" ? "◐" : "☀"}</span>
          <span className={styles.rotuloTema}>{tema === "claro" ? "Tema escuro" : "Tema claro"}</span>
        </button>

        <div className={styles.usuario}>
          <div className={styles.avatar} title={nomeUsuario}>{obterIniciais(nomeUsuario)}</div>
          <span className={styles.nomeUsuario}>{nomeUsuario}</span>
        </div>
      </div>
    </header>
  );
}
