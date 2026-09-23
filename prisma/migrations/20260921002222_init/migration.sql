-- CreateEnum
CREATE TYPE "Plano" AS ENUM ('FIT', 'SMART', 'BLACK');

-- CreateEnum
CREATE TYPE "StatusAluno" AS ENUM ('ATIVO', 'ATENCAO', 'INATIVO');

-- CreateEnum
CREATE TYPE "Objetivo" AS ENUM ('HIPERTROFIA', 'EMAGRECIMENTO', 'CONDICIONAMENTO', 'SAUDE');

-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO');

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plano" "Plano" NOT NULL DEFAULT 'FIT',
    "status" "StatusAluno" NOT NULL DEFAULT 'ATIVO',
    "pesoKg" DOUBLE PRECISION,
    "alturaCm" INTEGER,
    "objetivo" "Objetivo",
    "nivel" "Nivel",
    "diasTreino" INTEGER[],
    "ultimoAcesso" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
