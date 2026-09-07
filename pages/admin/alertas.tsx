import { Layout } from "@/components/Layout/Layout";
import { obterAlertasAdmin } from "@/services/mockData";
import styles from "./sessoes.module.css";

export default function Alertas() {
  const alertas = obterAlertasAdmin();
  return <Layout perfil="admin" nomeUsuario="Equipe Admin"><section className={styles.cabecalho}><div><p className={styles.sobrancelha}>CENTRAL DE ATENÇÃO</p><h1>Alertas</h1><p>Priorize as situações que precisam de acompanhamento da equipe.</p></div><button className={styles.botaoNeutro}>Marcar todos como lidos</button></section><section className={styles.resumo}><div><strong>{alertas.length}</strong><span>alertas abertos</span></div><div><strong>1</strong><span>crítico</span></div><div><strong>2</strong><span>em acompanhamento</span></div></section><section className={styles.listaAlertas}>{alertas.map((alerta) => <article className={`${styles.alerta} ${styles[`alerta_${alerta.nivel}`]}`} key={alerta.id}><span className={styles.iconeAlerta}>{alerta.nivel === "critico" ? "!" : "i"}</span><div><p className={styles.tipoAlerta}>{alerta.nivel}</p><h2>{alerta.titulo}</h2><p>{alerta.descricao}</p></div><button className={styles.botaoTexto}>Ver detalhes</button></article>)}</section></Layout>;
}
