"use client";

import { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AirplaneWindow() {
  const groupRef = useRef();
  const frameTexture = useTexture("/textures/airplane_window_frame.png");

  // Animate window scale on scroll so it naturally expands out of view
  useEffect(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.scale, {
      x: 4,
      y: 4,
      z: 4,
      ease: "power1.in",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "60% bottom",
        scrub: true,
      },
    });

    // Fade out the window material
    const materials = [];
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        materials.push(child.material);
      }
    });

    materials.forEach((mat) => {
      gsap.to(mat, {
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero-section",
          start: "30% top",
          end: "60% top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Textured window frame plane */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[5.5, 5.5]} />
        <meshStandardMaterial
          map={frameTexture}
          transparent
          alphaTest={0.01}
        />
      </mesh>

      {/* Window frame ring (metallic) */}
      <mesh>
        <ringGeometry args={[1.5, 1.85, 64]} />
        <meshStandardMaterial
          color="#8899aa"
          metalness={0.9}
          roughness={0.2}
          emissive="#334455"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Transparent glass with slight blue tint */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color="#aaccff"
          transparent
          opacity={0.08}
          metalness={0.2}
          roughness={0.05}
        />
      </mesh>

      {/* Dark fuselage wall surrounding the window */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
    </group>
  );
}
