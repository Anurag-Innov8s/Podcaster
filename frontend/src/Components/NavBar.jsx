import React from 'react'
import styled from 'styled-components'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Person from '@mui/icons-material/Person';

const NavBarDiv = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    padding:16px 40px;
    align-items:center;
    box-sizing:border-box;
    color:${({ theme }) => theme.text_primary};
    gap:30px;
    background:${({ theme }) => theme.bglight};
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter:blur(5.7px);
    -webkit-backdrop-filter:blur(5.7px);
    @media(max-width:768px){
        padding:16px
    }

`;
const LoginBtn = styled.div`
    display:flex;
    flex-direction:row;
    gap:6px;
    padding:10px 14px;
    cursor:pointer;
    border: 1px solid ${({theme})=>theme.primary};
    border-radius: 12px;
    max-width:70%;
    text-align:center;
    align-itmes:center;
    justify-content:center;
    background:${({ theme }) => theme.bg};
    &:hover{
        background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
    }
`;
const IconBtn = styled.div`
cursor:pointer;
    color:${({theme})=>theme.text_primary}
`;
const Welcome = styled.div`
    font-size:24px;
`;
const NavBar = ({menuOpen, setMenuOpen}) => {
    return (
        <NavBarDiv>   
        <IconBtn onClick={()=>setMenuOpen(!menuOpen)} >
            <MenuIcon/>
        </IconBtn>
        <Welcome>Welcome</Welcome>
        <LoginBtn>
            <PersonIcon/>Login
        </LoginBtn>            
        </NavBarDiv>
    )
}

export default NavBar
