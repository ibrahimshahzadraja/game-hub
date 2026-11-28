import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";
export const metadata = {
    title: "Your Cart | GameHub",
    description: "Review the games in your cart, change quantities and go to checkout.",
};
export default function CartPage() {
    return (
        <div>
            <PageHeader title="Your Cart" subtitle="Change quantities or remove games before checkout." />
            <CartView />
        </div>
    );
}
