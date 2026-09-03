import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string;
  mensagemErro?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ rotulo, mensagemErro, id, ...resto }, ref) => {
    const inputId = id ?? rotulo.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={styles.grupo}>
        <label htmlFor={inputId} className={styles.rotulo}>
          {rotulo}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`${styles.campo} ${mensagemErro ? styles.campoComErro : ""}`}
          {...resto}
        />
        {mensagemErro && <span className={styles.erro}>{mensagemErro}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
