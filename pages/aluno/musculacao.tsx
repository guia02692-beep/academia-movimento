import { useMemo, useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/Layout/Layout";
import { Card } from "@/components/Card/Card";
import { useUsuario } from "@/hooks/useUsuario";
import {
  obterFichaMusculacao,
  obterTreinoDoDia,
  obterHistoricoTreinos,
  obterFocoMuscularSemana,
} from "@/services/mockData";
import {
  calcularImc,
  classificarImc,
  formatarGrupoMuscular,
  formatarNivel,
  formatarObjetivo,
} from "@/utils/formatters";
import styles from "./musculacao.module.css";

export default function Musculacao() {
  const { usuario } = useUsuario();
  const fichas = useMemo(() => obterFichaMusculacao(), []);
  const treinoDoDia = useMemo(() => obterTreinoDoDia(), []);
  const historico = useMemo(() => obterHistoricoTreinos(), []);
  const focoMuscular = useMemo(() => obterFocoMuscularSemana(), []);

  const [treinoSelecionadoId, setTreinoSelecionadoId] = useState(
    treinoDoDia?.id ?? fichas[0]?.id
  );
  // Marcação de séries concluídas é local à sessão (mock): sem backend,
  // reflete o mesmo espírito do restante do app.
  const [concluidos, setConcluidos] = useState<Record<string, boolean>>({});

  const treinoAtual = fichas.find((ficha) => ficha.id === treinoSelecionadoId) ?? fichas[0]!;
  const totalExerciciosConcluidos = treinoAtual.exercicios.filter(
    (exercicio) => concluidos[exercicio.id]
  ).length;
  const progressoTreino = Math.round(
    (totalExerciciosConcluidos / treinoAtual.exercicios.length) * 100
  );

  function alternarConcluido(id: string) {
    setConcluidos((atual) => ({ ...atual, [id]: !atual[id] }));
  }

  const perfilAluno = usuario?.perfilAluno;
  const imc = calcularImc(perfilAluno?.pesoKg, perfilAluno?.alturaCm);
  const perfilIncompleto = !perfilAluno?.objetivo || !perfilAluno?.nivelExperiencia;

  return (
    <Layout perfil="aluno" nomeUsuario={usuario?.nome || "Atleta"}>
      <section className={styles.cabecalho}>
        <div>
          <p className={styles.sobrancelha}>SUA FICHA</p>
          <h1>Musculação</h1>
          <p>
            {treinoDoDia
              ? `Hoje é dia de Treino ${treinoDoDia.letra} · ${treinoDoDia.nome}.`
              : "Sem musculação prevista para hoje — aproveite para descansar."}
          </p>
        </div>
        <Link href="/aluno/onboarding" className={styles.botaoNeutro}>
          Editar perfil físico
        </Link>
      </section>

      {perfilIncompleto ? (
        <Card destaque>
          <p className={styles.avisoIncompleto}>
            Complete seu objetivo e nível de experiência para receber uma ficha
            e cargas sugeridas totalmente personalizadas.
          </p>
          <Link href="/aluno/onboarding" className={styles.linkAviso}>
            Completar perfil →
          </Link>
        </Card>
      ) : (
        <section className={styles.gradePerfil}>
          <Card titulo="Objetivo">
            <p className={styles.valorPerfil}>{formatarObjetivo(perfilAluno?.objetivo)}</p>
          </Card>
          <Card titulo="Nível">
            <p className={styles.valorPerfil}>{formatarNivel(perfilAluno?.nivelExperiencia)}</p>
          </Card>
          <Card titulo="IMC">
            <p className={styles.valorPerfil}>
              {imc ? imc.toFixed(1) : "—"}
            </p>
            <span className={styles.itemSecundario}>
              {imc ? classificarImc(imc) : "Informe peso e altura no perfil"}
            </span>
          </Card>
          <Card titulo="Frequência">
            <p className={styles.valorPerfil}>{perfilAluno?.diasPorSemana ?? "—"}x / semana</p>
          </Card>
        </section>
      )}

      <section className={styles.secao}>
        <div className={styles.cabecalhoSecao}>
          <p className={styles.sobrancelha}>PLANO SEMANAL</p>
          <h2>Sua divisão de treino</h2>
        </div>

        <div className={styles.seletorTreino} role="tablist" aria-label="Selecionar treino">
          {fichas.map((ficha) => (
            <button
              key={ficha.id}
              type="button"
              role="tab"
              aria-selected={ficha.id === treinoAtual.id}
              className={`${styles.abaTreino} ${
                ficha.id === treinoAtual.id ? styles.abaTreinoAtiva : ""
              }`}
              onClick={() => setTreinoSelecionadoId(ficha.id)}
            >
              <strong>Treino {ficha.letra}</strong>
              <span>{ficha.nome}</span>
            </button>
          ))}
        </div>

        <div className={styles.cartaoTreino}>
          <div className={styles.cabecalhoCartaoTreino}>
            <div>
              <span className={styles.diasTreino}>
                {treinoAtual.diasSemana.join(" · ")}
              </span>
              <h3>{treinoAtual.nome}</h3>
            </div>
            <div className={styles.progressoTreino}>
              <span>
                {totalExerciciosConcluidos}/{treinoAtual.exercicios.length} concluídos
              </span>
              <div className={styles.barraProgresso}>
                <span style={{ width: `${progressoTreino}%` }} />
              </div>
            </div>
          </div>

          <ul className={styles.listaExercicios}>
            {treinoAtual.exercicios.map((exercicio) => (
              <li
                key={exercicio.id}
                className={`${styles.exercicio} ${
                  concluidos[exercicio.id] ? styles.exercicioConcluido : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.checkbox}
                  aria-pressed={Boolean(concluidos[exercicio.id])}
                  aria-label={`Marcar ${exercicio.nome} como concluído`}
                  onClick={() => alternarConcluido(exercicio.id)}
                >
                  {concluidos[exercicio.id] ? "✓" : ""}
                </button>
                <div className={styles.infoExercicio}>
                  <span className={styles.tagGrupo}>
                    {formatarGrupoMuscular(exercicio.grupoMuscular)}
                  </span>
                  <span className={styles.nomeExercicio}>{exercicio.nome}</span>
                </div>
                <div className={styles.metasExercicio}>
                  <span>{exercicio.series} séries</span>
                  <span>{exercicio.repeticoes} reps</span>
                  {exercicio.cargaSugeridaKg && <span>{exercicio.cargaSugeridaKg} kg</span>}
                  <span className={styles.descanso}>{exercicio.descanso}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.gradeInferior}>
        <Card titulo="Foco muscular da semana">
          <div className={styles.listaFoco}>
            {focoMuscular.map((item) => (
              <div key={item.grupoMuscular} className={styles.linhaFoco}>
                <span className={styles.nomeFoco}>
                  {formatarGrupoMuscular(item.grupoMuscular)}
                </span>
                <div className={styles.trilhaFoco}>
                  <span style={{ width: `${item.percentualTrabalhado}%` }} />
                </div>
                <span className={styles.percentualFoco}>{item.percentualTrabalhado}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card titulo="Últimos treinos">
          <ul className={styles.lista}>
            {historico.map((registro) => (
              <li key={registro.id} className={styles.itemHistorico}>
                <span className={styles.itemPrincipal}>{registro.treino}</span>
                <span className={styles.itemSecundario}>
                  {registro.data} · {registro.duracaoMin} min · {registro.volumeTotalKg.toLocaleString("pt-BR")} kg
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </Layout>
  );
}
