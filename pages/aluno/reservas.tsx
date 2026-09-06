import { Layout } from "@/components/Layout/Layout";
import { obterReservas } from "@/services/mockData";
import styles from "./sessoes.module.css";

export default function Reservas() {
  const reservas = obterReservas();
  return <Layout perfil="aluno" nomeUsuario="Vitor Paixão"><section className={styles.cabecalho}><div><p className={styles.sobrancelha}>SUA PROGRAMAÇÃO</p><h1>Reservas</h1><p>Acompanhe suas aulas agendadas e o status de cada vaga.</p></div><button className={styles.botaoPrimario}>Nova reserva <span>+</span></button></section><section className={styles.cartaoTabela} aria-label="Lista de reservas"><div className={styles.cabecalhoTabela}><span>AULA</span><span>DATA</span><span>STATUS</span><span /></div>{reservas.map((reserva) => <article className={styles.linhaTabela} key={reserva.id}><strong>{reserva.aula}</strong><span>{reserva.data}</span><span className={`${styles.status} ${styles[`status_${reserva.status}`]}`}>{reserva.status}</span><button className={styles.botaoTexto}>Detalhes</button></article>)}</section></Layout>;
}
