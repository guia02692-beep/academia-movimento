import { Layout } from "@/components/Layout/Layout";
import { Card } from "@/components/Card/Card";
import {
  obterProximasAulas,
  obterReservas,
  obterFrequencia,
} from "@/services/mockData";
import { formatarPercentual } from "@/utils/formatters";
import styles from "./dashboard.module.css";

export default function DashboardAluno() {
  const aulas = obterProximasAulas();
  const reservas = obterReservas();
  const frequencia = obterFrequencia();

  return (
    <Layout perfil="aluno" nomeUsuario="Vitor Paixão">
      <section className={styles.boasVindas}>
        <div>
          <p className={styles.sobrancelha}>SEU PAINEL</p>
          <h1 className={styles.tituloPagina}>Olá, Vitor. Vamos em movimento?</h1>
          <p className={styles.subtitulo}>Seu ritmo está consistente. Confira o que vem pela frente.</p>
        </div>
        <div className={styles.resumoSemana}><span>Meta semanal</span><strong>3 <small>/ 4 treinos</small></strong><div className={styles.barraProgresso}><span /></div></div>
      </section>

      <section className={styles.secao}>
        <div className={styles.cabecalhoSecao}><div><p className={styles.sobrancelha}>AGENDA</p><h2>Próximas aulas</h2></div><button className={styles.linkAcao}>Ver agenda <span>→</span></button></div>
        <div className={styles.gradeAulas}>
          <ul className={styles.lista}>
            {aulas.map((aula) => (
              <li key={aula.id} className={styles.itemLista}>
                <span className={styles.blocoHora}><strong>{aula.horario}</strong><small>{aula.diaSemana.slice(0, 3)}</small></span>
                <span className={styles.detalhesAula}><span className={styles.itemPrincipal}>{aula.nome}</span><span className={styles.itemSecundario}>com {aula.professor}</span></span>
                <span className={styles.itemVagas}>
                  {aula.vagasDisponiveis > 0
                    ? `${aula.vagasDisponiveis} vagas`
                    : "Turma lotada"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.gradeInferior}>
        <Card titulo="Minhas reservas">
          <ul className={styles.lista}>
            {reservas.map((reserva) => (
              <li key={reserva.id} className={styles.itemLista}>
                <span className={styles.itemPrincipal}>{reserva.aula}</span>
                <span className={styles.itemSecundario}>{reserva.data}</span>
                <span
                  className={`${styles.status} ${styles[`status_${reserva.status}`]}`}
                >
                  {reserva.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card destaque>
          <div className={styles.frequenciaTopo}><div><p className={styles.sobrancelha}>DESEMPENHO</p><h3>Frequência do mês</h3></div><span className={styles.anelProgresso}>{formatarPercentual(frequencia.presencas, frequencia.totalAulas)}</span></div>
          <p className={styles.itemSecundario}>{frequencia.presencas} de {frequencia.totalAulas} aulas concluídas em {frequencia.mes}.</p>
        </Card>
      </section>
    </Layout>
  );
}
