import React from 'react'
// import { Link } from 'react-router-dom'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded'
import { Avatar, IconButton } from '@mui/material';
import styled from 'styled-components';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important;
  color: white !important;
  display:none;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
`;
const Card = styled.div`
    position:relative;
    text-decoration:none;
    background-color:${({ theme }) => theme.card};
    max-width:220px;
    height:280px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    padding:16px;
    border-radius:6px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
    &:hover{
        cursor:pointer;
        transform:translateY(-8px);
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
        filter: brightness(1.3);
    } 
    &:hover ${PlayIcon}{
        display:flex;
    }
`;
const Top = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:150px;
    positon:relative;

`;
const Favorite = styled(IconButton)`
    color:white;
    top: 8px;
    right: 6px;
    padding: 6px !important;
    border-radius: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.text_secondary + 95} !important;
    color: white !important;
    position: absolute !important;
    backdrop-filter: blur(4px);
    box-shadow: 0 0 16px 6px #222423 !important;
`;
const CardImage = styled.img`
    object-fit:cover;
    width:220px;
    height:140px;
    border-radius:6px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        &:hover{
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`;
const CardInfo = styled.div`
    display:flex;
    align-items:felx-end;
    font-weight:450;
    padding:14px 0px 0px 0px;
    width:100%;
`;
const MainInfo = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    justify-content:flex-start;
    gap:4px;
`;
const Title = styled.div`
    overflow:hidden;
    display:-webkit-box;
    max-width:100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow:hidden;
    text-transform:ellipsis;
    color: ${({ theme }) => theme.text_primary};
`;
const Description = styled.div`
    overflow:hidden;
    display:-webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 12px;
`;
const CreatorInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 6px;
`;
const Creator = styled.div`
    display:flex;
    gap:8px;
    align-items:center;
`;
const CreatorName = styled.div`
    font-size:12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.text_secondary};`;
const Views = styled.div`
    font-size:10px;
    color: ${({ theme }) => theme.text_secondary};
    width: max-content;
`;




const PodCastCard = () => {
    return (
        <Card>
            <div>
                <Top>
                    <Favorite >
                        <FavoriteRounded style={{ width: "16px", height: "16px" }}/>
                    </Favorite>

                    <CardImage src='https://imgs.search.brave.com/c-7--gsnxYnx3vdsrMEm8slEdkTn6I4mXzkTbpHwS7c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b193ZWJwLHFfZ2xv/c3N5LHJldF9pbWcs/d180MjYsaF80MjAv/aHR0cHM6Ly9ibG9n/LnNuYXBwYS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDYvU2NyZWVuLVNo/b3QtMjAxOC0wNi0x/NC1hdC0zLjAxLjAx/LVBNLnBuZw'></CardImage>
                </Top>
                <CardInfo>
                    <MainInfo>
                        <Title>Yamete Kudasai</Title>
                        <Description>Move like a cadillac, Sting like a beemer
                            Move like a cadillac, Sting like a beemer
                            Move like a cadillac, Sting like a beemer
                            Move like a cadillac, Sting like a beemer
                            Move like a cadillac, Sting like a beemer


                        </Description>
                        <CreatorInfo>
                            <Creator>
                                <Avatar style={{ width: "26px", height: "26px" }}>A</Avatar>
                                <CreatorName>Anurag</CreatorName>
                            </Creator>
                            <Views>18 Views</Views>
                        </CreatorInfo>
                    </MainInfo>
                </CardInfo>
            </div>
            <PlayIcon>
            
                {"video" === "vide0" ? 
                    <PlayArrowIcon></PlayArrowIcon>
                 : <HeadphonesIcon></HeadphonesIcon>}
            </PlayIcon>
        </Card>
    )
}

export default PodCastCard
