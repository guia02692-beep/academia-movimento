import Link from "next/link";
import { Layout } from "@/components/Layout/Layout";
import { Card } from "@/components/Card/Card";
import { useUsuario } from "@/hooks/useUsuario";
import {
  obterProximasAulas,
  obterReservas,
  obterFrequencia,
  obterTreinoDoDia,
} from "@/services/mockData";
import { formatarPercentual, formatarObjetivo } from "@/utils/formatters";
import styles from "./dashboard.module.css";

export default function DashboardAluno() {
  const { usuario } = useUsuario();
  const aulas = obterProximasAulas();
  const reservas = obterReservas();
  const frequencia = obterFrequencia();
  const treinoHoje = obterTreinoDoDia();

  const nomeCompleto = usuario?.nome || "Atleta";
  const primeiroNome = nomeCompleto.split(" ")[0];
  const objetivo = usuario?.perfilAluno?.objetivo;

  return (
    <Layout perfil="aluno" nomeUsuario={nomeCompleto}>
      <section className={styles.boasVindas}>
        <div>
          <p className={styles.sobrancelha}>SEU PAINEL</p>
          <h1 className={styles.tituloPagina}>Olá, {primeiroNome}. Vamos em movimento?</h1>
          <p className={styles.subtitulo}>
            {objetivo
              ? `Foco em ${formatarObjetivo(objetivo).toLowerCase()}. Confira o que vem pela frente.`
              : "Seu ritmo está consistente. Confira o que vem pela frente."}
          </p>
        </div>
        <div className={styles.resumoSemana}><span>Meta semanal</span><strong>3 <small>/ 4 treinos</small></strong><div className={styles.barraProgresso}><span /></div></div>
      </section>

      <section className={styles.secao}>
        <div className={styles.cabecalhoSecao}>
          <div>
            <p className={styles.sobrancelha}>MUSCULAÇÃO</p>
            <h2>Treino de hoje</h2>
          </div>
          <Link href="/aluno/musculacao" className={styles.linkAcao}>
            Ver ficha completa <span>→</span>
          </Link>
        </div>
        <div className={styles.gradeAulas}>
          {treinoHoje ? (
            <div className={styles.treinoHoje}>
              <span className={styles.letraTreino}>{treinoHoje.letra}</span>
              <span className={styles.detalhesAula}>
                <span className={styles.itemPrincipal}>{treinoHoje.nome}</span>
                <span className={styles.itemSecundario}>
                  {treinoHoje.exercicios.length} exercícios programados
                </span>
              </span>
              <Link href="/aluno/musculacao" className={styles.botaoIniciar}>
                Iniciar treino
              </Link>
            </div>
          ) : (
            <p className={styles.semTreinoHoje}>
              Sem musculação prevista para hoje. Aproveite para descansar ou fazer uma aula em grupo.
            </p>
          )}
        </div>
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
