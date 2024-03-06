import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import {Category} from '../Utils/Data'
import DefaultCard from '../Components/DefaultCard';


const SearchBar = styled.div`
  padding:20px 30px;
  padding-bottom:200px;
  height:100%;
  overflow-y:scroll;
  overflow-x:hidden;
  display:flex;
  flex-direction:column;
  gap:20px;
  @media(max-width:768px){
    padding:20px 9px;
  }

`;
const SearchItem = styled.div`
  max-width:700px;
  display:flex;
  width:100%;
  border: 1px solid ${({theme})=>theme.text_secondary};
  border-radius:30px;
  cursor:pointer;
  padding:12px 16px;
  justify-content:flex-start;
  align-items:center;
  gap:6px;
  color:${({theme})=>theme.text_secondary}
`;
const Categories = styled.div`
  margin:20px 10px;
`;
const Heading = styled.div`
  align-items:flex:start;
  color:${({theme})=>theme.text_primary};
  font-size:22px;
  font-weight:500;
  margin:10px 14px;
`;
const Cards = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  padding:14px;
  @media(max-width:768px){
    justify-content:center;
  }
`;

const Search = () => {
  return (
    <SearchBar>
    <div style={{display:'flex', justifyContent:'center',width:'100%'}}>
      <SearchItem>
        <SearchIcon sx={{"color":"inherit"}}/>
        <input type='text' 
        placeholder='Search Artist/Podcast' 
        style={{ backgroundColor: 'inherit', color:'inherit', border:'none', outline:'none',width:'100%' }}></input>
      </SearchItem>
      </div>

      <Categories>
        <Heading>Browse All</Heading>
          <Cards>
            {Category.map((category)=>(
              <DefaultCard category={category}></DefaultCard>
            ))}
          </Cards>
      </Categories>
    </SearchBar>
  )
}

export default Search
