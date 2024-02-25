import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import { lightTheme, darkTheme } from "./Utils/Themes"
import SideBar from './Components/SideBar';
import { BrowserRouter } from 'react-router-dom';

const Container = styled.div`
    display:flex;
    background:${({ theme }) => theme.bg};
    width:100%;
    height:100vh;
    overflow-x:hidden;
    overflow-y:hidden;
  `
function App() {

  const [darkMode, setDarkMode] = useState(true);
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <SideBar />
        </Container>
      </ThemeProvider>
    </BrowserRouter>


  );
}

export default App;
