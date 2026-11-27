import PageHeader from "@/components/PageHeader";
export const metadata = {
    title: "About | GameHub",
    description: "Learn about GameHub, a simple game store built with Next.js.",
};
const features = [
    { title: "Big catalogue", text: "Games for PC, PlayStation, Xbox and Switch in one place." },
    { title: "Easy filters", text: "Search by title, filter by platform and sort by price or rating." },
    { title: "Simple checkout", text: "Add games to your cart and place an order in seconds." },
];
export default function AboutPage() {
    return (
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
                <PageHeader title="About GameHub" subtitle="A simple online game store made for the CS4032 Web Programming course." />
                <p className="max-w-[65ch] leading-relaxed text-zinc-300">
                    GameHub is a frontend only project built with Next.js, React, JavaScript and Tailwind CSS. All games are mock data stored in the
                    project, and actions like placing an order only update React state and show a confirmation.
                </p>
            </div>

            <div className="space-y-6">
                {features.map((feature) => (
                    <div key={feature.title} className="border-l-2 border-lime-400 pl-4">
                        <h2 className="font-semibold text-zinc-50">{feature.title}</h2>
                        <p className="mt-1 text-sm text-zinc-400">{feature.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
