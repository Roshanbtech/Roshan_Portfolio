import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = styled(motion.div)`
  position: fixed;
  top: 0; left: 0;
  width: 20px; height: 20px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.18s;
  will-change: transform;
`;

const SvgCircle = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
`;

export const CustomPointer = () => {
  const cursorVisible = useRef(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 450, damping: 36 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 36 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    let raf = null;
    const moveCursor = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cursorVisible.current = true;
        cursorX.set(e.clientX - 10);
        cursorY.set(e.clientY - 10);
      });
    };

    const handleMouseEnter = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.getAttribute("role") === "button" ||
        e.target.classList.contains("cursor-pointer")
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseLeave = () => setIsPointer(false);

    document.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseover", handleMouseEnter, true);
    document.body.addEventListener("mouseout", handleMouseLeave, true);

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        cursorVisible.current = false;
      }
    };
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseover", handleMouseEnter, true);
      document.body.removeEventListener("mouseout", handleMouseLeave, true);
      document.removeEventListener("mouseout", handleMouseOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cursorX, cursorY]);

  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const handleTouch = () => setShowCursor(false);
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  return showCursor ? (
    <Cursor
      visible={cursorVisible.current ? 1 : 0}
      style={{
        x: springX,
        y: springY,
        scale: isPointer ? 1.18 : 1,
        transition: "background 0.2s, border 0.2s",
      }}
    >
      <SvgCircle viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          r="8"
          fill={isPointer ? "#fff" : "#8b45ff"}
          stroke={isPointer ? "#8b45ff" : "#fff"}
          strokeWidth="2"
        />
        <circle
          cx="10"
          cy="10"
          r="3"
          fill={isPointer ? "#8b45ff" : "#fff"}
        />
      </SvgCircle>
    </Cursor>
  ) : null;
};

export default CustomPointer;