"use client";
import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import { useCart } from "./useCart";
const emptyForm = { name: "", email: "", phone: "", payment: "" };
function validate(form) {
    const errors = {};
    if (form.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters.";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.email = "Enter a valid email address.";
    }
    if (!/^03\d{9}$/.test(form.phone)) {
        errors.phone = "Phone must be 11 digits and start with 03 (e.g. 03001234567).";
    }
    if (!form.payment) {
        errors.payment = "Please choose a payment method.";
    }
    return errors;
}
export default function CheckoutForm() {
    const { items, totalPrice, clearCart } = useCart();
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [orderId, setOrderId] = useState("");
    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        setOrderId(`GH-${Math.floor(100000 + Math.random() * 900000)}`);
        clearCart();
        setForm(emptyForm);
    }
    if (orderId) {
        return (
            <div className="flex flex-col items-center rounded-xl border border-lime-400/40 bg-zinc-900 p-8 text-center">
                <CheckCircle size={56} weight="fill" className="mb-3 text-lime-400" />
                <h2 className="mb-2 text-2xl font-bold text-lime-400">Order placed!</h2>
                <p className="text-zinc-300">
                    Thank you for your order. Your order number is <span className="font-semibold text-zinc-50">{orderId}</span>.
                </p>
                <p className="mb-6 text-zinc-400">Your game keys would be sent to your email.</p>
                <Button href="/games">Continue Shopping</Button>
            </div>
        );
    }
    if (items.length === 0) {
        return (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                <p className="mb-4 text-zinc-300">Your cart is empty. Add some games before checking out.</p>
                <Button href="/games">Browse Games</Button>
            </div>
        );
    }
    const inputClass = "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 outline-none focus:border-lime-500";
    return (
        <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <ul className="space-y-1 border-b border-zinc-800 pb-4 text-sm text-zinc-300">
                {items.map((item) => (
                    <li key={item.key} className="flex justify-between gap-4">
                        <span>
                            {item.game.title} ({item.platform}) x {item.quantity}
                        </span>
                        <span>${(item.game.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <p className="text-zinc-300">
                Total to pay: <span className="font-bold text-zinc-50">${totalPrice.toFixed(2)}</span>
            </p>

            <div>
                <label htmlFor="name" className="mb-1 block text-sm text-zinc-300">
                    Full Name
                </label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className={inputClass} />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block text-sm text-zinc-300">
                    Email
                </label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-zinc-300">
                    Phone Number
                </label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="03001234567" className={inputClass} />
                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>

            <div>
                <label htmlFor="payment" className="mb-1 block text-sm text-zinc-300">
                    Payment Method
                </label>
                <select id="payment" name="payment" value={form.payment} onChange={handleChange} className={inputClass}>
                    <option value="">Select a method</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="jazzcash">JazzCash</option>
                </select>
                {errors.payment && <p className="mt-1 text-sm text-red-400">{errors.payment}</p>}
            </div>

            <Button type="submit">Place Order</Button>
        </form>
    );
}
