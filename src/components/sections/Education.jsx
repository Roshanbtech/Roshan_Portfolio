import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { education } from "../../data/constants";
import EducationCard from "../cards/EducationCard";
import EarthCanvas from "../canvas/Earth";
import { InteractiveGridPattern }from "../canvas/Grid";
import Meteors from "../canvas/Meteors";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(139, 69, 255, 0.6); }
  50% { text-shadow: 0 0 30px rgba(139, 69, 255, 0.9); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 30px;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 60px 16px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}20, transparent);
    top: 20%;
    right: 10%;
    animation: ${float} 6s ease-in-out infinite;
    pointer-events: none;
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
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 20px;
  
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  animation: ${fadeInUp} 0.8s ease-out, ${glowPulse} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Desc = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-align: center;
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary}CC;
  max-width: 650px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const TimelineContainer = styled.div`
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  
  .vertical-timeline::before {
    background: linear-gradient(180deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}70);
    width: 3px;
  }
  
  .vertical-timeline-element-content {
    background: ${({ theme }) => theme.card}DD;
    backdrop-filter: blur(12px);
    border: 1px solid ${({ theme }) => theme.primary}25;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px ${({ theme }) => theme.primary}15;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .vertical-timeline-element-content:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 25px ${({ theme }) => theme.primary}25;
  }
  
  .vertical-timeline-element-icon {
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}BB);
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary}30;
  }
  
  .vertical-timeline-element-date {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }
`;

const EarthContainer = styled.div`
  margin-top: 40px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Education = () => {
  return (
    <Container id="Education">
      <InteractiveGridPattern />
      <Meteors number={24} color="#8b45ff" angle={220} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Wrapper>
          <motion.div variants={itemVariants}>
            <Title>Education</Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Desc>
              My educational journey has been a path of continuous learning, growth, and discovery in technology and innovation.
            </Desc>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TimelineContainer>
              <VerticalTimeline>
                {education.map((edu, index) => (
                  <EducationCard key={index} education={edu} />
                ))}
              </VerticalTimeline>
            </TimelineContainer>
          </motion.div>

          <motion.div variants={itemVariants}>
            <EarthContainer>
              <EarthCanvas />
            </EarthContainer>
          </motion.div>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default Education;