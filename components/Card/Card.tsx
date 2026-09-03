import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  titulo?: string;
  children: ReactNode;
  destaque?: boolean;
}

export function Card({ titulo, children, destaque = false }: CardProps) {
  return (
    <div className={`${styles.card} ${destaque ? styles.destaque : ""}`}>
      {titulo && <h3 className={styles.titulo}>{titulo}</h3>}
      <div className={styles.conteudo}>{children}</div>
    </div>
  );
}
