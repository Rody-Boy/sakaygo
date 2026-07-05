interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-green-700">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
    </header>
  );
}
