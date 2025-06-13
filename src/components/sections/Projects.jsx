import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/constants";

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(139, 69, 255, 0.8), 0 0 40px rgba(139, 69, 255, 0.6); }
  50% { text-shadow: 0 0 30px rgba(139, 69, 255, 1), 0 0 60px rgba(139, 69, 255, 0.8); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 80px 30px;
  position: relative;
  z-index: 1;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 66px 16px;
    margin-top: 30px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
    margin-top: 20px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}30, transparent);
    animation: ${float} 8s ease-in-out infinite;
    pointer-events: none;
  }
  
  &::before {
    width: 300px;
    height: 300px;
    top: 15%;
    right: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    width: 200px;
    height: 200px;
    bottom: 20%;
    left: 15%;
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
  max-width: 1200px;
  gap: 12px;
  z-index: 2;
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
    margin-bottom: 30px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  background: ${({ theme }) => theme.card}DD;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.primary}30;
  border-radius: 50px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 32px 0 48px 0;
  padding: 6px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 0 20px ${({ theme }) => theme.primary}15;
  
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin: 24px 0 36px 0;
    padding: 4px;
  }
  
  @media (max-width: 580px) {
    flex-wrap: wrap;
    border-radius: 20px;
    gap: 4px;
    justify-content: center;
  }
`;

const ToggleButton = styled.div`
  padding: 14px 28px;
  border-radius: 44px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  color: ${({ theme, $active }) => $active ? 'white' : theme.text_primary + 'CC'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  
  background: ${({ theme, $active }) => 
    $active 
      ? `linear-gradient(135deg, ${theme.primary} 0%, #FF006E 50%, ${theme.primary} 100%)`
      : 'transparent'
  };
  
  background-size: 200% 200%;
  
  box-shadow: ${({ theme, $active }) =>
    $active 
      ? `0 8px 25px ${theme.primary}40, 0 4px 12px rgba(0, 0, 0, 0.15)`
      : 'none'
  };
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover {
    transform: translateY(-2px);
    color: ${({ theme, $active }) => $active ? 'white' : theme.text_primary};
    background-position: 100% 0;
    
    ${({ $active }) => !$active && `
      background: rgba(139, 69, 255, 0.1);
    `}
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 11px;
    border-radius: 20px;
  }
  
  @media (max-width: 580px) {
    padding: 8px 16px;
    font-size: 10px;
    flex: 1;
    min-width: fit-content;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 400px;
  
  @media (max-width: 960px) {
    gap: 20px;
  }
  
  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const ProjectCard = styled.div`
  width: 330px;
  height: 490px;
  background: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 460px;
    padding: 20px 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  max-height: 60px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.text_primary + '10'};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + '15'};
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
  flex: 1;
  overflow: hidden;
`;

const ProjectTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow-y: auto;
  margin-top: 8px;
  display: -webkit-box;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.4;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.text_primary + '10'};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary + 'CC'};
  }
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
  
  &:first-child {
    margin-left: 0px;
  }
`;

const Button = styled.a`
  display: none;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.8s ease-in-out;
  text-decoration: none;
  text-align: center;
  
  ${ProjectCard}:hover & {
    display: block;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-family: 'Inter', sans-serif;
  text-align: center;
  
  &::before {
    content: '🔍';
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text_primary};
  }
  
  p {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.3
    }
  }
};

const categories = [
  { key: "all", label: "All" },
  { key: "major", label: "Major" },
  { key: "mini", label: "Mini" }
];

const ProjectCardComponent = ({ project }) => {
  const handleImageClick = () => {
    if (project.webapp) {
      window.open(project.webapp, '_blank');
    }
  };

  return (
    <ProjectCard>
      <Image 
        src={project.image} 
        alt={project.title}
        onClick={handleImageClick}
      />
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <ProjectTitle>{project.title}</ProjectTitle>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
        {project.member && (
          <Members>
            {project.member?.map((member, index) => (
              <Avatar key={index} src={member.img} alt={member.name} />
            ))}
          </Members>
        )}
      </Details>
      {project.github && (
        <Button href={project.github} target="_blank" rel="noopener noreferrer">
          View Code
        </Button>
      )}
    </ProjectCard>
  );
};

const Projects = () => {
  const [toggle, setToggle] = useState("all");

  const filteredProjects = useMemo(() => {
    return toggle === "all" ? projects : projects.filter(project => project.category === toggle);
  }, [toggle]);

  return (
    <Container id="Projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Wrapper>
          <motion.div variants={itemVariants}>
            <Title>Projects</Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Desc>
              I have worked on a wide range of projects. From major full-stack applications to mini projects. Here are some of my projects.
            </Desc>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ToggleButtonGroup>
              {categories.map((category) => (
                <ToggleButton
                  key={category.key}
                  $active={toggle === category.key}
                  onClick={() => setToggle(category.key)}
                >
                  {category.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </motion.div>

          <CardContainer>
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={toggle}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                      }
                    },
                    exit: { opacity: 0 }
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    gap: '28px',
                    flexWrap: 'wrap',
                    width: '100%'
                  }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={`${project.id || project.title}-${index}`}
                      variants={cardVariants}
                      layout
                    >
                      <ProjectCardComponent project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EmptyState>
                    <h3>No Projects Found</h3>
                    <p>No projects available in this category yet.</p>
                  </EmptyState>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContainer>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default Projects;