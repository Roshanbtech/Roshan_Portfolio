import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
`;

const Stars = React.memo((props) => {
  const ref = useRef();
  
  const sphere = useMemo(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 }), 
    []
  );

  useFrame((state, delta) => {
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

  return (
    <StyledCanvasWrapper>
      <Canvas 
        camera={cameraConfig}
        gl={glConfig}
        dpr={[1, Math.min(1.5, window.devicePixelRatio || 1)]} 
        frameloop="always" 
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