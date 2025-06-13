import React from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import { Router,BrowserRouter} from 'react-router-dom';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import StarCanvas from './components/canvas/Stars';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

const Body = styled.div`
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    width: 100%;
    overflow-x: hidden;
    position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <StarCanvas />
          <div>
            <Hero />
            <Wrapper>
              <Skills />
              <Experience />
            </Wrapper>
            <Projects />
            <Wrapper>
              <Education />
              <Contact />
            </Wrapper>
            <Footer />
          </div>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App