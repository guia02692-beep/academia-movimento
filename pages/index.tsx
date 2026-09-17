import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useUsuario } from "@/hooks/useUsuario";
import styles from "./index.module.css";

const EMAIL_ADMIN = "admin@academiamovimento.com";
const SENHA_ADMIN = "admin123";

export default function PaginaLogin() {
  const router = useRouter();
  const { salvarUsuario } = useUsuario();
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dadosFormulario = new FormData(evento.currentTarget);
    const nomeDigitado = (dadosFormulario.get("nome") as string | null)?.trim();
    const email = (dadosFormulario.get("email") as string | null)?.trim() ?? "";
    const senha = (dadosFormulario.get("senha") as string | null) ?? "";

    if (email.toLowerCase() === EMAIL_ADMIN && senha === SENHA_ADMIN) {
      salvarUsuario({ nome: "Administração", email, perfil: "admin" });
      router.push("/admin/dashboard");
      return;
    }

    salvarUsuario({ ...(nomeDigitado ? { nome: nomeDigitado } : {}), email, perfil: "aluno", onboardingCompleto: false });
    router.push("/aluno/onboarding");
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.cartao}>
        <h1 className={styles.titulo}>Academia Movimento</h1>
        <p className={styles.subtitulo}>
          {modo === "login" ? "Acesse sua conta" : "Crie sua conta"}
        </p>

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
      </div>
    </div>
  );
}
