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
      <h1 className={styles.tituloPagina}>Olá, bem-vindo de volta</h1>
      <p className={styles.subtitulo}>Aqui está um resumo da sua semana na academia.</p>

      <section className={styles.grade}>
        <Card titulo="Próximas aulas">
          <ul className={styles.lista}>
            {aulas.map((aula) => (
              <li key={aula.id} className={styles.itemLista}>
                <span className={styles.itemPrincipal}>{aula.nome}</span>
                <span className={styles.itemSecundario}>
                  {aula.diaSemana} · {aula.horario} com {aula.professor}
                </span>
                <span className={styles.itemVagas}>
                  {aula.vagasDisponiveis > 0
                    ? `${aula.vagasDisponiveis} vagas disponíveis`
                    : "Turma lotada"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

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

        <Card titulo="Frequência do mês" destaque>
          <p className={styles.frequenciaValor}>
            {formatarPercentual(frequencia.presencas, frequencia.totalAulas)}
          </p>
          <p className={styles.itemSecundario}>
            {frequencia.presencas} de {frequencia.totalAulas} aulas em {frequencia.mes}
          </p>
        </Card>
      </section>
    </Layout>
  );
}
