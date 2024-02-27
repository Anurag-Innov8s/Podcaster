import React from 'react'
import styled from 'styled-components'
import PodCastCard from '../Components/PodCastCard'

const DashBoard = styled.div`
  padding:20px 30px;
  padding-bottom:200px;
  height:100%;
  overflow-y:scroll;
  display:flex;
  flex-direction:column;
  gap:20px;
  @media(max-width:768px){
    padding:6px 10px;
  }
`;
const Container = styled.div`
  background-color:${({theme})=>theme.bg};
  display:flex;
  flex-direction:column;
  border-radius:10px;
  padding:20px 30px;
`;

const Topic = styled.div`
  color:${({theme})=>theme.text_primary};
  font-size:24px;
  font-weight:500;
  display:flex;
  justify-content: space-between;
  align-items:center;
  @media(max-width:768px){
    font-size:18px;
  }
`;
const PodCast = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  padding:18px 6px;
  @media(max-width:768px){
    justify-content:center;
  }
`;
const Favourites = () => {
  return (
    <DashBoard>
      <Container>
        <Topic>Favorites
        </Topic>
        <PodCast>
          <PodCastCard />
          <PodCastCard />
          <PodCastCard />
          <PodCastCard />
          <PodCastCard />
        </PodCast>
      </Container>
    </DashBoard>

    
  )
}

export default Favourites
