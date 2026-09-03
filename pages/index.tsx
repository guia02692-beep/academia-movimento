import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { PerfilUsuario } from "@/types";
import styles from "./index.module.css";

type ModoFormulario = "login" | "cadastro";

export default function PaginaLogin() {
  const router = useRouter();
  const [modo, setModo] = useState<ModoFormulario>("login");
  const [perfil, setPerfil] = useState<PerfilUsuario>("aluno");

  // Envio mockado: não há autenticação real nesta entrega, apenas
  // navegação para o dashboard do perfil selecionado.
  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    router.push(perfil === "aluno" ? "/aluno/dashboard" : "/admin/dashboard");
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
      </div>
    </div>
  );
}
