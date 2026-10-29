export type DadosCadastroUsuario = {
  nome: string;
  email: string;
  senha: string;
};

export type ResultadoCadastroUsuario =
  | { tipo: 'sucesso' }
  | { tipo: 'validacao' }
  | { tipo: 'duplicado'; mensagem: string }
  | { tipo: 'servidor' }
  | { tipo: 'rede' };

type RespostaErro = { erro?: unknown } | null;

export async function enviarCadastroUsuario(
  dados: DadosCadastroUsuario,
  requisitar: typeof fetch = fetch,
): Promise<ResultadoCadastroUsuario> {
  let resposta: Response;

  try {
    resposta = await requisitar('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
  } catch {
    return { tipo: 'rede' };
  }

  if (resposta.status === 201) {
    return { tipo: 'sucesso' };
  }

  if (resposta.status === 400) {
    return { tipo: 'validacao' };
  }

  if (resposta.status === 409) {
    const corpo = (await resposta.json().catch(() => null)) as RespostaErro;
    return {
      tipo: 'duplicado',
      mensagem:
        typeof corpo?.erro === 'string'
          ? corpo.erro
          : 'Este email já possui cadastro. Tente outro endereço.',
    };
  }

  return { tipo: 'servidor' };
}
