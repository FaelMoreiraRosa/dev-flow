import Link from 'next/link';
import CadastroForm from './cadastro-form';

function Marca() {
  return (
    <Link aria-label="DevFlow, página inicial" className="inline-flex items-center gap-3" href="/">
      <span className="grid size-10 grid-cols-2 gap-1 rounded-2xl bg-[#c7f36a] p-2.5">
        <span className="rounded-sm bg-[#17231e]" />
        <span className="rounded-sm bg-[#17231e]/45" />
        <span className="rounded-sm bg-[#17231e]/45" />
        <span className="rounded-sm bg-[#17231e]" />
      </span>
      <span className="text-xl font-semibold tracking-tight text-white">devflow</span>
    </Link>
  );
}

export default function CadastroPage() {
  return (
    <main className="grid min-h-screen bg-[#f5f7f1] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative isolate flex min-h-[24rem] flex-col overflow-hidden bg-[#17231e] px-6 py-7 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-10 xl:px-20">
        <div aria-hidden="true" className="absolute -right-32 top-1/4 -z-10 size-[28rem] rounded-full border border-white/[0.08]" />
        <div aria-hidden="true" className="absolute -right-16 top-[30%] -z-10 size-[20rem] rounded-full border border-white/[0.08]" />
        <Marca />

        <div className="my-auto max-w-xl py-16 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c7f36a]">
            Seu espaço de trabalho começa aqui
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Mais clareza para tirar as ideias do papel.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/65">
            Crie sua conta e tenha projetos e tarefas organizados em um só lugar.
          </p>

          <div className="mt-10 space-y-4 text-sm text-white/75">
            <p className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-[#c7f36a]/15 text-[#c7f36a]">✓</span>
              Dê forma ao seu próximo projeto
            </p>
            <p className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-[#c7f36a]/15 text-[#c7f36a]">✓</span>
              Transforme planos em próximos passos
            </p>
          </div>
        </div>

        <p className="hidden text-xs text-white/40 lg:block">Um fluxo mais leve para o trabalho que importa.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 lg:py-16">
        <div className="w-full max-w-md">
          <Link
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#68756d] transition hover:text-[#17231e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#638b32]"
            href="/"
          >
            <span aria-hidden="true">←</span> Voltar ao início
          </Link>
          <div className="rounded-[2rem] border border-[#e6eae2] bg-white p-6 shadow-xl shadow-[#24372b]/[0.06] sm:p-9">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#779b47]">
                Comece por você
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17231e]">
                Criar sua conta
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#758078]">
                Leva só um minuto. Seus projetos começam aqui.
              </p>
            </div>

            <CadastroForm />
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-[#89938c]">
            Ao criar sua conta, sua senha é protegida antes de ser armazenada.
          </p>
        </div>
      </section>
    </main>
  );
}
