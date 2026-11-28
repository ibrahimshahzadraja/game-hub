import Button from "@/components/Button";
export const metadata = {
    title: "Page Not Found | GameHub",
    description: "The page you are looking for does not exist.",
};
export default function NotFound() {
    return (
        <div className="py-20 text-center">
            <p className="text-6xl font-bold text-lime-400">404</p>
            <h1 className="mt-4 text-2xl font-bold text-zinc-50">Page not found</h1>
            <p className="mt-2 text-zinc-400">The game or page you are looking for does not exist.</p>
            <div className="mt-6">
                <Button href="/games">Back to Games</Button>
            </div>
        </div>
    );
}
