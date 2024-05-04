"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie, { AnimationItem } from "lottie-web";

import "./index.css";

const maxOffset = 93;

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [lottieInstance, setLottieInstance] = useState<AnimationItem>();
  const [finish, setFinish] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const videoOutRef = useRef<HTMLVideoElement>(null);
  const videoInRef = useRef<HTMLVideoElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    lottieInstance?.stop();
    if (offset + 10 > maxOffset) {
      setOffset(maxOffset);
      setFinish(true);
    } else {
      setOffset(offset + 10);
      lottieInstance?.play();
      if (videoInRef.current && videoInRef.current.paused) {
        videoInRef.current.play();
      }
    }
  }, [offset, lottieInstance, setOffset, setFinish]);

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

  useEffect(() => {
    if (finish && videoOutRef.current) {
      if (!videoOutRef.current) {
        return;
      }
      if (videoOutRef.current.paused) {
        videoOutRef.current.play();
        if (videoOutRef.current) {
          videoOutRef.current.playbackRate = 1.5;
        }
      }
      videoOutRef.current.addEventListener(
        "ended",
        () => {
          window.location.href =
            "https://www.hunliji.com/p/frontend/creation-platform/app-preview-wedding-card/dist/index.html?cardId=MTA1MDQwODMzZmlyZV9jbG91ZA#/";
        },
        false
      );
    } else if (!finish && videoInRef.current) {
      if (videoInRef.current.paused) {
        videoInRef.current.play();
      }
    }
  }, [finish]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl  lg:bg-gray-200 lg:p-4">
          点击跳动的爱心，让新郎新娘靠近&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:size-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            龙雨婷💒苗宇
          </span>
        </div>
      </div>
      <div
        className="mb-6 flex items-center justify-between w-full relative"
        // style={{ height: 250 }}
      >
        {/* <div ref={lottieRef} className="lottie-container"></div> */}
        <Image
          src="/boy-left.png"
          alt="Boy"
          width={100}
          height={100}
          priority
          style={{ transform: `translateX(${offset}px)`, transition: "all" }}
        />
        <Image
          src="/girl-right.png"
          alt="Girl"
          width={100}
          height={100}
          priority
          style={{ transform: `translateX(-${offset}px)`, transition: "all" }}
        />
      </div>
      <div className="video-container">
        <video
          src="/welcome-out.mp4"
          autoPlay={false}
          muted={false}
          controls={false}
          playsInline={true}
          ref={videoOutRef}
          style={{ display: finish ? "block" : "none" }}
        ></video>
        <video
          src="/welcome-in.mp4"
          autoPlay={false}
          muted={false}
          controls={false}
          playsInline={true}
          ref={videoInRef}
          style={{ display: finish ? "none" : "block" }}
        ></video>
      </div>
      <div
        ref={buttonRef}
        style={{ height: 100, zIndex: 9999 }}
        onClick={handleClick}
      ></div>
    </main>
  );
}
