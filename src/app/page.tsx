"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie, { AnimationItem } from "lottie-web";

import "./index.css";

const SHAKE_THRESHOLD = 15; // 阈值可能需要根据实际情况调整

export default function Home() {
  const [offset, setOffset] = useState(0);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [lottieInstance, setLottieInstance] = useState<AnimationItem>();
  const [canUseShake, setCanUseShake] = useState(false);
  const last = useRef({
    last_x: -Infinity,
    last_y: -Infinity,
    last_z: -Infinity,
    last_update: 0,
  });
  const handleShake = useCallback(() => {
    setOffset(offset + 10 > 80 ? 80 : offset + 10);
    lottieInstance?.show();
    lottieInstance?.play();
    lottieInstance?.addEventListener("loopComplete", () => {
      lottieInstance.hide();
    });
  }, [offset, lottieInstance, setOffset]);

  const deviceMotionHandler = useCallback(
    (eventData: DeviceMotionEvent) => {
      const acceleration = eventData.accelerationIncludingGravity!;
      const { x, y, z } = acceleration || {};
      const curTime = new Date().getTime();
      const eventHasData = x && y && z;
      const { last_update, last_x, last_y, last_z } = last.current;
      if (curTime - last_update > 100 && eventHasData) {
        const diffTime = curTime - last_update;
        const speed =
          (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
        if (speed > SHAKE_THRESHOLD) {
          // 判断为摇一摇动作
          handleShake();
        }
        last.current = {
          last_x: x,
          last_y: y,
          last_z: z,
          last_update: curTime,
        };
      }
    },
    [handleShake]
  );

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      setCanUseShake(true);
      // 支持，可以继续
      window.addEventListener("devicemotion", deviceMotionHandler, false);
    } else {
      alert("该浏览器不支持摇一摇功能");
      setCanUseShake(false);
    }
  }, [deviceMotionHandler, setCanUseShake]);

  useEffect(() => {
    if (!lottieRef.current) {
      return;
    }
    const instance = Lottie.loadAnimation({
      container: lottieRef.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/celebrate.json", // the path to the animation json
    });
    instance.hide();
    setLottieInstance(instance);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          用力摇一摇&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            期待您的到来
          </a>
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
      {canUseShake ? null : (
        <button onClick={handleShake} style={{ zIndex: 9999 }}>
          点我
        </button>
      )}
    </main>
  );
}
