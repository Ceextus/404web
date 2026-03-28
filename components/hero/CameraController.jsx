"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const { camera } = useThree();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Animate camera z from 5 to -15 on scroll
    gsap.to(camera.position, {
      z: -15,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Slight upward drift for dramatic reveal
    gsap.to(camera.position, {
      y: 1.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "20% top",
        end: "80% bottom",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [camera]);

  return null;
}
