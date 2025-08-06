import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme, keyframes } from "styled-components";
import logoImage from "../images/galaxy.png";
import githubIcon from "../images/github.png";
import { Bio } from "../data/constants";
import { MenuRounded, Close } from "@mui/icons-material";

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

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Nav = styled.nav`
  background: rgba(17, 25, 40, 0.85);
  backdrop-filter: blur(20px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(139, 69, 255, 0.2);
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(139, 69, 255, 0.05),
      rgba(255, 0, 110, 0.03),
      rgba(139, 69, 255, 0.02)
    );
    opacity: 0.8;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  @media (max-width: 960px) {
    padding: 0 16px;
  }
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  img {
    height: 42px;
    max-width: 42px;
    object-fit: contain;
    animation: ${rotate} 8s infinite linear;
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(139, 69, 255, 0.3));
  }

  span {
    margin-left: 12px;
    font-family: "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.text_primary},
      ${({ theme }) => theme.primary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);

    img {
      animation-duration: 2s;
      transform: scale(1.1);
      filter: drop-shadow(0 6px 12px rgba(139, 69, 255, 0.5));
    }

    span {
      animation: ${glowPulse} 1.5s ease-in-out infinite;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 36px;
    }

    span {
      font-size: 1.3rem;
      margin-left: 10px;
    }
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: ${({ theme }) => theme.text_primary}CC;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  padding: 8px 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary},
      #ff006e
    );
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 1px;
  }

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translateY(-2px);

    &::after {
      width: 100%;
    }
  }

  &:active {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  font-family: "Space Grotesk", sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-width: 140px;
  padding: 12px 24px;

  background: linear-gradient(135deg, #8b45ff 0%, #ff006e 50%, #8b45ff 100%);
  background-size: 200% 200%;
  border-radius: 50px;
  border: 2px solid transparent;

  font-weight: 600;
  font-size: 14px;
  color: white;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;

  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  box-shadow: 0 4px 16px rgba(139, 69, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
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
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    background-position: 100% 0;
    box-shadow: 0 8px 24px rgba(139, 69, 255, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
    }
  }

  img {
    width: 20px;
    height: 20px;
    filter: brightness(1.2);
  }
`;

const MobileIcon = styled.button`
  display: none;
  background: rgba(139, 69, 255, 0.1);
  border: 1px solid rgba(139, 69, 255, 0.3);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(139, 69, 255, 0.2);
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 69, 255, 0.3);
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  width: 280px;
  max-width: 90vw;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(20px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px 0 0 20px;
  border: 1px solid rgba(139, 69, 255, 0.2);
  box-shadow: 0 16px 40px rgba(139, 69, 255, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.3);
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  animation: ${({ $isOpen }) => ($isOpen ? slideDown : "none")} 0.3s ease;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(139, 69, 255, 0.08),
      rgba(255, 0, 110, 0.05),
      rgba(139, 69, 255, 0.03)
    );
    border-radius: 20px 0 0 20px;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  ${NavLink} {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 14px 0;
    border-bottom: 1px solid rgba(139, 69, 255, 0.15);
    font-size: 16px;

    &:last-of-type {
      border-bottom: none;
    }

    &:hover {
      color: ${({ theme }) => theme.primary};
      padding-left: 8px;
    }
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-family: "Space Grotesk", sans-serif;
    color: ${({ theme }) => theme.text_primary};
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.text_primary},
      ${({ theme }) => theme.primary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const CloseButton = styled.button`
  background: rgba(139, 69, 255, 0.1);
  border: 1px solid rgba(139, 69, 255, 0.3);
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(139, 69, 255, 0.2);
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <img src={logoImage} alt="Galaxy Icon" loading="lazy" />
            <span>Roshan</span>
          </NavLogo>

          <MobileIcon
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <MenuRounded />
          </MobileIcon>

          <NavItems>
            <li>
              <NavLink href="#About">About</NavLink>
            </li>
            <li>
              <NavLink href="#Skills">Skills</NavLink>
            </li>
            <li>
              <NavLink href="#Experience">Experience</NavLink>
            </li>
            <li>
              <NavLink href="#Projects">Projects</NavLink>
            </li>
            <li>
              <NavLink href="#Education">Education</NavLink>
            </li>
          </NavItems>

          <ButtonContainer>
            <GithubButton
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub Icon" />
              Github
            </GithubButton>
          </ButtonContainer>
        </NavbarContainer>
      </Nav>

      {isOpen && (
        <>
          <MobileMenuOverlay $isOpen={isOpen} onClick={closeMenu} />
          <MobileMenu $isOpen={isOpen}>
            <MobileMenuHeader>
              <h3>Navigation</h3>
              <CloseButton
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <Close />
              </CloseButton>
            </MobileMenuHeader>

            <NavLink href="#About" onClick={closeMenu}>
              About
            </NavLink>
            <NavLink href="#Skills" onClick={closeMenu}>
              Skills
            </NavLink>
            <NavLink href="#Experience" onClick={closeMenu}>
              Experience
            </NavLink>
            <NavLink href="#Projects" onClick={closeMenu}>
              Projects
            </NavLink>
            <NavLink href="#Education" onClick={closeMenu}>
              Education
            </NavLink>
            <GithubButton
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, #FF006E 100%)`,
                marginTop: "12px",
                fontSize: "13px",
              }}
            >
              <img src={githubIcon} alt="GitHub Icon" />
              Github Profile
            </GithubButton>
          </MobileMenu>
        </>
      )}
    </>
  );
};

export default Navbar;
