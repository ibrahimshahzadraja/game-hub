import Link from "next/link";
const styles = {
    primary: "bg-lime-400 text-zinc-950 hover:bg-lime-300",
    secondary: "border border-zinc-600 text-zinc-200 hover:bg-zinc-800",
    danger: "bg-red-600 text-zinc-50 hover:bg-red-500",
};
export default function Button({ children, href, onClick, type = "button", variant = "primary", disabled = false }) {
    const className = `inline-block rounded-lg px-4 py-2 text-center text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`;
    if (href) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={className}>
            {children}
        </button>
    );
}
