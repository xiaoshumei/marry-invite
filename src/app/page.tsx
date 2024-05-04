"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie, { AnimationItem } from "lottie-web";

import "./index.css";

const maxOffset = 93;

export default function Home() {
  const [offset, setOffset] = useState(0);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [lottieInstance, setLottieInstance] = useState<AnimationItem>();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    lottieInstance?.stop();
    if (offset + 10 > maxOffset) {
      setOffset(maxOffset);
      window.open(
        "https://www.hunliji.com/p/frontend/creation-platform/app-preview-wedding-card/dist/index.html?cardId=MTA1MDQwODMzZmlyZV9jbG91ZA#/"
      );
    } else {
      setOffset(offset + 10);
      lottieInstance?.play();
    }
  }, [offset, lottieInstance, setOffset]);

  useEffect(() => {
    if (!lottieRef.current) {
      return;
    }
    const instance = Lottie.loadAnimation({
      container: lottieRef.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/celebrate.json", // the path to the animation json
    });
    setLottieInstance(instance);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }
    Lottie.loadAnimation({
      container: buttonRef.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/button.json", // the path to the animation json
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          点击跳动的爱心，让新郎新娘靠近&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            龙雨婷❤️苗宇
          </span>
        </div>
      </div>
      <div className="mb-16 flex items-center justify-between w-full">
        <Image
          src="/boy-left.png"
          alt="Boy"
          className="dark:invert"
          width={100}
          height={100}
          priority
          style={{ transform: `translateX(${offset}px)` }}
        />
        <Image
          src="/girl-right.png"
          alt="Girl"
          className="dark:invert"
          width={100}
          height={100}
          priority
          style={{ transform: `translateX(-${offset}px)` }}
        />
      </div>
      <div ref={lottieRef} className="lottie-container"></div>
      <div
        ref={buttonRef}
        style={{ height: 100, zIndex: 9999 }}
        onClick={handleClick}
      ></div>
    </main>
  );
}
