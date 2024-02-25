import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import LogoIcon from '../Images/mic.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom'
import { lightTheme, darkTheme } from "../Utils/Themes"


const MenuContainer = styled.div`
        flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
    `;

const Logo = styled.div`
    color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
    justify-content: center;
         gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px; 
        
    
   `;
const Image = styled.img`
    height : 35px`;
const Close = styled.div`
display: none;
@media (max-width: 1100px) {
  display: block;

}
`;
const Element = styled.div`
        padding: 4px 16px;
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content: flex-start;
align-items: center;
gap: 12px;
cursor: pointer;
color:  ${({ theme }) => theme.text_secondary};
width: 100%;
&:hover{
    background-color: ${({ theme }) => theme.text_secondary + 50};
}

    `;
const NavText = styled.div`
padding: 12px 0px;
`;
const HR = styled.div`
width: 100%;
height: 1px;
background-color: ${({ theme }) => theme.text_secondary + 50};
margin: 10px 0px;
`;
const Flex = styled.div`
justify-content: space-between;
display: flex;
align-items: center;
padding: 0px 16px;
width: 86%;
`;

const SideBar = () => {
    const [darkMode, setDarkMode] = useState(false);

  const currentTheme = darkMode ? darkTheme : lightTheme;
    return (

        <MenuContainer>
            <Flex>
                <Logo>
                    <Image src={LogoIcon}></Image>
                    Podcaster
                </Logo>
                <Close>
                    <CloseRounded></CloseRounded>
                </Close>
            </Flex>
            <Link>
                <Element>
                    <HomeRoundedIcon></HomeRoundedIcon>
                    <NavText>DashBoard</NavText>
                </Element>
            </Link>
            <Link>
                <Element>
                    <SearchRoundedIcon></SearchRoundedIcon>
                    <NavText>Search</NavText>
                </Element>
            </Link>
            <Link>
                <Element>
                    <FavoriteRoundedIcon></FavoriteRoundedIcon>
                    <NavText>Favourites</NavText>
                </Element>
            </Link>
            <HR />
            <Element>
                <BackupRoundedIcon></BackupRoundedIcon>
                <NavText>Upload</NavText>
            </Element>

            <Element onClick={() => setDarkMode(!darkMode)} style={{ backgroundColor: currentTheme.bg }}>
      {darkMode ? (
        <LightModeRoundedIcon style={{ color: currentTheme.text_primary }} />
      ) : (
        <DarkModeRoundedIcon style={{ color: currentTheme.text_primary }} />
      )}
      <NavText style={{ color: currentTheme.text_primary }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</NavText>
    </Element>
            <Element>
                <ExitToAppRoundedIcon></ExitToAppRoundedIcon>
                <NavText>Log Out</NavText>
            </Element>

        </MenuContainer>
    )
}

export default SideBar
