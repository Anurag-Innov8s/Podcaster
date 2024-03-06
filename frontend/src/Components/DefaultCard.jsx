import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    align-items:center;
    justify-content:center;
    height:150px;
    min-width:18rem;
    border-radius:0.6rem;
    padding:1rem;
    &:hover{
        cursor:pointer;
        transform:translateY(-8px);
        transition:all 0.4s ease-in-out;
        box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
        filter: brighness(1.3);
    }
    @media(max-width:768){
        width:250px;
        
    }

`;
const Name = styled.div`
    color:#F2F3F4;
    font-size:1.4rem;
    font-weight:600;
`;
const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
`;
const Image = styled.img`
    width:80px;
    height:90px;
    object-fit:cover;
    clip-path:polygon(0 0,100% 0, 100% 66%, 0 98%);
    transform:rotate(20deg);
`;

const DefaultCard = ({category}) => {
  return (
    <Card style={{background:category.color}}>
        <Name>{category.name}</Name>
        <Container>
            <Image
                src={category.img} 
                alt="podcast-image"
            />
            
        </Container>
    </Card>
  )
}

export default DefaultCard
