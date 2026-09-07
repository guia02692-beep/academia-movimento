import Link from "next/link";
import { useRouter } from "next/router";
import { PerfilUsuario } from "@/types";
import styles from "./Sidebar.module.css";

interface ItemMenu {
  rotulo: string;
  href: string;
  icone: string;
}

const MENU_POR_PERFIL: Record<PerfilUsuario, ItemMenu[]> = {
  aluno: [
    { rotulo: "Início", href: "/aluno/dashboard", icone: "⌂" },
    { rotulo: "Musculação", href: "/aluno/musculacao", icone: "🏋" },
    { rotulo: "Minhas aulas", href: "/aluno/aulas", icone: "◫" },
    { rotulo: "Reservas", href: "/aluno/reservas", icone: "✓" },
    { rotulo: "Meu perfil", href: "/aluno/onboarding", icone: "✎" },
  ],
  admin: [
    { rotulo: "Visão geral", href: "/admin/dashboard", icone: "⌁" },
    { rotulo: "Alunos", href: "/admin/alunos", icone: "◉" },
    { rotulo: "Alertas", href: "/admin/alertas", icone: "!" },
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
      <p className={styles.rotuloMenu}>MENU PRINCIPAL</p>
      <ul className={styles.lista}>
        {itens.map((item) => (
          <li key={item.rotulo}>
            <Link
              href={item.href}
              className={`${styles.link} ${
                router.pathname === item.href ? styles.linkAtivo : ""
              }`}
            >
              <span className={styles.icone} aria-hidden="true">{item.icone}</span>
              {item.rotulo}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.ajuda}><span className={styles.ajudaIcone}>?</span><span>Precisa de ajuda?<small>Fale com a recepção</small></span></div>
    </nav>
  );
}
