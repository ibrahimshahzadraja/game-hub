export default function Loading() {
    return (<div>
      <div className="mb-6 h-9 w-36 animate-pulse rounded-lg bg-zinc-800"/>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="aspect-2/3 w-full max-w-xs animate-pulse rounded-xl bg-zinc-800"/>
        <div className="space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded bg-zinc-800"/>
          <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-800"/>
          <div className="h-20 w-full animate-pulse rounded bg-zinc-900"/>
          <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-800"/>
        </div>
      </div>
    </div>);
}
