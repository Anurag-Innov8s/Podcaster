import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import { lightTheme, darkTheme } from "./Utils/Themes"
import SideBar from './Components/SideBar';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import { Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Search from './Pages/Search';
import Favourites from './Pages/Favourites';
import PodcastDetails from './Pages/PoscastDetails';
import Profile from './Pages/Profile';
import DisplayPodcast from './Pages/DisplayPodcast';

const Container = styled.div`
    display:flex;
    background:${({ theme }) => theme.bgLight};
    width:100%;
    height:100vh;
    overflow-x:hidden;
    overflow-y:hidden;
  `
const Frame = styled.div`
  display:flex;
  flex-direction:column;
  flex:3;
`;
function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <BrowserRouter>
        <Container>{
          menuOpen && <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        }
          <Frame>
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Routes>
              <Route path='/' exact element={<Dashboard/>}></Route>
              <Route path='/search' exact element={<Search/>}></Route>
              <Route path='/favourites' exact element={<Favourites/>}></Route>
              <Route path='/profile' exact element={<Profile/>}></Route>
              <Route path='/podcast/:id' exact element={<PodcastDetails/>}></Route>
              <Route path='/showPodcast/:type' exact element={<DisplayPodcast/>}></Route>
            </Routes>
          </Frame>
        </Container>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
