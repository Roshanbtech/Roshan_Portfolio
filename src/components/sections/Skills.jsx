import React from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";

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

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
`;

const shimmerEffect = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 30px;
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 20px;
`;

const Title = styled.div`
  font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Desc = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.text_primary}CC;
  font-weight: 400;
  max-width: 600px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled.div`
  background: rgba(17, 25, 40, 0.3);
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  min-height: 280px;
  animation: ${fadeInUp} 0.8s ease-out calc(0.1s * var(--index)) both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(139, 69, 255, 0.1), 
      rgba(255, 0, 110, 0.08), 
      rgba(139, 69, 255, 0.06)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 18px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: rgba(17, 25, 40, 0.15);
    backdrop-filter: blur(25px);
    transform: translateY(-8px) scale(1.02);
    border: 2px solid rgba(139, 69, 255, 0.4);
    box-shadow: 
      0 20px 40px rgba(139, 69, 255, 0.15),
      0 10px 25px rgba(255, 0, 110, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);

    &::before {
      opacity: 1;
    }

    &::after {
      transform: translateX(100%);
    }
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const SkillTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.01em;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  align-content: flex-start;
`;

const SkillItem = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(139, 69, 255, 0.1);
  border: 1px solid rgba(139, 69, 255, 0.3);
  border-radius: 50px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: rgba(139, 69, 255, 0.2);
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 16px rgba(139, 69, 255, 0.3),
      0 4px 8px rgba(255, 0, 110, 0.2);
    animation: ${glowPulse} 2s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 14px;
  }
`;

const SkillImage = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;

  ${SkillItem}:hover & {
    transform: scale(1.2) rotate(10deg);
    filter: drop-shadow(0 4px 8px rgba(139, 69, 255, 0.4));
  }
`;

const GifBackground = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  border-radius: 20px;
  opacity: 0.65; // <<--- Make GIF more visible (try 0.5–0.7)
  background: ${({ bg }) => bg ? `url(${bg}) center/cover no-repeat` : 'none'};
  pointer-events: none;
  filter: none; // <<--- No blur or grayscale
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom right,
    rgba(17, 25, 40, 0.28) 65%,  // <<--- Lower opacity here (0.18–0.3)
    rgba(139, 69, 255, 0.08) 100%
  );
  border-radius: 20px;
  z-index: 1;
  pointer-events: none;
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
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::before {
    width: 300px;
    height: 300px;
    top: 10%;
    left: -150px;
    animation-delay: 0s;
  }
  
  &::after {
    width: 200px;
    height: 200px;
    bottom: 10%;
    right: -100px;
    animation-delay: -4s;
  }
`;

const Skills = () => {
  return (
    <Container id="Skills">
      <FloatingElements />
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working on for the past 2 years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <Tilt key={skill.title} options={{ max: 15, scale: 1.05, speed: 400 }}>
  <SkillCard style={{ '--index': index }}>
    {skill.bgGif && <GifBackground bg={skill.bgGif} />}
    <CardOverlay />
    <SkillTitle>{skill.title}</SkillTitle>
    <SkillList>
      {skill.skills.map((item) => (
        <SkillItem key={item.name}>
          <SkillImage src={item.image} alt={item.name} loading="lazy" />
          {item.name}
        </SkillItem>
      ))}
    </SkillList>
  </SkillCard>
</Tilt>

          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;