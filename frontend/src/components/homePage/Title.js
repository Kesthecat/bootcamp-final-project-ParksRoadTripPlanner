import styled, { keyframes } from "styled-components";

export const Title = () => {
  return (
    <Container>
      <StyledP className="canada">Canada</StyledP>
      <StyledP className="roadtrip">Road Trip</StyledP>
      <StyledP className="planner">Planner</StyledP>
    </Container>
  );
};

///animations
const fadeIn = keyframes`
from {
  opacity: 0;
}
to{
  opacity: 1;
}
`;
const Container = styled.div`
  margin-left: 125px;
  z-index: 25;
  animation: ${fadeIn}, 500ms;
`;
const StyledP = styled.p`
  font-family: var(--font-logo);
  font-size: 100px;
  /* &.canada {   
    animation : ${fadeIn}, 300ms; 
  }
  }
  &.roadtip{
    animation: ${fadeIn}, 600ms;
  }
  &.planner{
    animation: ${fadeIn}, 900ms;
  } */
`;
