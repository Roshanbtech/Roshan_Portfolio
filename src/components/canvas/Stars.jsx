import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";
import Meteors from "./Meteors"; 

const isMobile = typeof window !== "undefined" && window.innerWidth < 800;

const StyledCanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  z-index: 0;
`;


const Stars = React.memo((props) => {
  const ref = useRef();
  
 const NUM_POINTS = isMobile ? 1000 : 6000;
const sphere = useMemo(() => {
  const arr = random.inSphere(new Float32Array(NUM_POINTS), { radius: 1.2 });
  if (!arr.length) {
    console.warn("Stars: Empty array returned from inSphere!");
  }
  if (arr.some((v) => !Number.isFinite(v))) {
    console.warn("Stars: Non-finite (NaN/Infinity) value detected in star positions array!");
  }
  if (arr.length % 3 !== 0) {
    console.warn("Stars: Array length is not a multiple of 3! Points will break.");
  }
  return arr;
}, [ NUM_POINTS ]);


  useFrame((state, delta) => {
  if (isMobile) {
    if (!window.starFrame) window.starFrame = 0;
    window.starFrame++;
    if (window.starFrame % 3 !== 0) return;
  }
  if (ref.current) {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  }
});


  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

const StyledStarsCanvas = () => {
  const cameraConfig = useMemo(() => ({
    position: [0, 0, 1],
  }), []);

  const glConfig = useMemo(() => ({
    antialias: false, 
    alpha: true,
    powerPreference: "high-performance",
  }), []);

  if (isMobile) {
  return (
    <StyledCanvasWrapper>
      <Meteors number={10} color="#8b45ff" angle={220} />
    </StyledCanvasWrapper>
  );
}

  return (
    <StyledCanvasWrapper>
      <Canvas 
  camera={cameraConfig}
  gl={{
    ...glConfig,
    antialias: !isMobile,
  }}
  dpr={isMobile ? [1, 1.1] : [1, Math.min(1.5, window.devicePixelRatio || 1)]}
  frameloop={isMobile ? "demand" : "always"}
>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;