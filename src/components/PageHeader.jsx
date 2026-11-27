export default function PageHeader({ title, subtitle }) {
    return (<div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-zinc-400">{subtitle}</p>}
    </div>);
}
