"use client";
import { useState } from "react";
import { platforms } from "@/data/games";
import GameCard from "./GameCard";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

export default function GameBrowser({ games }) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState("default");

  const sortGames = {
    "price-low": (a, b) => a.price - b.price,
    "price-high": (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
  };
  const filteredGames = games
    .filter((game) => game.title.toLowerCase().includes(search.toLowerCase()))
    .filter((game) => platform === "All" || game.platforms.includes(platform))
    .sort(sortGames[sort] || (() => 0));

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <MagnifyingGlass size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search games by title..."
            aria-label="Search games by title..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-10 pr-4 text-zinc-50 placeholder-zinc-500 outline-none focus:border-lime-500"
          />
        </div>
        <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50">
          <option value="All">All platforms</option>
          {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50">
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-zinc-400">Showing {filteredGames.length} games</p>
      {filteredGames.length === 0 ? (
        <p className="rounded-lg border border-zinc-800 p-8 text-center text-zinc-400">No games match your search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
}
