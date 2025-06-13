import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const meshRef = useRef();
  const earth = useGLTF("./planet/scene.gltf");

  const enhancedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D8BFD8").lerp(new THREE.Color("#C0C0C0"), 0.5),
      emissive: "#8A2BE2",
      emissiveIntensity: 0.4, 
      metalness: 0.7,
      roughness: 0.3,
    });
  }, []);

  useMemo(() => {
    if (earth.scene) {
      earth.scene.traverse((node) => {
        if (node.isMesh) {
          node.material = enhancedMaterial;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [earth.scene, enhancedMaterial]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={earth.scene} 
      scale={3} 
      position-y={0} 
      rotation-y={0} 
    />
  );
};

const MemoizedEarth = React.memo(Earth);

const EarthCanvas = () => {
  const cameraConfig = useMemo(() => ({
    fov: 45,
    near: 0.1,
    far: 200,
    position: [-4, 3, 6],
  }), []);

  const glConfig = useMemo(() => ({
    preserveDrawingBuffer: true,
    antialias: true,
    powerPreference: "high-performance",
  }), []);

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, Math.min(2, window.devicePixelRatio || 1)]}
      gl={glConfig}
      camera={cameraConfig}
    >
      {/* Optimized lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-5, 5, 0]}
        intensity={1}
        color="#4A90E2"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MemoizedEarth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;