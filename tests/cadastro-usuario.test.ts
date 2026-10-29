import assert from 'node:assert/strict';
import { test } from 'node:test';
import { SqlQueryError } from '@prisma/orm-family-sql/errors';
import { criarHandlerCadastroUsuario } from '../src/usuarios/cadastro.ts';
import { hashSenha } from '../src/usuarios/senha.ts';

const dadosValidos = {
  nome: '  Ana Dev  ',
  email: '  ANA@EXAMPLE.COM  ',
  senha: 'senha-super-segura',
};

function requisicao(corpo: string): Request {
  return new Request('http://localhost/api/usuarios', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: corpo,
  });
}

test('retorna 400 para JSON inválido sem chamar hash nem persistência', async () => {
  let chamadas = 0;
  const post = criarHandlerCadastroUsuario({
    hashSenha: async () => {
      chamadas++;
      return 'hash';
    },
    criarUsuario: async () => {
      chamadas++;
      throw new Error('não deveria persistir');
    },
  });

  const resposta = await post(requisicao('{'));

  assert.equal(resposta.status, 400);
  assert.equal(chamadas, 0);
});

test('retorna 400 para dados inválidos sem chamar hash nem persistência', async () => {
  let chamadas = 0;
  const post = criarHandlerCadastroUsuario({
    hashSenha: async () => {
      chamadas++;
      return 'hash';
    },
    criarUsuario: async () => {
      chamadas++;
      throw new Error('não deveria persistir');
    },
  });

  const resposta = await post(requisicao(JSON.stringify({ email: 'invalido' })));

  assert.equal(resposta.status, 400);
  assert.equal(chamadas, 0);
});

test('normaliza email, persiste somente o hash e retorna os campos públicos', async () => {
  let dadosPersistidos: Record<string, unknown> | undefined;
  const post = criarHandlerCadastroUsuario({
    hashSenha: async (senha) => {
      assert.equal(senha, dadosValidos.senha);
      return '$argon2id$hash-de-teste';
    },
    criarUsuario: async (dados) => {
      dadosPersistidos = dados;
      return {
        id: 17,
        nome: dados.nome,
        email: dados.email,
        createdAt: '2026-10-29T12:00:00.000Z',
      };
    },
  });

  const resposta = await post(requisicao(JSON.stringify(dadosValidos)));
  const corpo = (await resposta.json()) as { usuario: Record<string, unknown> };

  assert.equal(resposta.status, 201);
  assert.deepEqual(dadosPersistidos, {
    nome: 'Ana Dev',
    email: 'ana@example.com',
    senha: '$argon2id$hash-de-teste',
  });
  assert.deepEqual(corpo.usuario, {
    id: 17,
    nome: 'Ana Dev',
    email: 'ana@example.com',
    createdAt: '2026-10-29T12:00:00.000Z',
  });
  assert.equal(JSON.stringify(corpo).includes(dadosValidos.senha), false);
  assert.equal(JSON.stringify(corpo).includes('$argon2id$hash-de-teste'), false);
});

test('converte violação de unicidade do PostgreSQL em HTTP 409', async () => {
  const post = criarHandlerCadastroUsuario({
    hashSenha: async () => '$argon2id$hash-de-teste',
    criarUsuario: async () => {
      throw new SqlQueryError('unique violation', { sqlState: '23505' });
    },
  });

  const resposta = await post(requisicao(JSON.stringify(dadosValidos)));

  assert.equal(resposta.status, 409);
  assert.deepEqual(await resposta.json(), {
    erro: 'Já existe um usuário cadastrado com este email.',
  });
});

test('retorna erro genérico para falhas inesperadas', async () => {
  const logOriginal = console.error;
  console.error = () => {};

  try {
    const post = criarHandlerCadastroUsuario({
      hashSenha: async () => '$argon2id$hash-de-teste',
      criarUsuario: async () => {
        throw new Error('segredo interno');
      },
    });

    const resposta = await post(requisicao(JSON.stringify(dadosValidos)));

    assert.equal(resposta.status, 500);
    assert.deepEqual(await resposta.json(), {
      erro: 'Não foi possível cadastrar o usuário.',
    });
  } finally {
    console.error = logOriginal;
  }
});

test('gera e verifica hash Argon2id', async () => {
  const senhaHash = await hashSenha(dadosValidos.senha);

  assert.match(senhaHash, /^\$argon2id\$/);
  assert.notEqual(senhaHash, dadosValidos.senha);
  const argon2 = await import('argon2');
  assert.equal(await argon2.verify(senhaHash, dadosValidos.senha), true);
});
