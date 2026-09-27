import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/services/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const alunos = await prisma.aluno.findMany({ orderBy: { nome: "asc" } });
    return res.status(200).json(alunos);
  }

  if (req.method === "POST") {
    const { nome, email, plano, pesoKg, alturaCm, objetivo, nivel, diasTreino } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: "nome e email são obrigatórios" });
    }

    try {
      const aluno = await prisma.aluno.create({
        data: { nome, email, plano, pesoKg, alturaCm, objetivo, nivel, diasTreino },
      });
      return res.status(201).json(aluno);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return res.status(409).json({ erro: "e-mail já cadastrado" });
      }
      throw e;
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}