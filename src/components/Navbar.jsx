import Link from "next/link";
import CartCount from "./CartCount";
export default function Navbar({ links }) {
    return (
        <header className="border-b border-zinc-800 bg-zinc-950">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
                <Link href="/" className="text-xl font-bold text-zinc-50">
                    Game<span className="text-lime-400">Hub</span>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-zinc-300 hover:text-zinc-50">
                            {link.label}
                        </Link>
                    ))}
                    <CartCount />
                </div>
            </nav>
        </header>
    );
}
