"use client";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import { useCart } from "./useCart";
import { PlatformIcon } from "./PlatformBadge";
import { formatPrice } from "./PriceTag";
export default function CartView() {
    const { items, totalItems, totalPrice, changeQuantity, removeFromCart, clearCart } = useCart();
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                <ShoppingCart size={48} className="mb-3 text-zinc-600" />
                <p className="mb-4 text-zinc-300">Your cart is empty.</p>
                <Button href="/games">Browse Games</Button>
            </div>
        );
    }
    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.key} className="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                        <Image src={item.game.image} alt={item.game.title} width={60} height={90} className="rounded" />
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-zinc-50">{item.game.title}</p>
                            <p className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-400">
                                <PlatformIcon platform={item.platform} />
                                {item.platform}
                            </p>
                            <p className="text-sm text-zinc-400">{formatPrice(item.game.price)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => changeQuantity(item.key, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-50 hover:bg-zinc-700"
                            >
                                <Minus size={14} weight="bold" />
                            </button>
                            <span className="w-6 text-center text-zinc-50">{item.quantity}</span>
                            <button
                                onClick={() => changeQuantity(item.key, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-50 hover:bg-zinc-700"
                            >
                                <Plus size={14} weight="bold" />
                            </button>
                        </div>
                        <p className="w-20 text-right font-semibold text-zinc-50">{formatPrice(item.game.price * item.quantity)}</p>
                        <button
                            onClick={() => removeFromCart(item.key)}
                            aria-label={`Remove ${item.game.title} from cart`}
                            title="Remove from cart"
                            className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <Trash size={20} />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="h-fit rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h2 className="mb-4 text-lg font-semibold text-zinc-50">Order Summary</h2>
                <div className="mb-2 flex justify-between text-zinc-300">
                    <span>Items</span>
                    <span>{totalItems}</span>
                </div>
                <div className="mb-5 flex justify-between text-lg font-bold text-zinc-50">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <Button href="/checkout">Checkout</Button>
                    <Button onClick={clearCart} variant="secondary">
                        <span className="inline-flex items-center gap-2">
                            <Trash size={16} />
                            Clear Cart
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
