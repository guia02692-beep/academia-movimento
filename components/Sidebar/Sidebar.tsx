import Link from "next/link";
import { useRouter } from "next/router";
import { PerfilUsuario } from "@/types";
import styles from "./Sidebar.module.css";

interface ItemMenu {
  rotulo: string;
  href: string;
}

const MENU_POR_PERFIL: Record<PerfilUsuario, ItemMenu[]> = {
  aluno: [
    { rotulo: "Início", href: "/aluno/dashboard" },
    { rotulo: "Minhas aulas", href: "/aluno/dashboard" },
    { rotulo: "Reservas", href: "/aluno/dashboard" },
  ],
  admin: [
    { rotulo: "Visão geral", href: "/admin/dashboard" },
    { rotulo: "Alunos", href: "/admin/dashboard" },
    { rotulo: "Alertas", href: "/admin/dashboard" },
  ],
};

interface SidebarProps {
  perfil: PerfilUsuario;
}

export function Sidebar({ perfil }: SidebarProps) {
  const router = useRouter();
  const itens = MENU_POR_PERFIL[perfil] ?? [];

  return (
    <nav className={styles.sidebar} aria-label={`Navegação do perfil ${perfil}`}>
      <ul className={styles.lista}>
        {itens.map((item) => (
          <li key={item.rotulo}>
            <Link
              href={item.href}
              className={`${styles.link} ${
                router.pathname === item.href ? styles.linkAtivo : ""
              }`}
            >
              {item.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
