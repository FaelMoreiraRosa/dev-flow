'use client';

import { useState, type FormEvent } from 'react';
import { criarUsuarioSchema } from '../../src/validations/usuario';
import { enviarCadastroUsuario } from '../../src/usuarios/api';

type CamposCadastro = {
  nome: string;
  email: string;
  senha: string;
};

type CampoCadastro = keyof CamposCadastro;

const camposVazios: CamposCadastro = { nome: '', email: '', senha: '' };

const mensagensValidacao: Record<CampoCadastro, string> = {
  nome: 'Informe um nome com 2 a 100 caracteres.',
  email: 'Digite um endereço de email válido.',
  senha: 'A senha deve ter de 8 a 128 caracteres.',
};

export default function CadastroForm() {
  const [campos, setCampos] = useState<CamposCadastro>(camposVazios);
  const [errosCampos, setErrosCampos] = useState<Partial<Record<CampoCadastro, string>>>({});
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);
  const [enviando, setEnviando] = useState(false);

  function atualizarCampo(campo: CampoCadastro, valor: string) {
    setCampos((atuais) => ({ ...atuais, [campo]: valor }));
    setErrosCampos((atuais) => ({ ...atuais, [campo]: undefined }));
    setMensagem(null);
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensagem(null);

    const validacao = criarUsuarioSchema.safeParse(campos);
    if (!validacao.success) {
      const proximosErros: Partial<Record<CampoCadastro, string>> = {};

      for (const problema of validacao.error.issues) {
        const campo = problema.path[0];
        if ((campo === 'nome' || campo === 'email' || campo === 'senha') && !proximosErros[campo]) {
          proximosErros[campo] = mensagensValidacao[campo];
        }
      }

      setErrosCampos(proximosErros);
      return;
    }

    setErrosCampos({});
    setEnviando(true);

    try {
      const resultado = await enviarCadastroUsuario(validacao.data);

      if (resultado.tipo === 'sucesso') {
        setCampos(camposVazios);
        setMensagem({
          tipo: 'sucesso',
          texto: 'Cadastro concluído! Sua conta já está pronta para começar a organizar seus projetos.',
        });
        return;
      }

      const mensagensErro = {
        validacao: 'Confira os dados informados e tente novamente.',
        duplicado: resultado.tipo === 'duplicado'
          ? resultado.mensagem
          : 'Este email já possui cadastro. Tente outro endereço.',
        servidor: 'Não foi possível concluir o cadastro agora. Tente novamente em instantes.',
        rede: 'Não foi possível conectar ao DevFlow. Verifique sua conexão e tente novamente.',
      };

      setMensagem({ tipo: 'erro', texto: mensagensErro[resultado.tipo] });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={enviarFormulario}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26342c]" htmlFor="nome">
          Nome completo
        </label>
        <input
          autoComplete="name"
          className={`min-h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#17231e] outline-none transition placeholder:text-[#a0aaa2] focus:border-[#83a953] focus:ring-4 focus:ring-[#83a953]/15 ${
            errosCampos.nome ? 'border-[#c45d53]' : 'border-[#dfe5dc]'
          }`}
          disabled={enviando}
          id="nome"
          name="nome"
          onChange={(evento) => atualizarCampo('nome', evento.target.value)}
          aria-describedby={errosCampos.nome ? 'nome-erro' : undefined}
          aria-invalid={Boolean(errosCampos.nome)}
          placeholder="Ex.: Alex Morgan"
          required
          value={campos.nome}
        />
        {errosCampos.nome && <p className="mt-1.5 text-xs text-[#a8433a]" id="nome-erro">{errosCampos.nome}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26342c]" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className={`min-h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#17231e] outline-none transition placeholder:text-[#a0aaa2] focus:border-[#83a953] focus:ring-4 focus:ring-[#83a953]/15 ${
            errosCampos.email ? 'border-[#c45d53]' : 'border-[#dfe5dc]'
          }`}
          disabled={enviando}
          id="email"
          name="email"
          onChange={(evento) => atualizarCampo('email', evento.target.value)}
          aria-describedby={errosCampos.email ? 'email-erro' : undefined}
          aria-invalid={Boolean(errosCampos.email)}
          placeholder="voce@exemplo.com"
          required
          type="email"
          value={campos.email}
        />
        {errosCampos.email && <p className="mt-1.5 text-xs text-[#a8433a]" id="email-erro">{errosCampos.email}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26342c]" htmlFor="senha">
          Senha
        </label>
        <input
          autoComplete="new-password"
          className={`min-h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#17231e] outline-none transition placeholder:text-[#a0aaa2] focus:border-[#83a953] focus:ring-4 focus:ring-[#83a953]/15 ${
            errosCampos.senha ? 'border-[#c45d53]' : 'border-[#dfe5dc]'
          }`}
          disabled={enviando}
          id="senha"
          name="senha"
          onChange={(evento) => atualizarCampo('senha', evento.target.value)}
          aria-describedby={errosCampos.senha ? 'senha-erro senha-ajuda' : 'senha-ajuda'}
          aria-invalid={Boolean(errosCampos.senha)}
          placeholder="Pelo menos 8 caracteres"
          required
          type="password"
          value={campos.senha}
        />
        {errosCampos.senha && <p className="mt-1.5 text-xs text-[#a8433a]" id="senha-erro">{errosCampos.senha}</p>}
        <p className="mt-1.5 text-xs text-[#89938c]" id="senha-ajuda">Use entre 8 e 128 caracteres.</p>
      </div>

      {mensagem?.tipo === 'erro' && (
        <p className="rounded-xl border border-[#f0d4d0] bg-[#fff5f3] px-4 py-3 text-sm leading-5 text-[#963e35]" role="alert">
          {mensagem.texto}
        </p>
      )}
      {mensagem?.tipo === 'sucesso' && (
        <p className="rounded-xl border border-[#d7e8be] bg-[#f4faeb] px-4 py-3 text-sm leading-5 text-[#466526]" role="status" aria-live="polite">
          {mensagem.texto}
        </p>
      )}

      <button
        className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#17231e] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#17231e]/10 transition hover:bg-[#2c4035] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#638b32] disabled:cursor-wait disabled:bg-[#66736b]"
        disabled={enviando}
        type="submit"
      >
        {enviando && (
          <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
        )}
        {enviando ? 'Criando sua conta…' : 'Criar minha conta'}
      </button>

      <p className="text-center text-xs leading-5 text-[#89938c]">
        Seus dados são usados para criar sua conta no DevFlow. A senha nunca aparece na resposta do cadastro.
      </p>
    </form>
  );
}
