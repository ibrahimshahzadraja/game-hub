import { GameController, WindowsLogo } from "@phosphor-icons/react/ssr";
export function PlatformIcon({ platform, size = 14 }) {
    return platform === "PC" ? <WindowsLogo size={size} /> : <GameController size={size} />;
}
export default function PlatformBadge({ platform }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-300">
            <PlatformIcon platform={platform} size={12} />
            {platform}
        </span>
    );
}
