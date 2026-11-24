import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { games, platforms } from "@/data/games";
import Button from "@/components/Button";
import HeroSlideshow from "@/components/HeroSlideshow";
import { PlatformIcon } from "@/components/PlatformBadge";
export const metadata = {
    title: "Home | GameHub",
    description: "GameHub home page with featured and top rated games.",
};
export default function HomePage() {
    const featuredGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 4);
    const heroGames = ["5", "12", "9", "4", "16", "6"]
        .map((id) => games.find((game) => game.id === id))
        .filter((game) => game !== undefined);
    return (<div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 md:text-5xl">
            Your next favourite game is <span className="text-lime-400">one click</span> away
          </h1>
          <p className="mt-4 max-w-md text-zinc-400">
            Games for PC, PlayStation, Xbox and Switch. Pick a platform, add to cart and check out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/games">Browse Games</Button>
            <Button href="/about" variant="secondary">
              About Us
            </Button>
          </div>
        </div>

        <HeroSlideshow games={heroGames}/>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50">Top rated right now</h2>
          <Link href="/games" className="inline-flex items-center gap-1 text-sm text-lime-400 hover:text-lime-300">
            See all games
            <ArrowRight size={14} weight="bold"/>
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-800 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50">Shop by platform</h2>
        <p className="mt-2 text-zinc-400">
          {games.length} games in the catalogue. Use the platform filter on the games page.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {platforms.map((platform) => {
            const count = games.filter((game) => game.platforms.includes(platform)).length;
            return (<Link key={platform} href="/games" className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-lime-400">
                <span className="mb-3 block text-lime-400">
                  <PlatformIcon platform={platform} size={28}/>
                </span>
                <p className="text-lg font-semibold text-zinc-50">{platform}</p>
                <p className="text-sm text-zinc-400">{count} games</p>
              </Link>);
        })}
        </div>
      </section>
    </div>);
}