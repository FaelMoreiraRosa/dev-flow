import { isUniqueConstraintViolation } from '@prisma/orm-family-sql/errors';
import { criarUsuarioSchema } from '../validations/usuario.ts';

type DadosUsuario = {
  nome: string;
  email: string;
  senha: string;
};

type UsuarioPublico = {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
};

type DependenciasCadastro = {
  hashSenha: (senha: string) => Promise<string>;
  criarUsuario: (dados: DadosUsuario) => Promise<UsuarioPublico>;
};

const respostaDadosInvalidos = () =>
  Response.json({ erro: 'Os dados enviados são inválidos.' }, { status: 400 });

export function criarHandlerCadastroUsuario(dependencias: DependenciasCadastro) {
  return async function POST(request: Request): Promise<Response> {
    let corpo: unknown;

    try {
      corpo = await request.json();
    } catch {
      return respostaDadosInvalidos();
    }

    const validacao = criarUsuarioSchema.safeParse(corpo);
    if (!validacao.success) {
      return respostaDadosInvalidos();
    }

    try {
      const senha = await dependencias.hashSenha(validacao.data.senha);
      const usuario = await dependencias.criarUsuario({
        nome: validacao.data.nome,
        email: validacao.data.email,
        senha,
      });

      return Response.json({ usuario }, { status: 201 });
    } catch (erro) {
      if (isUniqueConstraintViolation(erro)) {
        return Response.json(
          { erro: 'Já existe um usuário cadastrado com este email.' },
          { status: 409 },
        );
      }

      // Não registrar o erro bruto: driver e query podem incluir dados sensíveis.
      console.error('Falha inesperada ao cadastrar usuário.');
      return Response.json(
        { erro: 'Não foi possível cadastrar o usuário.' },
        { status: 500 },
      );
    }
  };
}
