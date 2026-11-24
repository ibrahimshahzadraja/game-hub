"use client";
import Link from "next/link";
import { ShoppingCart } from "@phosphor-icons/react/ssr";
import { useCart } from "./useCart";
export default function CartCount() {
    const { totalItems } = useCart();
    return (
        <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-lime-300"
        >
            <ShoppingCart size={18} weight="bold" />
            Cart ({totalItems})
        </Link>
    );
}
