export function formatPrice(price) {
    return price === 0 ? "Free" : `$${price.toFixed(2)}`;
}
export default function PriceTag({ price, size = "small" }) {
    const textSize = size === "large" ? "text-3xl" : "text-lg";
    return <span className={`${textSize} font-bold text-lime-400`}>{formatPrice(price)}</span>;
}
