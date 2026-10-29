import { db } from '../../../src/prisma/db';
import { criarHandlerCadastroUsuario } from '../../../src/usuarios/cadastro';
import { hashSenha } from '../../../src/usuarios/senha';

export const POST = criarHandlerCadastroUsuario({
  hashSenha,
  criarUsuario: (dados) =>
    db.orm.public.Usuario.select('id', 'nome', 'email', 'createdAt').create(dados),
});
