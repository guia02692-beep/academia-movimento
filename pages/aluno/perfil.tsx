import { FormEvent, useEffect, useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { useUsuario } from "@/hooks/useUsuario";
import { NivelExperiencia, ObjetivoTreino } from "@/types";
import { formatarNivel, formatarObjetivo } from "@/utils/formatters";
import styles from "./perfil.module.css";

const objetivos: ObjetivoTreino[] = ["emagrecimento", "hipertrofia", "condicionamento", "saude-geral", "performance"];
const niveis: NivelExperiencia[] = ["iniciante", "intermediario", "avancado"];

export default function Perfil() {
  const { usuario, carregando, salvarUsuario, salvarPerfilAluno } = useUsuario();
  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState({ nome: "", email: "", celular: "", endereco: "", alturaCm: "", pesoKg: "", objetivo: "", nivel: "", dias: "", restricoes: "" });

  useEffect(() => {
    const perfil = usuario?.perfilAluno;
    setDados({
      nome: usuario?.nome ?? "", email: usuario?.email ?? "", celular: usuario?.celular ?? "", endereco: usuario?.endereco ?? "",
      alturaCm: perfil?.alturaCm ? String(perfil.alturaCm) : "", pesoKg: perfil?.pesoKg ? String(perfil.pesoKg) : "",
      objetivo: perfil?.objetivo ?? "", nivel: perfil?.nivelExperiencia ?? "", dias: perfil?.diasPorSemana ? String(perfil.diasPorSemana) : "", restricoes: perfil?.restricoes ?? "",
    });
  }, [usuario]);

  if (carregando) return null;
  const perfil = usuario?.perfilAluno;
  const campos = [
    ["Nome", usuario?.nome || "Não informado"], ["E-mail", usuario?.email || "Não informado"],
    ["Celular", usuario?.celular || "Não informado"], ["Endereço", usuario?.endereco || "Não informado"],
    ["Altura", perfil?.alturaCm ? `${perfil.alturaCm} cm` : "Não informado"], ["Peso", perfil?.pesoKg ? `${perfil.pesoKg} kg` : "Não informado"],
    ["Objetivo", formatarObjetivo(perfil?.objetivo)], ["Perfil de treino", formatarNivel(perfil?.nivelExperiencia)],
    ["Frequência", perfil?.diasPorSemana ? `${perfil.diasPorSemana}x por semana` : "Não informado"], ["Restrições", perfil?.restricoes || "Nenhuma informada"],
  ];

  function salvar(evento: FormEvent) {
    evento.preventDefault();
    salvarUsuario({ nome: dados.nome.trim(), email: dados.email.trim(), celular: dados.celular.trim() || undefined, endereco: dados.endereco.trim() || undefined });
    salvarPerfilAluno({
      alturaCm: dados.alturaCm ? Number(dados.alturaCm) : undefined, pesoKg: dados.pesoKg ? Number(dados.pesoKg) : undefined,
      objetivo: (dados.objetivo || undefined) as ObjetivoTreino | undefined, nivelExperiencia: (dados.nivel || undefined) as NivelExperiencia | undefined,
      diasPorSemana: dados.dias ? Number(dados.dias) : undefined, restricoes: dados.restricoes.trim() || undefined,
    });
    setEditando(false);
  }
  const alterar = (campo: keyof typeof dados, valor: string) => setDados((atual) => ({ ...atual, [campo]: valor }));

  return <Layout perfil="aluno" nomeUsuario={usuario?.nome || "Atleta"}>
    <section className={styles.cabecalho}><div><p>CONTA E PREFERÊNCIAS</p><h1>Meu perfil</h1><span>Confira seus dados e escolha quando quiser atualizá-los.</span></div>
      {!editando && <Button onClick={() => setEditando(true)}>Editar meus dados</Button>}
    </section>
    {!editando ? <>
      <Card><div className={styles.pergunta}><strong>Deseja editar alguma informação?</strong><span>Você pode manter estes dados como estão ou atualizar somente o que precisar.</span><Button variante="secundario" onClick={() => setEditando(true)}>Sim, editar dados</Button></div></Card>
      <section className={styles.grade}>{campos.map(([rotulo, valor]) => <Card key={rotulo}><span className={styles.rotulo}>{rotulo}</span><strong className={styles.valor}>{valor}</strong></Card>)}</section>
    </> : <form className={styles.formulario} onSubmit={salvar}><Card titulo="Editar dados pessoais"><div className={styles.gradeCampos}>
      <label>Nome<input required value={dados.nome} onChange={(e) => alterar("nome", e.target.value)} /></label><label>E-mail<input required type="email" value={dados.email} onChange={(e) => alterar("email", e.target.value)} /></label>
      <label>Celular<input type="tel" value={dados.celular} onChange={(e) => alterar("celular", e.target.value)} /></label><label>Endereço<input value={dados.endereco} onChange={(e) => alterar("endereco", e.target.value)} /></label>
      <label>Altura (cm)<input type="number" min="100" max="230" value={dados.alturaCm} onChange={(e) => alterar("alturaCm", e.target.value)} /></label><label>Peso (kg)<input type="number" min="30" max="300" step="0.1" value={dados.pesoKg} onChange={(e) => alterar("pesoKg", e.target.value)} /></label>
      <label>Objetivo<select value={dados.objetivo} onChange={(e) => alterar("objetivo", e.target.value)}><option value="">Selecione</option>{objetivos.map((item) => <option key={item} value={item}>{formatarObjetivo(item)}</option>)}</select></label>
      <label>Perfil de treino<select value={dados.nivel} onChange={(e) => alterar("nivel", e.target.value)}><option value="">Selecione</option>{niveis.map((item) => <option key={item} value={item}>{formatarNivel(item)}</option>)}</select></label>
      <label>Treinos por semana<select value={dados.dias} onChange={(e) => alterar("dias", e.target.value)}><option value="">Selecione</option>{[2,3,4,5,6].map((item) => <option key={item} value={item}>{item}x por semana</option>)}</select></label>
      <label className={styles.campoInteiro}>Lesões ou restrições<textarea rows={3} value={dados.restricoes} onChange={(e) => alterar("restricoes", e.target.value)} /></label>
    </div></Card><div className={styles.acoes}><Button type="button" variante="secundario" onClick={() => setEditando(false)}>Cancelar</Button><Button type="submit">Salvar alterações</Button></div></form>}
  </Layout>;
}
