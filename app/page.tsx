import Link from 'next/link';

function Marca() {
  return (
    <Link
      aria-label="DevFlow, página inicial"
      className="inline-flex items-center gap-3 font-semibold tracking-tight text-[#17231e]"
      href="/"
    >
      <span className="grid size-10 grid-cols-2 gap-1 rounded-2xl bg-[#c7f36a] p-2.5">
        <span className="rounded-sm bg-[#17231e]" />
        <span className="rounded-sm bg-[#17231e]/45" />
        <span className="rounded-sm bg-[#17231e]/45" />
        <span className="rounded-sm bg-[#17231e]" />
      </span>
      <span className="text-xl">devflow</span>
    </Link>
  );
}

function PainelProjeto() {
  return (
    <div
      aria-label="Prévia de um painel de projeto do DevFlow"
      className="relative mx-auto w-full max-w-[31rem] rotate-1 rounded-[2rem] border border-white/10 bg-[#1b2923] p-5 shadow-2xl shadow-black/25 sm:p-7"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-[#c7f36a]" />
          <span className="text-sm font-medium text-white">Visão do projeto</span>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/55">
          Esta semana
        </span>
      </div>

      <div className="py-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
          Projeto em destaque
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Portfólio v2
          </h2>
          <span className="rounded-full bg-[#c7f36a]/10 px-3 py-1.5 text-xs font-medium text-[#d9ff9c]">
            Em andamento
          </span>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-[#c7f36a]" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-white/45">
          <span>Progresso</span>
          <span>68%</span>
        </div>
      </div>

      <div className="space-y-3 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3.5">
          <span className="grid size-5 place-items-center rounded-md border border-[#c7f36a]/60 text-[10px] text-[#c7f36a]">
            ✓
          </span>
          <span className="flex-1 text-sm text-white/75">Definir estrutura do projeto</span>
          <span className="text-xs text-white/35">Feito</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3.5">
          <span className="size-5 rounded-md border border-white/20" />
          <span className="flex-1 text-sm text-white/75">Revisar página inicial</span>
          <span className="text-xs text-[#d9ff9c]">Hoje</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3.5">
          <span className="size-5 rounded-md border border-white/20" />
          <span className="flex-1 text-sm text-white/75">Publicar primeira versão</span>
          <span className="text-xs text-white/35">Qui</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f1] text-[#17231e]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Marca />
        <nav aria-label="Navegação principal" className="flex items-center gap-3 sm:gap-7">
          <a
            className="hidden text-sm font-medium text-[#53615a] transition hover:text-[#17231e] sm:inline"
            href="#visao"
          >
            Visão geral
          </a>
          <Link
            className="rounded-full bg-[#17231e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2c4035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17231e]"
            href="/cadastro"
          >
            Criar conta
          </Link>
        </nav>
      </header>

      <section
        id="visao"
        className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pb-32 lg:pt-24"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dce4d6] bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#53615a]">
            <span className="size-2 rounded-full bg-[#80ad3f]" />
            Menos dispersão, mais progresso
          </div>
          <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Tire seus projetos da cabeça. <span className="text-[#638b32]">E coloque em fluxo.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#5a675f] sm:text-lg sm:leading-8">
            Um lugar simples para organizar projetos, acompanhar tarefas e manter o foco no que vem a seguir.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#17231e] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#17231e]/10 transition hover:-translate-y-0.5 hover:bg-[#2c4035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17231e]"
              href="/cadastro"
            >
              Começar agora
              <span aria-hidden="true">↗</span>
            </Link>
            <span className="px-2 text-sm text-[#748078]">Organize seu próximo passo.</span>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#dce4d6] pt-6 text-sm text-[#647168]">
            <span className="inline-flex items-center gap-2">
              <span className="text-[#638b32]">✓</span> Projetos em um só lugar
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#638b32]">✓</span> Tarefas com contexto
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:pl-4">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-[#dcebc7]/65 blur-3xl" />
          <div className="relative rounded-[2.5rem] bg-[#dfe8d8] p-4 sm:p-7">
            <p className="mb-3 pl-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68756d]">
              Prévia ilustrativa do espaço de trabalho
            </p>
            <div className="absolute -left-2 top-16 hidden rounded-2xl border border-[#e5eadf] bg-white px-4 py-3 shadow-lg shadow-[#17231e]/5 sm:block">
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#819087]">Ritmo da semana</p>
              <p className="mt-1 text-lg font-semibold text-[#17231e]">No caminho certo <span className="text-[#638b32]">↗</span></p>
            </div>
            <PainelProjeto />
            <div className="absolute -bottom-3 right-4 rounded-2xl border border-[#e5eadf] bg-white px-4 py-3 shadow-lg shadow-[#17231e]/5 sm:-right-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#819087]">Tarefas concluídas</p>
              <p className="mt-1 text-lg font-semibold text-[#17231e]">12 <span className="text-sm font-normal text-[#819087]">nesta semana</span></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e7de]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#7b867f] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Marca />
          <p>Um espaço de trabalho mais claro para quem constrói.</p>
        </div>
      </footer>
    </main>
  );
}
