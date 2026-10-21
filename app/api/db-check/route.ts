import { db } from "../../../src/prisma/db";

export async function GET() {
  try {
    await db.orm.public.Usuario.aggregate((a) => ({
      total: a.count(),
    }));

    return Response.json({
      conectado: true,
    });
  } catch (error) {
    console.error("Erro ao consultar o banco:", error);

    return Response.json(
      {
        conectado: false,
        erro: "Não foi possível consultar o banco de dados.",
      },
      { status: 500 },
    );
  }
}
