import { Layout } from "@/components/Layout/Layout";
import { Card } from "@/components/Card/Card";
import { obterIndicadoresEngajamento, obterAlertasAdmin } from "@/services/mockData";
import styles from "./dashboard.module.css";

const SETA_POR_TENDENCIA: Record<string, string> = {
  alta: "↑",
  baixa: "↓",
  estavel: "→",
};

export default function DashboardAdmin() {
  const indicadores = obterIndicadoresEngajamento();
  const alertas = obterAlertasAdmin();

  return (
    <Layout perfil="admin" nomeUsuario="Equipe Admin">
      <section className={styles.cabecalhoPagina}>
        <div><p className={styles.sobrancelha}>GESTÃO DA UNIDADE</p><h1 className={styles.tituloPagina}>Visão geral da academia</h1><p className={styles.subtitulo}>Indicadores de engajamento e pontos de atenção.</p></div>
        <button className={styles.botaoPeriodo}>Este mês <span>⌄</span></button>
      </section>

      <p className={styles.rotuloBloco}>PANORAMA</p>
      <section className={styles.gradeIndicadores}>
        {indicadores.map((indicador) => (
          <Card key={indicador.id} titulo={indicador.titulo}>
            <p className={styles.indicadorValor}>{indicador.valor}</p>
            <span
              className={`${styles.indicadorVariacao} ${
                styles[`tendencia_${indicador.tendencia}`]
              }`}
            >
              {SETA_POR_TENDENCIA[indicador.tendencia]} {indicador.variacao}
            </span>
          </Card>
        ))}
      </section>

      <div className={styles.cabecalhoAlertas}><div><p className={styles.sobrancelha}>ACOMPANHAMENTO</p><h2 className={styles.tituloSecao}>Alertas recentes</h2></div><span className={styles.contadorAlertas}>{alertas.length} pendentes</span></div>
      <section className={styles.listaAlertas}>
        {alertas.map((alerta) => (
          <Card key={alerta.id} destaque={alerta.nivel === "critico"}>
            <div className={styles.cabecalhoAlerta}>
              <span
                className={`${styles.marcadorNivel} ${styles[`nivel_${alerta.nivel}`]}`}
              />
              <span className={styles.alertaTitulo}>{alerta.titulo}</span>
            </div>
            <p className={styles.alertaDescricao}>{alerta.descricao}</p>
          </Card>
        ))}
      </section>
    </Layout>
  );
}
