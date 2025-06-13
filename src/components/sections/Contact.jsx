import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(139, 69, 255, 0.6); }
  50% { text-shadow: 0 0 30px rgba(139, 69, 255, 0.9); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

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
    left: 5%;
    animation-delay: 0s;
  }
  &::after {
    width: 200px;
    height: 200px;
    bottom: 20%;
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

const ContactForm = styled(motion.form)`
  width: 95%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card}DD;
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.primary}30;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 30px ${({ theme }) => theme.primary}20,
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 28px;
  gap: 20px;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary}20,
      transparent
    );
    animation: ${shimmer} 3s ease-in-out infinite;
  }
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ContactTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary}CC;
  margin-left: 4px;
`;

const ContactInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.bg}80;
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => theme.text_secondary}30;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
    font-weight: 400;
  }
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 
      0 0 0 3px ${({ theme }) => theme.primary}20,
      0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary}60;
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background: ${({ theme }) => theme.bg}80;
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => theme.text_secondary}30;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px 20px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
    font-weight: 400;
  }
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 
      0 0 0 3px ${({ theme }) => theme.primary}20,
      0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary}60;
  }
`;

const ContactButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}CC);
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 8px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 10px 30px ${({ theme }) => theme.primary}40,
      0 0 20px ${({ theme }) => theme.primary}30;
    &::before {
      left: 100%;
    }
  }
  &:active {
    transform: translateY(0px);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 }
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

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Container id="Contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Wrapper>
          <motion.div variants={itemVariants}>
            <Title>Get In Touch</Title>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Desc>
              Have a question or want to work together? I'd love to hear from you. 
              Send me a message and I'll respond as soon as possible!
            </Desc>
          </motion.div>

          <ContactForm
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <ContactTitle>Let's Connect 🚀</ContactTitle>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="name">Your Name</Label>
              <ContactInput
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="email">Email Address</Label>
              <ContactInput
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="subject">Subject</Label>
              <ContactInput
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                required
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="message">Message</Label>
              <ContactInputMessage
                id="message"
                name="message"
                placeholder="Tell me more about your project, question, or just say hello!"
                rows={5}
                required
              />
            </FormGroup>

            <ContactButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </ContactButton>
          </ContactForm>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default Contact;
