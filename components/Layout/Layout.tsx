import { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Footer } from "@/components/Footer/Footer";
import { PerfilUsuario } from "@/types";
import styles from "./Layout.module.css";

interface LayoutProps {
  perfil: PerfilUsuario;
  nomeUsuario: string;
  children: ReactNode;
}

export function Layout({ perfil, nomeUsuario, children }: LayoutProps) {
  return (
    <div className={styles.pagina}>
      <Header nomeUsuario={nomeUsuario} />
      <div className={styles.corpo}>
        <Sidebar perfil={perfil} />
        <main className={styles.conteudo}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
