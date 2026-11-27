import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Buildings, CalendarBlank, CheckCircle, Megaphone, Tag, } from "@phosphor-icons/react/ssr";
import { games, getGameById } from "@/data/games";
import AddToCartButton from "@/components/AddToCartButton";
import Button from "@/components/Button";
import PlatformBadge from "@/components/PlatformBadge";
import PriceTag from "@/components/PriceTag";
export async function generateStaticParams() {
    return games.map((game) => ({ id: game.id }));
}
export async function generateMetadata({ params }) {
    const { id } = await params;
    const game = getGameById(id);
    if (!game) {
        return { title: "Game not found | GameHub" };
    }
    return {
        title: `${game.title} | GameHub`,
        description: game.description,
    };
}
export default async function GameDetailPage({ params }) {
    const { id } = await params;
    const game = getGameById(id);
    if (!game) {
        notFound();
    }
    const info = [
        { label: "Developer", value: game.developer, icon: <Buildings size={18}/> },
        { label: "Publisher", value: game.publisher, icon: <Megaphone size={18}/> },
        { label: "Released", value: String(game.releaseYear), icon: <CalendarBlank size={18}/> },
        { label: "Genre", value: game.genre, icon: <Tag size={18}/> },
    ];
    return (<div className="space-y-12">
      <Button href="/games" variant="secondary">
        <span className="inline-flex items-center gap-2">
          <ArrowLeft size={16} weight="bold"/>
          Back to Games
        </span>
      </Button>

      <section className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Image src={game.image} alt={`${game.title} cover`} width={600} height={900} className="w-full max-w-xs rounded-xl" sizes="300px" priority/>

        <div className="space-y-5">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">{game.title}</h1>
          <span className="inline-flex items-center gap-2 text-xl">
            <span aria-hidden="true">{"⭐".repeat(Math.round(game.rating))}</span>
            <span className="font-semibold text-zinc-200">{game.rating.toFixed(1)} / 5</span>
          </span>
          <p className="max-w-[65ch] leading-relaxed text-zinc-300">{game.description}</p>
          <div className="flex flex-wrap gap-2">
            {game.platforms.map((platform) => (<PlatformBadge key={platform} platform={platform}/>))}
          </div>
          <div className="flex flex-wrap items-center gap-5 border-t border-zinc-800 pt-5">
            <PriceTag price={game.price} size="large"/>
            <AddToCartButton game={game}/>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-50">About this game</h2>
          <p className="max-w-[65ch] leading-relaxed text-zinc-300">{game.about}</p>

          <h3 className="mb-3 mt-8 text-lg font-semibold text-zinc-50">Key features</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {game.features.map((feature) => (<li key={feature} className="flex items-start gap-2 text-zinc-300">
                <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-lime-400"/>
                {feature}
              </li>))}
          </ul>
        </div>

        <div className="h-fit rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-lg font-semibold text-zinc-50">Game info</h2>
          <dl className="space-y-4">
            {info.map((item) => (<div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-lime-400">{item.icon}</span>
                <div>
                  <dt className="text-xs text-zinc-400">{item.label}</dt>
                  <dd className="text-sm font-medium text-zinc-100">{item.value}</dd>
                </div>
              </div>))}
          </dl>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-50">Screenshots</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {game.screenshots.map((shot, index) => (<div key={shot} className={`relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 ${index === 0 && game.screenshots.length % 2 === 1 ? "md:col-span-2" : ""}`}>
              <Image src={shot} alt={`${game.title} screenshot ${index + 1}`} fill unoptimized className="object-cover"/>
            </div>))}
        </div>
      </section>
    </div>);
}
