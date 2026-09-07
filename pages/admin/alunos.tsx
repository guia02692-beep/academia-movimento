import { Layout } from "@/components/Layout/Layout";
import styles from "./sessoes.module.css";

const alunos = [
  { nome: "Ana Clara Mendes", plano: "Smart", acesso: "Hoje, 08:14", status: "Ativo" },
  { nome: "Bruno Ferreira", plano: "Black", acesso: "Ontem, 19:42", status: "Ativo" },
  { nome: "Carolina Alves", plano: "Smart", acesso: "Há 3 dias", status: "Atenção" },
  { nome: "Diego Santos", plano: "Fit", acesso: "Há 12 dias", status: "Inativo" },
];

export default function Alunos() {
  return <Layout perfil="admin" nomeUsuario="Equipe Admin"><section className={styles.cabecalho}><div><p className={styles.sobrancelha}>GESTÃO DE PESSOAS</p><h1>Alunos</h1><p>Consulte a base ativa e acompanhe o engajamento da unidade.</p></div><button className={styles.botaoPrimario}>Adicionar aluno <span>+</span></button></section><section className={styles.ferramentas}><strong>482 alunos cadastrados</strong><input aria-label="Buscar aluno" placeholder="Buscar aluno..." /></section><section className={styles.tabela}><div className={styles.cabecalhoTabela}><span>ALUNO</span><span>PLANO</span><span>ÚLTIMO ACESSO</span><span>STATUS</span></div>{alunos.map((aluno) => <article className={styles.linhaTabela} key={aluno.nome}><strong>{aluno.nome}</strong><span>{aluno.plano}</span><span>{aluno.acesso}</span><span className={`${styles.status} ${styles[`status_${aluno.status.toLowerCase().replace("ç", "c").replace("ã", "a")}`]}`}>{aluno.status}</span></article>)}</section></Layout>;
}
