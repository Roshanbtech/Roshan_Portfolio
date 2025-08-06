import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import { Instagram, LinkedIn, GitHub, Email } from "@mui/icons-material";
import logoImage from "../../images/galaxy.png";
import { InteractiveGridPattern } from "../canvas/Grid";

const FooterContainer = styled.div`
  width: 100vw;
  min-height: 240px;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.bg};
`;

const GridBG = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  z-index: 2;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.text_primary}CC;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary}CC;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary}80;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <GridBG>
      <InteractiveGridPattern
        squares={[36, 6]} // Adjust for density and height
        width={38}
        height={36}
      />
    </GridBG>
    <FooterWrapper>
      <Logo>
        <img src={logoImage} alt="Galaxy Icon" loading="lazy" />
        <span>Roshan</span>
      </Logo>
      <Nav>
        <NavLink href="#About">About</NavLink>
        <NavLink href="#Skills">Skills</NavLink>
        <NavLink href="#Experience">Experience</NavLink>
        <NavLink href="#Projects">Projects</NavLink>
        <NavLink href="#Education">Education</NavLink>
      </Nav>
      <SocialMediaIcons>
        <SocialMediaIcon href={`mailto:${Bio.email}`} target="_blank">
          <Email />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.github} target="_blank">
          <GitHub />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.linkedin} target="_blank">
          <LinkedIn />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.insta} target="_blank">
          <Instagram />
        </SocialMediaIcon>
      </SocialMediaIcons>
      <Copyright>
        &copy; {new Date().getFullYear()} Roshan Reji. All rights reserved.
      </Copyright>
    </FooterWrapper>
  </FooterContainer>
);

export default Footer;
