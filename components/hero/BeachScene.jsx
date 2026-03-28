"use client";

import * as THREE from "three";
import { useTexture, Float, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

// Floating holographic data node
function DataNode({ position, size = 0.3, color = "#00d4ff", speed = 1 }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.5 * speed;
      meshRef.current.rotation.y = clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Glowing vertical data beam
function DataBeam({ position, height = 8, color = "#0066ff" }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.opacity =
        0.15 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.02, 0.02, height, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Floating holographic panel
function HoloPanel({ position, rotation = [0, 0, 0], width = 2, height = 1.2 }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.opacity =
        0.12 + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color="#00aaff"
        emissive="#0066dd"
        emissiveIntensity={0.6}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function TechScene() {
  const gridTexture = useTexture("/textures/tech_grid_floor.png");
  const skyTexture = useTexture("/textures/tech_skyline.png");

  // Configure textures
  gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping;
  gridTexture.repeat.set(4, 4);

  return (
    <group position={[0, -1, -20]}>
      {/* Sky dome with tech cityscape */}
      <mesh>
        <sphereGeometry args={[50, 64, 64]} />
        <meshStandardMaterial
          map={skyTexture}
          side={THREE.BackSide}
          emissive="#0a1628"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          map={gridTexture}
          emissive="#001133"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating data nodes */}
      <DataNode position={[-4, 3, -5]} size={0.4} color="#00d4ff" speed={0.8} />
      <DataNode position={[5, 5, -8]} size={0.5} color="#7b2fff" speed={0.6} />
      <DataNode position={[-2, 6, -12]} size={0.35} color="#00ff88" speed={1.2} />
      <DataNode position={[3, 2, -3]} size={0.25} color="#ff6600" speed={1.0} />
      <DataNode position={[-6, 4, -10]} size={0.45} color="#00aaff" speed={0.7} />
      <DataNode position={[7, 7, -15]} size={0.3} color="#ff00aa" speed={0.9} />
      <DataNode position={[0, 8, -6]} size={0.6} color="#00d4ff" speed={0.5} />

      {/* Data beams rising from the ground */}
      <DataBeam position={[-8, 0, -5]} height={12} color="#0066ff" />
      <DataBeam position={[6, 0, -10]} height={10} color="#7b2fff" />
      <DataBeam position={[-3, 0, -15]} height={14} color="#00aaff" />
      <DataBeam position={[10, 0, -8]} height={8} color="#00ff88" />
      <DataBeam position={[-12, 0, -12]} height={11} color="#0066ff" />

      {/* Holographic panels floating in space */}
      <HoloPanel position={[-5, 3, -7]} rotation={[0, 0.3, 0]} width={2.5} height={1.5} />
      <HoloPanel position={[6, 4, -12]} rotation={[0, -0.4, 0.1]} width={3} height={1.8} />
      <HoloPanel position={[0, 6, -18]} rotation={[0.1, 0, 0]} width={4} height={2} />

      {/* Lighting */}
      <directionalLight
        position={[5, 15, -5]}
        intensity={1.5}
        color="#cce0ff"
      />
      <pointLight position={[0, 5, -10]} intensity={2} color="#0066ff" distance={30} />
      <pointLight position={[-5, 3, -8]} intensity={1.5} color="#7b2fff" distance={20} />
      <pointLight position={[5, 2, -5]} intensity={1} color="#00d4ff" distance={15} />
      <ambientLight intensity={0.15} color="#0a1a3a" />

      {/* Subtle fog-like gradient planes for depth */}
      {[
        { z: -5, opacity: 0.03 },
        { z: -10, opacity: 0.05 },
        { z: -15, opacity: 0.04 },
      ].map((plane, i) => (
        <mesh key={i} position={[0, 3, plane.z]}>
          <planeGeometry args={[30, 15]} />
          <meshStandardMaterial
            color="#0a1a3a"
            transparent
            opacity={plane.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
