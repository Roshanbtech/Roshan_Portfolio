import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/newP1.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

const glowPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 20px rgba(139, 69, 255, 0.8), 0 0 40px rgba(139, 69, 255, 0.6);
  }
  50% {
    text-shadow: 0 0 30px rgba(139, 69, 255, 1), 0 0 60px rgba(139, 69, 255, 0.8);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 960px) {
    order: 2;
    align-items: center;
    text-align: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;

  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    margin-bottom: 40px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 960px) {
    text-align: center;
  }
`;

const TextLoop = styled.div`
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  margin-bottom: 16px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 960px) {
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  animation: ${glowPulse} 2s ease-in-out infinite;
  font-weight: 700;
  
  .Typewriter__wrapper {
    font-family: inherit;
  }
  
  .Typewriter__cursor {
    font-weight: 300;
  }
`;

const SubTitle = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.text_primary}CC;
  font-weight: 400;
  max-width: 600px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  @media (max-width: 960px) {
    text-align: center;
  }
`;

const ResumeButton = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  width: fit-content;
  min-width: 200px;
  padding: 16px 32px;
  
  background: linear-gradient(135deg, #8B45FF 0%, #FF006E 50%, #8B45FF 100%);
  background-size: 200% 200%;
  border-radius: 50px;
  border: 2px solid transparent;
  
  font-weight: 700;
  font-size: 18px;
  color: white;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  box-shadow: 
    0 8px 32px rgba(139, 69, 255, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background-position: 100% 0;
    box-shadow: 
      0 16px 40px rgba(139, 69, 255, 0.4),
      0 8px 24px rgba(0, 0, 0, 0.3);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }
    
  @media (max-width: 640px) {
    padding: 14px 28px;
    font-size: 16px;
    min-width: 180px;
  }
  
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const ImageContainer = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, transparent, ${({ theme }) => theme.primary});
    border-radius: 50%;
    z-index: -1;
    opacity: 0.7;
    animation: ${glowPulse} 3s ease-in-out infinite;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.primary};
  transition: all 0.4s ease;
  
  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.text_primary};
  }

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}40, transparent);
    animation: float 6s ease-in-out infinite;
  }
  
  &::before {
    width: 200px;
    height: 200px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    width: 150px;
    height: 150px;
    bottom: 20%;
    right: 10%;
    animation-delay: -3s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const Hero = () => {
  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
          <FloatingElements />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 50,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>

              <ResumeButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>
            
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <ImageContainer>
                  <Tilt
                    options={{
                      max: 15,
                      scale: 1.05,
                      speed: 400,
                    }}
                  >
                    <Img src={HeroImg} alt={Bio.name} loading="lazy" />
                  </Tilt>
                </ImageContainer>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;