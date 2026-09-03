import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type VarianteBotao = "primario" | "secundario" | "fantasma";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: VarianteBotao;
  larguraTotal?: boolean;
}

export function Button({
  children,
  variante = "primario",
  larguraTotal = false,
  className,
  ...resto
}: ButtonProps) {
  const classes = [
    styles.botao,
    styles[variante],
    larguraTotal ? styles.larguraTotal : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...resto}>
      {children}
    </button>
  );
}
