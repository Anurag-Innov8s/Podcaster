import React from 'react'
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
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")};
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
margin-top:9px;
display: none;
cursor:pointer;
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
width:100%;
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
padding: 0px 6px;
gap:25px;

`;

const SideBar = ({ menuOpen, setMenuOpen, darkMode, setDarkMode }) => {
    const menuItem = [
        {
            link: "/",
            name: "Dashboard",
            icon: <HomeRoundedIcon />
        },
        {
            link: "/search",
            name: "Search",
            icon: <SearchRoundedIcon />
        },
        {
            link: "/favourites",
            name: "Favourites",
            icon: <FavoriteRoundedIcon />
        },
    ]
    const buttonItem = [
        {
            fun: () => console.log("function"),
            name: "Upload",
            icon: <BackupRoundedIcon />
        },
        {
            fun: () => setDarkMode(!darkMode),
            name: darkMode ? "Light Mode" : "Dark Mode",
            icon: darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />
        },
        {
            link: "/favourites",
            name: "Log Out",
            icon: <ExitToAppRoundedIcon />
        },
    ]
    return (

        <MenuContainer menuOpen={menuOpen}>
            <Flex>
                <Logo>
                    <Image src={LogoIcon}></Image>
                    PODCASTER
                </Logo>
                <Close onClick={() => { setMenuOpen(false) }}>
                    <CloseRounded></CloseRounded>
                </Close>
            </Flex>
            {menuItem.map((item) => (
                <Link to={item.link} style={{ textDecoration: "none", width: "100%" }}>
                    <Element>
                        {item.icon}
                        <NavText>{item.name}</NavText>
                    </Element>
                </Link>
            ))}
            <HR />
            {
                buttonItem.map((item) => (
                    <Element onClick={item.fun}>
                        {item.icon}
                        <NavText>{item.name}</NavText>
                    </Element>
                ))
            }

        </MenuContainer>
    )
}

export default SideBar
