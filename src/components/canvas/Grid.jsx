import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0px);}
  50% { transform: translateY(-4px);}
`;

const GridSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.28;
`;

const Square = styled.rect`
  stroke: ${({ theme }) => theme.primary || "#8b45ff"};
  stroke-width: 1.2;
  fill: ${({ $isHovered, theme }) =>
    $isHovered ? (theme.primary ? theme.primary + "55" : "#8b45ff55") : "transparent"};
  transition: fill 0.4s, stroke 0.2s;
  animation: ${float} ${({ $delay }) => 2 + $delay}s ease-in-out infinite;
`;


export const InteractiveGridPattern = ({
  width = 32,
  height = 32,
  squares = [24, 7], // [horizontal, vertical]
}) => {
  const [hovered, setHovered] = useState(null);
  const [snakeIndex, setSnakeIndex] = useState(0);
  const [horizontal, vertical] = squares;

  useEffect(() => {
    const interval = setInterval(() => {
      setSnakeIndex((i) => (i + 1) % (horizontal * vertical));
    }, 44); // wave speed
    return () => clearInterval(interval);
  }, [horizontal, vertical]);

  return (
    <GridSVG width="100%" height="100%">
      {Array.from({ length: horizontal * vertical }).map((_, idx) => {
        const x = (idx % horizontal) * width;
        const y = Math.floor(idx / horizontal) * height;
        return (
          <Square
            key={idx}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={6}
            $isHovered={hovered === idx || Math.abs(idx - snakeIndex) < 9}
            $delay={((x + y) % 7) * 0.13}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </GridSVG>
  );
};
