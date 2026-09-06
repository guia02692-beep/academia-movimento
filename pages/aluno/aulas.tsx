import { Layout } from "@/components/Layout/Layout";
import { obterProximasAulas } from "@/services/mockData";
import styles from "./sessoes.module.css";

export default function MinhasAulas() {
  const aulas = obterProximasAulas();
  return <Layout perfil="aluno" nomeUsuario="Vitor Paixão"><section className={styles.cabecalho}><div><p className={styles.sobrancelha}>AGENDA DE TREINOS</p><h1>Minhas aulas</h1><p>Escolha uma turma e mantenha sua rotina em movimento.</p></div><button className={styles.botaoPrimario}>Explorar modalidades <span>→</span></button></section><section className={styles.listaAulas} aria-label="Aulas disponíveis">{aulas.map((aula) => <article className={styles.aula} key={aula.id}><div className={styles.dataAula}><strong>{aula.horario}</strong><span>{aula.diaSemana}</span></div><div className={styles.infoAula}><span className={styles.modalidade}>AULA EM GRUPO</span><h2>{aula.nome}</h2><p>Professor(a) {aula.professor}</p></div><div className={styles.acaoAula}><span className={aula.vagasDisponiveis ? styles.vagas : styles.lotada}>{aula.vagasDisponiveis ? `${aula.vagasDisponiveis} vagas disponíveis` : "Turma lotada"}</span><button disabled={!aula.vagasDisponiveis}>{aula.vagasDisponiveis ? "Reservar vaga" : "Indisponível"}</button></div></article>)}</section></Layout>;
}
