import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const meteorAnim = keyframes`
  0% {
    opacity: 1;
    transform: rotate(var(--angle, 215deg)) translateX(0);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle, 215deg)) translateX(-500px);
  }
`;

const MeteorSpan = styled.span`
  pointer-events: none;
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#9ca3af"};
  box-shadow: 0 0 0 1px #ffffff10;
  z-index: 1;
  will-change: transform, opacity;
  animation: ${meteorAnim} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}px;
  rotate: ${({ $angle }) => $angle || 215}deg;

  & > div {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 1px;
    width: 48px;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${({ $color }) => $color || "#9ca3af"},
      transparent
    );
    transform: translateY(-50%);
    border-radius: 2px;
    z-index: -1;
  }
`;

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.4,
  minDuration = 3,
  maxDuration = 7,
  angle = 215,
  color = "#9ca3af",
}) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorsArr = Array.from({ length: number }).map(() => ({
      left: Math.floor(Math.random() * window.innerWidth),
      top: Math.random() * 80 + 5, // 5% to 85% vertically
      delay: +(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2),
      duration: +(
        Math.random() * (maxDuration - minDuration) +
        minDuration
      ).toFixed(2),
      angle,
      color,
    }));
    setMeteors(meteorsArr);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, color]);

  return (
    <>
      {meteors.map((m, i) => (
        <MeteorSpan
          key={i}
          $left={m.left}
          $top={m.top}
          $delay={m.delay}
          $duration={m.duration}
          $angle={m.angle}
          $color={m.color}
        >
          <div />
        </MeteorSpan>
      ))}
    </>
  );
};

export default Meteors;
