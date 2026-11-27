import { games } from "@/data/games";
import GameBrowser from "@/components/GameBrowser";
import PageHeader from "@/components/PageHeader";
export const metadata = {
    title: "All Games | GameHub",
    description: "Browse the full game catalogue. Search, filter by platform and sort by price or rating.",
};
export default function GamesPage() {
    return (<div>
      <PageHeader title="Game Catalogue" subtitle="Search, filter by platform and sort to find your next game."/>
      <GameBrowser games={games}/>
    </div>);
}
