"use client";
import { useEffect } from "react";
import { X } from "@phosphor-icons/react/ssr";
export default function Modal({ open, title, onClose, children }) {
    useEffect(() => {
        if (!open)
            return;
        function handleKey(event) {
            if (event.key === "Escape")
                onClose();
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);
    if (!open)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 px-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-zinc-50">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50">
            <X size={20}/>
          </button>
        </div>
        {children}
      </div>
    </div>);
}
