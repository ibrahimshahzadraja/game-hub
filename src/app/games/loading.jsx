export default function Loading() {
    const placeholders = [1, 2, 3, 4, 5, 6, 7, 8];
    return (<div>
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-zinc-800"/>
      <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-zinc-900"/>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {placeholders.map((item) => (<div key={item} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="aspect-2/3 w-full animate-pulse bg-zinc-800"/>
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800"/>
              <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800"/>
            </div>
          </div>))}
      </div>
    </div>);
}
