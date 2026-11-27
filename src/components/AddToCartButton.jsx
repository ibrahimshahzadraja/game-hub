"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle, ShoppingCart, Trash } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import Modal from "./Modal";
import { PlatformIcon } from "./PlatformBadge";
import { useCart } from "./useCart";
export default function AddToCartButton({ game }) {
    const { addToCart, removeFromCart } = useCart();
    const [step, setStep] = useState("closed");
    const [platform, setPlatform] = useState("");
    const [error, setError] = useState("");
    const [addedKey, setAddedKey] = useState("");
    function openPicker() {
        setPlatform(game.platforms.length === 1 ? game.platforms[0] : "");
        setError("");
        setStep("choose");
    }
    function confirmAdd() {
        if (!platform) {
            setError("Please choose a platform.");
            return;
        }
        const key = addToCart(game, platform);
        setAddedKey(key);
        setStep("added");
    }
    function undoAdd() {
        removeFromCart(addedKey);
        setStep("closed");
    }
    function close() {
        setStep("closed");
    }
    return (<>
      <Button onClick={openPicker}>
        <span className="inline-flex items-center gap-2">
          <ShoppingCart size={18} weight="bold"/>
          Add to Cart
        </span>
      </Button>

      <Modal open={step === "choose"} title="Which platform do you want it for?" onClose={close}>
        <div className="grid grid-cols-2 gap-3">
          {game.platforms.map((item) => (<button key={item} onClick={() => {
                setPlatform(item);
                setError("");
            }} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition ${platform === item
                ? "border-lime-400 bg-lime-400/10 text-lime-300"
                : "border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}>
              <PlatformIcon platform={item} size={18}/>
              {item}
            </button>))}
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={confirmAdd}>Add to Cart</Button>
        </div>
      </Modal>

      <Modal open={step === "added"} title="Added to cart" onClose={close}>
        <div className="flex items-center gap-4">
          <Image src={game.image} alt={`${game.title} cover`} width={60} height={90} className="rounded"/>
          <div>
            <p className="flex items-center gap-2 font-semibold text-zinc-50">
              <CheckCircle size={20} weight="fill" className="text-lime-400"/>
              {game.title}
            </p>
            <p className="mt-1 text-sm text-zinc-400">Platform: {platform}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button variant="danger" onClick={undoAdd}>
            <span className="inline-flex items-center gap-2">
              <Trash size={16} weight="bold"/>
              Remove
            </span>
          </Button>
          <Button variant="secondary" onClick={close}>
            Keep Shopping
          </Button>
          <Button href="/cart">Go to Cart</Button>
        </div>
      </Modal>
    </>);
}
