import styles from "./Footer.module.css";

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>© {anoAtual} Academia Movimento. Todos os direitos reservados.</span>
    </footer>
  );
}
