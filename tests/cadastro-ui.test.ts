import assert from 'node:assert/strict';
import { test } from 'node:test';
import { enviarCadastroUsuario } from '../src/usuarios/api.ts';

const dadosCadastro = {
  nome: 'Ana Dev',
  email: 'ana@example.com',
  senha: 'senha-segura-de-teste',
};

test('envia os campos esperados e reconhece HTTP 201', async () => {
  let urlRecebida: RequestInfo | URL | undefined;
  let opcoesRecebidas: RequestInit | undefined;

  const resultado = await enviarCadastroUsuario(dadosCadastro, async (url, opcoes) => {
    urlRecebida = url;
    opcoesRecebidas = opcoes;
    return Response.json(
      {
        usuario: {
          id: 3,
          nome: dadosCadastro.nome,
          email: dadosCadastro.email,
          createdAt: '2026-10-29T12:00:00.000Z',
        },
      },
      { status: 201 },
    );
  });

  assert.equal(urlRecebida, '/api/usuarios');
  assert.equal(opcoesRecebidas?.method, 'POST');
  assert.deepEqual(opcoesRecebidas?.headers, { 'Content-Type': 'application/json' });
  assert.deepEqual(JSON.parse(String(opcoesRecebidas?.body)), dadosCadastro);
  assert.deepEqual(resultado, { tipo: 'sucesso' });
});

test('mapeia HTTP 400 para erro de validação', async () => {
  const resultado = await enviarCadastroUsuario(dadosCadastro, async () =>
    Response.json({ erro: 'Os dados enviados são inválidos.' }, { status: 400 }),
  );

  assert.deepEqual(resultado, { tipo: 'validacao' });
});

test('usa a mensagem da API para email duplicado em HTTP 409', async () => {
  const resultado = await enviarCadastroUsuario(dadosCadastro, async () =>
    Response.json({ erro: 'Já existe um usuário cadastrado com este email.' }, { status: 409 }),
  );

  assert.deepEqual(resultado, {
    tipo: 'duplicado',
    mensagem: 'Já existe um usuário cadastrado com este email.',
  });
});

test('mapeia erros HTTP inesperados sem exibir detalhes internos', async () => {
  const resultado = await enviarCadastroUsuario(dadosCadastro, async () =>
    Response.json({ erro: 'detalhe interno do servidor' }, { status: 500 }),
  );

  assert.deepEqual(resultado, { tipo: 'servidor' });
  assert.equal(JSON.stringify(resultado).includes('detalhe interno'), false);
});

test('mapeia falha de rede sem simular sucesso', async () => {
  const resultado = await enviarCadastroUsuario(dadosCadastro, async () => {
    throw new TypeError('network failure');
  });

  assert.deepEqual(resultado, { tipo: 'rede' });
});
