import CheckoutForm from "@/components/CheckoutForm";
import PageHeader from "@/components/PageHeader";
export const metadata = {
    title: "Checkout | GameHub",
    description: "Enter your details and place your game order.",
};
export default function CheckoutPage() {
    return (
        <div>
            <PageHeader title="Checkout" subtitle="Fill in your details to place the order." />
            <CheckoutForm />
        </div>
    );
}
