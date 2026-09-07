import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { PerfilUsuario } from "@/types";
import { useUsuario } from "@/hooks/useUsuario";
import styles from "./index.module.css";

type ModoFormulario = "login" | "cadastro";

// Credenciais de teste: usando este e-mail e senha específicos, entra
// direto no dashboard com um perfil já preenchido, sem passar pelo
// onboarding — só para agilizar testes. Qualquer outro e-mail/senha
// segue o fluxo normal (onboarding na primeira vez, dados no localStorage).
const EMAIL_TESTE = "teste@academiamovimento.com";
const SENHA_TESTE = "teste123";

export default function PaginaLogin() {
  const router = useRouter();
  const { salvarUsuario, salvarPerfilAluno } = useUsuario();
  const [modo, setModo] = useState<ModoFormulario>("login");
  const [perfil, setPerfil] = useState<PerfilUsuario>("aluno");

  // Envio mockado: não há autenticação real nesta entrega. Guardamos o
  // nome e o e-mail informados e, para alunos que ainda não passaram
  // pelo questionário inicial, seguimos para o onboarding antes do
  // dashboard — é ali que coletamos as informações que personalizam
  // o app (hoje esses dados não existiam e todo aluno era "Vitor").
  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dadosFormulario = new FormData(evento.currentTarget);
    const nomeDigitado = (dadosFormulario.get("nome") as string | null)?.trim();
    const email = (dadosFormulario.get("email") as string | null)?.trim() ?? "";
    const senha = (dadosFormulario.get("senha") as string | null) ?? "";

    if (
      perfil === "aluno" &&
      email.toLowerCase() === EMAIL_TESTE &&
      senha === SENHA_TESTE
    ) {
      salvarUsuario({ nome: "Aluno Teste", email, perfil: "aluno" });
      salvarPerfilAluno({
        idade: 27,
        sexo: "prefiro-nao-informar",
        pesoKg: 78,
        alturaCm: 178,
        objetivo: "hipertrofia",
        nivelExperiencia: "intermediario",
        diasPorSemana: 4,
      });
      router.push("/aluno/dashboard");
      return;
    }

    const usuarioAtualizado = salvarUsuario({
      ...(nomeDigitado ? { nome: nomeDigitado } : {}),
      email,
      perfil,
    });

    if (perfil === "admin") {
      router.push("/admin/dashboard");
      return;
    }

    router.push(
      usuarioAtualizado.onboardingCompleto ? "/aluno/dashboard" : "/aluno/onboarding"
    );
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.cartao}>
        <h1 className={styles.titulo}>Academia Movimento</h1>
        <p className={styles.subtitulo}>
          {modo === "login" ? "Acesse sua conta" : "Crie sua conta"}
        </p>

        <div className={styles.seletorPerfil} role="tablist" aria-label="Perfil de acesso">
          <button
            type="button"
            role="tab"
            aria-selected={perfil === "aluno"}
            className={`${styles.abaPerfil} ${perfil === "aluno" ? styles.abaAtiva : ""}`}
            onClick={() => setPerfil("aluno")}
          >
            Aluno
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={perfil === "admin"}
            className={`${styles.abaPerfil} ${perfil === "admin" ? styles.abaAtiva : ""}`}
            onClick={() => setPerfil("admin")}
          >
            Admin
          </button>
        </div>

        <form className={styles.formulario} onSubmit={aoEnviar}>
          {modo === "cadastro" && (
            <Input rotulo="Nome completo" name="nome" placeholder="Seu nome" required />
          )}
          <Input rotulo="E-mail" name="email" type="email" placeholder="voce@email.com" required />
          <Input rotulo="Senha" name="senha" type="password" placeholder="••••••••" required />

          <Button type="submit" larguraTotal>
            {modo === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          className={styles.alternarModo}
          onClick={() => setModo(modo === "login" ? "cadastro" : "login")}
        >
          {modo === "login"
            ? "Ainda não tem conta? Cadastre-se"
            : "Já tem conta? Faça login"}
        </button>

        {perfil === "aluno" && (
          <p className={styles.dicaTeste}>
            Teste rápido: <strong>{EMAIL_TESTE}</strong> / <strong>{SENHA_TESTE}</strong> entra direto no dashboard, sem onboarding.
          </p>
        )}
      </div>
    </div>
  );
}
