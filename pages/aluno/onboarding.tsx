import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useUsuario } from "@/hooks/useUsuario";
import {
  NivelExperiencia,
  ObjetivoTreino,
  SexoBiologico,
} from "@/types";
import styles from "./onboarding.module.css";

const TOTAL_ETAPAS = 3;

const OPCOES_SEXO: { valor: SexoBiologico; rotulo: string }[] = [
  { valor: "masculino", rotulo: "Masculino" },
  { valor: "feminino", rotulo: "Feminino" },
  { valor: "prefiro-nao-informar", rotulo: "Prefiro não informar" },
];

const OPCOES_OBJETIVO: { valor: ObjetivoTreino; rotulo: string; descricao: string }[] = [
  { valor: "emagrecimento", rotulo: "Emagrecimento", descricao: "Reduzir % de gordura" },
  { valor: "hipertrofia", rotulo: "Ganho de massa", descricao: "Aumentar músculo" },
  { valor: "condicionamento", rotulo: "Condicionamento", descricao: "Resistência e fôlego" },
  { valor: "saude-geral", rotulo: "Saúde geral", descricao: "Bem-estar e disposição" },
  { valor: "performance", rotulo: "Performance", descricao: "Evoluir em um esporte" },
];

const OPCOES_NIVEL: { valor: NivelExperiencia; rotulo: string; descricao: string }[] = [
  { valor: "iniciante", rotulo: "Iniciante", descricao: "Comecei agora ou vou começar" },
  { valor: "intermediario", rotulo: "Intermediário", descricao: "Treino há alguns meses" },
  { valor: "avancado", rotulo: "Avançado", descricao: "Treino há anos com consistência" },
];

const OPCOES_DIAS = [2, 3, 4, 5, 6];

export default function OnboardingAluno() {
  const router = useRouter();
  const { usuario, carregando, salvarUsuario, salvarPerfilAluno } = useUsuario();
  const [etapa, setEtapa] = useState(1);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState<SexoBiologico | undefined>(undefined);
  const [pesoKg, setPesoKg] = useState("");
  const [alturaCm, setAlturaCm] = useState("");
  const [objetivo, setObjetivo] = useState<ObjetivoTreino | undefined>(undefined);
  const [nivelExperiencia, setNivelExperiencia] = useState<NivelExperiencia | undefined>(undefined);
  const [diasPorSemana, setDiasPorSemana] = useState<number | undefined>(undefined);
  const [restricoes, setRestricoes] = useState("");

  // Pré-preenche com o que já existir (permite reabrir esta tela para
  // editar os dados depois, a partir do menu "Meu perfil").
  useEffect(() => {
    if (!usuario) return;
    setNome((atual) => atual || usuario.nome || "");
    if (usuario.perfilAluno) {
      const p = usuario.perfilAluno;
      setIdade((atual) => atual || (p.idade ? String(p.idade) : ""));
      setSexo((atual) => atual ?? p.sexo);
      setPesoKg((atual) => atual || (p.pesoKg ? String(p.pesoKg) : ""));
      setAlturaCm((atual) => atual || (p.alturaCm ? String(p.alturaCm) : ""));
      setObjetivo((atual) => atual ?? p.objetivo);
      setNivelExperiencia((atual) => atual ?? p.nivelExperiencia);
      setDiasPorSemana((atual) => atual ?? p.diasPorSemana);
      setRestricoes((atual) => atual || p.restricoes || "");
    }
  }, [usuario]);

  if (carregando) return null;

  const etapaValida =
    etapa === 1
      ? nome.trim().length > 1
      : etapa === 2
      ? true
      : Boolean(objetivo && nivelExperiencia && diasPorSemana);

  function irParaProximaEtapa() {
    if (!etapaValida) return;
    setEtapa((atual) => Math.min(atual + 1, TOTAL_ETAPAS));
  }

  function voltarEtapa() {
    setEtapa((atual) => Math.max(atual - 1, 1));
  }

  function finalizar(evento: FormEvent) {
    evento.preventDefault();
    if (!etapaValida) return;

    salvarUsuario({ nome: nome.trim() });
    salvarPerfilAluno({
      idade: idade ? Number(idade) : undefined,
      sexo,
      pesoKg: pesoKg ? Number(pesoKg) : undefined,
      alturaCm: alturaCm ? Number(alturaCm) : undefined,
      objetivo,
      nivelExperiencia,
      diasPorSemana,
      restricoes: restricoes.trim() || undefined,
    });

    router.push("/aluno/dashboard");
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.cartao} onSubmit={finalizar}>
        <div className={styles.progresso}>
          <span className={styles.sobrancelha}>PERSONALIZAR TREINO · {etapa}/{TOTAL_ETAPAS}</span>
          <div className={styles.barraEtapas}>
            {Array.from({ length: TOTAL_ETAPAS }).map((_, indice) => (
              <span
                key={indice}
                className={`${styles.segmento} ${indice < etapa ? styles.segmentoAtivo : ""}`}
              />
            ))}
          </div>
        </div>

        {etapa === 1 && (
          <Etapa
            titulo="Antes de tudo, como podemos te chamar?"
            subtitulo="Vamos usar isso em toda a sua experiência no app."
          >
            <Input
              rotulo="Nome completo"
              name="nome"
              placeholder="Seu nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              required
            />
            <div className={styles.grade2}>
              <Input
                rotulo="Idade (opcional)"
                name="idade"
                type="number"
                min={10}
                max={100}
                placeholder="Ex.: 28"
                value={idade}
                onChange={(evento) => setIdade(evento.target.value)}
              />
              <div className={styles.grupoChips}>
                <span className={styles.rotuloChips}>Sexo (opcional)</span>
                <div className={styles.chips}>
                  {OPCOES_SEXO.map((opcao) => (
                    <button
                      type="button"
                      key={opcao.valor}
                      className={`${styles.chip} ${sexo === opcao.valor ? styles.chipAtivo : ""}`}
                      onClick={() => setSexo(opcao.valor)}
                    >
                      {opcao.rotulo}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Etapa>
        )}

        {etapa === 2 && (
          <Etapa
            titulo="Um pouco sobre o seu corpo"
            subtitulo="Usamos isso para calcular seu IMC e ajustar cargas sugeridas nos treinos."
          >
            <div className={styles.grade2}>
              <Input
                rotulo="Peso atual (kg)"
                name="peso"
                type="number"
                min={30}
                max={300}
                step="0.1"
                placeholder="Ex.: 72"
                value={pesoKg}
                onChange={(evento) => setPesoKg(evento.target.value)}
              />
              <Input
                rotulo="Altura (cm)"
                name="altura"
                type="number"
                min={100}
                max={230}
                placeholder="Ex.: 175"
                value={alturaCm}
                onChange={(evento) => setAlturaCm(evento.target.value)}
              />
            </div>
            <p className={styles.dica}>
              Sem balança por perto? Sem problema — você pode pular esta etapa e preencher depois em &quot;Meu perfil&quot;.
            </p>
          </Etapa>
        )}

        {etapa === 3 && (
          <Etapa
            titulo="Qual é o seu objetivo?"
            subtitulo="Isso define sua ficha de musculação e as sugestões do seu painel."
          >
            <div className={styles.grupoChips}>
              <span className={styles.rotuloChips}>Objetivo principal</span>
              <div className={styles.chips}>
                {OPCOES_OBJETIVO.map((opcao) => (
                  <button
                    type="button"
                    key={opcao.valor}
                    className={`${styles.chipGrande} ${objetivo === opcao.valor ? styles.chipAtivo : ""}`}
                    onClick={() => setObjetivo(opcao.valor)}
                  >
                    <strong>{opcao.rotulo}</strong>
                    <small>{opcao.descricao}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.grupoChips}>
              <span className={styles.rotuloChips}>Nível de experiência</span>
              <div className={styles.chips}>
                {OPCOES_NIVEL.map((opcao) => (
                  <button
                    type="button"
                    key={opcao.valor}
                    className={`${styles.chipGrande} ${nivelExperiencia === opcao.valor ? styles.chipAtivo : ""}`}
                    onClick={() => setNivelExperiencia(opcao.valor)}
                  >
                    <strong>{opcao.rotulo}</strong>
                    <small>{opcao.descricao}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.grupoChips}>
              <span className={styles.rotuloChips}>Dias de treino por semana</span>
              <div className={styles.chips}>
                {OPCOES_DIAS.map((dias) => (
                  <button
                    type="button"
                    key={dias}
                    className={`${styles.chip} ${diasPorSemana === dias ? styles.chipAtivo : ""}`}
                    onClick={() => setDiasPorSemana(dias)}
                  >
                    {dias}x
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.rotuloTextarea} htmlFor="restricoes">
              Lesões ou restrições (opcional)
            </label>
            <textarea
              id="restricoes"
              className={styles.textarea}
              placeholder="Ex.: dor no ombro direito, evitar impacto no joelho..."
              value={restricoes}
              onChange={(evento) => setRestricoes(evento.target.value)}
              rows={3}
            />
          </Etapa>
        )}

        <div className={styles.acoes}>
          {etapa > 1 ? (
            <Button type="button" variante="secundario" onClick={voltarEtapa}>
              Voltar
            </Button>
          ) : (
            <span />
          )}

          {etapa < TOTAL_ETAPAS ? (
            <Button type="button" onClick={irParaProximaEtapa} disabled={!etapaValida}>
              Continuar
            </Button>
          ) : (
            <Button type="submit" disabled={!etapaValida}>
              Concluir e ver meu painel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Etapa({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.etapa}>
      <h1 className={styles.titulo}>{titulo}</h1>
      <p className={styles.subtitulo}>{subtitulo}</p>
      <div className={styles.campos}>{children}</div>
    </div>
  );
}
