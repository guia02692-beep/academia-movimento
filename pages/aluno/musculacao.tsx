import { useEffect, useMemo, useState } from "react";
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
import { ExercicioFicha, SerieRegistrada, SessaoTreino, TreinoPersonalizado } from "@/types";
import { carregarSessoesTreino, salvarSessaoTreino } from "@/utils/treinoStore";
import { carregarTreinosPersonalizados, removerTreinoPersonalizado, salvarTreinoPersonalizado } from "@/utils/treinoPersonalizadoStore";
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
  const [sessao, setSessao] = useState<SessaoTreino | null>(null);
  const [sessoesSalvas, setSessoesSalvas] = useState<SessaoTreino[]>([]);
  const [descansoAte, setDescansoAte] = useState<number | null>(null);
  const [agora, setAgora] = useState(Date.now());
  const [personalizacoes, setPersonalizacoes] = useState<TreinoPersonalizado[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);

  const treinoBase = fichas.find((ficha) => ficha.id === treinoSelecionadoId) ?? fichas[0]!;
  const personalizacaoAtual = personalizacoes.find((item) => item.treinoId === treinoBase.id);
  const treinoAtual = useMemo(() => {
    const ordem = personalizacaoAtual?.ordemExercicios ?? treinoBase.exercicios.map((item) => item.id);
    const porId = new Map(treinoBase.exercicios.map((item) => [item.id, item]));
    const exercicios = ordem
      .map((id) => porId.get(id))
      .filter((item): item is ExercicioFicha => Boolean(item))
      .filter((item) => !personalizacaoAtual?.exerciciosOcultos.includes(item.id))
      .map((item) => ({ ...item, ...personalizacaoAtual?.ajustes[item.id] }));
    return { ...treinoBase, exercicios };
  }, [personalizacaoAtual, treinoBase]);

  useEffect(() => {
    setSessoesSalvas(carregarSessoesTreino());
    setPersonalizacoes(carregarTreinosPersonalizados());
  }, []);
  useEffect(() => {
    if (!descansoAte) return;
    const intervalo = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(intervalo);
  }, [descansoAte]);

  function seriesPreenchidas(exercicioId: string) {
    return sessao?.exercicios[exercicioId]?.series.filter(
      (serie) => serie.cargaKg !== undefined || serie.repeticoes !== undefined
    ).length ?? 0;
  }

  const totalExerciciosConcluidos = treinoAtual.exercicios.filter(
    (exercicio) => seriesPreenchidas(exercicio.id) >= exercicio.series
  ).length;
  const progressoTreino = Math.round(
    (totalExerciciosConcluidos / treinoAtual.exercicios.length) * 100
  );

  function iniciarTreino() {
    setSessao({
      id: `sessao-${Date.now()}`,
      treinoId: treinoAtual.id,
      treinoNome: `Treino ${treinoAtual.letra} · ${treinoAtual.nome}`,
      iniciadaEm: new Date().toISOString(),
      exercicios: {},
    });
  }

  function atualizarSerie(exercicioId: string, exercicioNome: string, indice: number, campo: keyof SerieRegistrada, valor: string) {
    if (!sessao) return;
    const numero = valor === "" ? undefined : Number(valor);
    const anterior = sessao.exercicios[exercicioId]?.series ?? [];
    const series = [...anterior];
    series[indice] = { ...series[indice], [campo]: Number.isFinite(numero) ? numero : undefined };
    const proxima = {
      ...sessao,
      exercicios: {
        ...sessao.exercicios,
        [exercicioId]: { exercicioId, exercicioNome, series },
      },
    };
    setSessao(proxima);
  }

  function iniciarDescanso(texto: string) {
    const segundos = Number(texto.replace(/\D/g, "")) || 60;
    setAgora(Date.now());
    setDescansoAte(Date.now() + segundos * 1000);
  }

  function finalizarTreino() {
    if (!sessao) return;
    const finalizada = { ...sessao, finalizadaEm: new Date().toISOString() };
    salvarSessaoTreino(finalizada);
    setSessoesSalvas((atual) => [finalizada, ...atual.filter((item) => item.id !== finalizada.id)]);
    setSessao(null);
    setDescansoAte(null);
  }

  function salvarPersonalizacao(proxima: TreinoPersonalizado) {
    salvarTreinoPersonalizado(proxima);
    setPersonalizacoes((atual) => {
      const semAtual = atual.filter((item) => item.treinoId !== proxima.treinoId);
      return [...semAtual, proxima];
    });
  }

  function obterPersonalizacaoEditavel(): TreinoPersonalizado {
    return personalizacaoAtual ?? {
      treinoId: treinoBase.id,
      ordemExercicios: treinoBase.exercicios.map((item) => item.id),
      exerciciosOcultos: [],
      ajustes: {},
    };
  }

  function atualizarAjuste(exercicioId: string, campo: keyof TreinoPersonalizado["ajustes"][string], valor: string) {
    const base = obterPersonalizacaoEditavel();
    const valorAjustado = campo === "series" || campo === "cargaSugeridaKg"
      ? (valor === "" ? undefined : Number(valor))
      : valor;
    salvarPersonalizacao({
      ...base,
      ajustes: {
        ...base.ajustes,
        [exercicioId]: { ...base.ajustes[exercicioId], [campo]: valorAjustado },
      },
    });
  }

  function moverExercicio(exercicioId: string, direcao: -1 | 1) {
    const base = obterPersonalizacaoEditavel();
    const indice = base.ordemExercicios.indexOf(exercicioId);
    const destino = indice + direcao;
    if (indice < 0 || destino < 0 || destino >= base.ordemExercicios.length) return;
    const ordem = [...base.ordemExercicios];
    [ordem[indice], ordem[destino]] = [ordem[destino]!, ordem[indice]!];
    salvarPersonalizacao({ ...base, ordemExercicios: ordem });
  }

  function ocultarExercicio(exercicioId: string) {
    const base = obterPersonalizacaoEditavel();
    salvarPersonalizacao({ ...base, exerciciosOcultos: [...base.exerciciosOcultos, exercicioId] });
  }

  function restaurarFicha() {
    removerTreinoPersonalizado(treinoBase.id);
    setPersonalizacoes((atual) => atual.filter((item) => item.treinoId !== treinoBase.id));
    setModoEdicao(false);
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
              disabled={Boolean(sessao)}
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
            {sessao ? (
              <button type="button" className={styles.botaoFinalizar} onClick={finalizarTreino}>
                Finalizar treino
              </button>
            ) : (
              <div className={styles.acoesTreino}>
                <button type="button" className={styles.botaoEditar} onClick={() => setModoEdicao((atual) => !atual)}>
                  {modoEdicao ? "Concluir edição" : "Personalizar treino"}
                </button>
                <button type="button" className={styles.botaoIniciar} onClick={iniciarTreino}>
                  Iniciar treino
                </button>
              </div>
            )}
          </div>

          {modoEdicao && !sessao && (
            <div className={styles.avisoEdicao}>
              <span>Você está editando sua versão pessoal da ficha. A prescrição original permanece preservada.</span>
              {personalizacaoAtual && <button type="button" onClick={restaurarFicha}>Restaurar ficha original</button>}
            </div>
          )}

          {descansoAte && (
            <div className={styles.descansoAtivo} role="status">
              Descanso: {Math.max(0, Math.ceil((descansoAte - agora) / 1000))}s
              <button type="button" onClick={() => setDescansoAte(null)}>Encerrar</button>
            </div>
          )}

          <ul className={styles.listaExercicios}>
            {treinoAtual.exercicios.map((exercicio, indice) => (
              <li key={exercicio.id} className={`${styles.exercicio} ${
                seriesPreenchidas(exercicio.id) >= exercicio.series ? styles.exercicioConcluido : ""
              }`}>
                <span className={styles.ordemExercicio}>{exercicio.series}×</span>
                <div className={styles.infoExercicio}>
                  <span className={styles.tagGrupo}>
                    {formatarGrupoMuscular(exercicio.grupoMuscular)}
                  </span>
                  <span className={styles.nomeExercicio}>{exercicio.nome}</span>
                  {(() => {
                    const ultimo = sessoesSalvas.find((item) => Boolean(item.finalizadaEm) && Boolean(item.exercicios[exercicio.id]?.series.length));
                    const carga = ultimo?.exercicios[exercicio.id]?.series.at(-1)?.cargaKg;
                    return carga ? <small className={styles.ultimaVez}>Última vez: {carga} kg</small> : null;
                  })()}
                </div>
                <div className={styles.metasExercicio}>
                  <span>{exercicio.series} séries</span>
                  <span>{exercicio.repeticoes} reps</span>
                  {exercicio.cargaSugeridaKg && <span>{exercicio.cargaSugeridaKg} kg</span>}
                  <span className={styles.descanso}>{exercicio.descanso}</span>
                </div>
                {modoEdicao && !sessao && (
                  <div className={styles.editorExercicio}>
                    <div className={styles.camposEdicao}>
                      <label>Séries<input type="number" min="1" max="10" value={exercicio.series} onChange={(evento) => atualizarAjuste(exercicio.id, "series", evento.target.value)} /></label>
                      <label>Repetições<input value={exercicio.repeticoes} onChange={(evento) => atualizarAjuste(exercicio.id, "repeticoes", evento.target.value)} /></label>
                      <label>Carga (kg)<input type="number" min="0" step="0.5" value={exercicio.cargaSugeridaKg ?? ""} onChange={(evento) => atualizarAjuste(exercicio.id, "cargaSugeridaKg", evento.target.value)} /></label>
                      <label>Descanso<input value={exercicio.descanso} onChange={(evento) => atualizarAjuste(exercicio.id, "descanso", evento.target.value)} /></label>
                    </div>
                    <div className={styles.acoesEditor}>
                      <button type="button" disabled={indice === 0} onClick={() => moverExercicio(exercicio.id, -1)}>Mover acima</button>
                      <button type="button" disabled={indice === treinoAtual.exercicios.length - 1} onClick={() => moverExercicio(exercicio.id, 1)}>Mover abaixo</button>
                      <button type="button" className={styles.acaoPerigosa} onClick={() => ocultarExercicio(exercicio.id)}>Ocultar exercício</button>
                    </div>
                  </div>
                )}
                {sessao && (
                  <div className={styles.seriesRegistradas}>
                    {Array.from({ length: exercicio.series }).map((_, indice) => {
                      const serie = sessao.exercicios[exercicio.id]?.series[indice] ?? {};
                      return (
                        <div className={styles.linhaSerie} key={indice}>
                          <strong>{indice + 1}</strong>
                          <label>Carga<input aria-label={`Carga da série ${indice + 1} de ${exercicio.nome}`} type="number" min="0" step="0.5" placeholder={String(exercicio.cargaSugeridaKg ?? "kg")} value={serie.cargaKg ?? ""} onChange={(evento) => atualizarSerie(exercicio.id, exercicio.nome, indice, "cargaKg", evento.target.value)} /></label>
                          <label>Reps<input aria-label={`Repetições da série ${indice + 1} de ${exercicio.nome}`} type="number" min="0" placeholder="reps" value={serie.repeticoes ?? ""} onChange={(evento) => atualizarSerie(exercicio.id, exercicio.nome, indice, "repeticoes", evento.target.value)} /></label>
                          <label>RPE<input aria-label={`RPE da série ${indice + 1} de ${exercicio.nome}`} type="number" min="1" max="10" placeholder="1–10" value={serie.rpe ?? ""} onChange={(evento) => atualizarSerie(exercicio.id, exercicio.nome, indice, "rpe", evento.target.value)} /></label>
                          <button type="button" className={styles.botaoDescanso} onClick={() => iniciarDescanso(exercicio.descanso)}>Descansar</button>
                        </div>
                      );
                    })}
                  </div>
                )}
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
