import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { experiences } from "../../data/constants";
import ExperienceCard from "../cards/ExperienceCard";

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
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 30px;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 66px 16px;
    margin-top: 30px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
    margin-top: 20px;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}30, transparent);
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::before {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  
  &::after {
    width: 200px;
    height: 200px;
    bottom: 15%;
    right: 8%;
    animation-delay: -4s;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  z-index: 2;
  
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 20px;
  margin-bottom: 8px;
  
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Desc = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-align: center;
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary}CC;
  max-width: 700px;
  margin-bottom: 40px;
  
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const TimelineContainer = styled.div`
  width: 100%;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  
  .vertical-timeline::before {
    background: linear-gradient(180deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}80);
    width: 3px;
  }
  
  .vertical-timeline-element-content {
    background: ${({ theme }) => theme.card}DD;
    backdrop-filter: blur(10px);
    border: 1px solid ${({ theme }) => theme.primary}30;
    border-radius: 16px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 20px ${({ theme }) => theme.primary}20;
    transition: all 0.3s ease;
  }
  
  .vertical-timeline-element-content:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.15),
      0 0 30px ${({ theme }) => theme.primary}30;
  }
  
  .vertical-timeline-element-icon {
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}CC);
    border: 3px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.primary}40;
    animation: ${glowPulse} 3s ease-in-out infinite;
  }
  
  .vertical-timeline-element-date {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 10px ${({ theme }) => theme.primary}60;
  }
`;

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Experience = () => {
  return (
    <Container id="Experience">
      <BackgroundElements />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Wrapper>
          <motion.div variants={itemVariants}>
            <Title>Experience</Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Desc>
              From prototypes to production, I'm engineering my way into the tech world by doing, iterating, and pushing limits.
            </Desc>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TimelineContainer>
              <VerticalTimeline>
                {experiences.map((experience, index) => (
                  <ExperienceCard
                    key={`experience-${index}`}
                    experience={experience}
                  />
                ))}
              </VerticalTimeline>
            </TimelineContainer>
          </motion.div>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default Experience;