import Image from "next/image";
import Link from "next/link";
import PlatformBadge from "./PlatformBadge";
import PriceTag from "./PriceTag";
export default function GameCard({ game }) {
    return (
        <Link
            href={`/games/${game.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-lime-500"
        >
            <Image
                src={game.image}
                alt={`${game.title} cover`}
                width={600}
                height={900}
                className="aspect-2/3 w-full object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-semibold text-zinc-50 group-hover:text-lime-300">{game.title}</h3>
                <p className="text-sm text-zinc-400">
                    {game.genre} · ⭐ {game.rating}
                </p>
                <div className="flex flex-wrap gap-1">
                    {game.platforms.map((platform) => (
                        <PlatformBadge key={platform} platform={platform} />
                    ))}
                </div>
                <div className="mt-auto pt-2">
                    <PriceTag price={game.price} />
                </div>
            </div>
        </Link>
    );
}
