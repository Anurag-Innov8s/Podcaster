import React from 'react'
import styled from 'styled-components'

const DashBoard = styled.div``;
const FilterContainer = styled.div``;
const Topic = styled.div``;
const Span = styled.div``;
const Dashboard = () => {
  return (
    <div>
      <DashBoard>
        <FilterContainer>
            <Topic>Most Popular<Span>Show All</Span></Topic>
        </FilterContainer>
      </DashBoard>
    </div>
  )
}

export default Dashboard
