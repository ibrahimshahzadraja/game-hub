"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/ssr";
import { formatPrice } from "./PriceTag";
export default function HeroSlideshow({ games, interval = 4000 }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (paused || reduceMotion) return;
        const timer = setInterval(() => {
            setCurrent((index) => (index + 1) % games.length);
        }, interval);
        return () => clearInterval(timer);
    }, [paused, interval, games.length]);
    function goTo(index) {
        setCurrent((index + games.length) % games.length);
    }
    const game = games[current];
    return (
        <div
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {games.map((item, index) => (
                <Image
                    key={item.id}
                    src={item.screenshots[0]}
                    alt={`${item.title} artwork`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-5 pt-16">
                <Link href={`/games/${game.id}`} className="group block">
                    <p className="text-xl font-bold text-zinc-50 group-hover:text-lime-300">{game.title}</p>
                    <p className="mt-1 text-sm text-zinc-300">
                        ⭐ {game.rating} · {game.genre} · <span className="font-semibold text-lime-400">{formatPrice(game.price)}</span>
                    </p>
                </Link>
                <div className="mt-3 flex gap-2">
                    {games.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => goTo(index)}
                            aria-label={`Show ${item.title}`}
                            className={`h-1.5 rounded-full transition-all ${index === current ? "w-6 bg-lime-400" : "w-3 bg-zinc-500 hover:bg-zinc-300"}`}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={() => goTo(current - 1)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/60 p-2 text-zinc-50 hover:bg-zinc-950/90"
            >
                <CaretLeft size={18} weight="bold" />
            </button>
            <button
                onClick={() => goTo(current + 1)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/60 p-2 text-zinc-50 hover:bg-zinc-950/90"
            >
                <CaretRight size={18} weight="bold" />
            </button>
        </div>
    );
}
