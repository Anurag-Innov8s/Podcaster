import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import PodCastCard from '../Components/PodCastCard';

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
const FilterContainer = styled.div`
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
const Span = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size:16px;
  font-weight:400;
  cursor:pointer;
  
  @media(max-width:768px){
    font-size:14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover{
    transition: 0.2s ease-in-out;
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

const Dashboard = () => {
  return (
    
      <DashBoard>
        <FilterContainer>
            <Topic>Most Popular
            <Link to="/showpodcast/mostpopular" style={{textDecoration:"none"}}></Link>
            <Span>Show All</Span>
            </Topic>
            <PodCast>
              <PodCastCard/>
              <PodCastCard/>
              <PodCastCard/>
              <PodCastCard/>
              <PodCastCard/>
            </PodCast>
        </FilterContainer>

        <FilterContainer>
            <Topic>Comedy
            <Link to="/showpodcast/comedy" style={{textDecoration:"none"}}></Link>
            <Span>Show All</Span>
            </Topic>
            <PodCast>
            <PodCastCard/>
            <PodCastCard/>
            <PodCastCard/>
            </PodCast>
        </FilterContainer>

        <FilterContainer>
            <Topic>News
            <Link to="/showpodcast/news" style={{textDecoration:"none"}}></Link>
            <Span>Show All</Span>
            </Topic>
            <PodCast>
            <PodCastCard/>
            <PodCastCard/>
            <PodCastCard/>
            </PodCast>
        </FilterContainer>

        <FilterContainer>
            <Topic>Crime
            <Link to="/showpodcast/crime" style={{textDecoration:"none"}}></Link>
            <Span>Show All</Span>
            </Topic>
            <PodCast>
              <PodCastCard/>
              <PodCastCard/>
            </PodCast>
        </FilterContainer>

        <FilterContainer>
            <Topic>Sports
            <Link to="/showpodcast/sports" style={{textDecoration:"none"}}></Link>
            <Span>Show All</Span>
            </Topic>
            <PodCast>
            <PodCastCard/>
            <PodCastCard/>
            <PodCastCard/>
            <PodCastCard/>
            </PodCast>
        </FilterContainer>
      </DashBoard>
    
  )
}

export default Dashboard
