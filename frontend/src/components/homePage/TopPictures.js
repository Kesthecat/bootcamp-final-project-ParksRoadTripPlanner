import camperVan from "../../assets/campervan-rental-companies-770x513.jpg";
import camping from "../../assets/camping.jpg";
import hiking from "../../assets/hikingFamily.jpg";
import styled, { keyframes } from "styled-components";

export const TopPictures = () => {
  return (
    <Container>
      <StyledImg src={camperVan} alt="Camper Van" className="van" />
      <StyledImg src={hiking} alt="hiking" className="hiking" />
      <StyledImg src={camping} alt="Camping" className="camping" />
    </Container>
  );
};

////animation
const dropInFirst = keyframes`
from {top: -425px; opacity: 0;}
to{top: 0px; opacity: 1;}
`;
const dropInSec = keyframes`
from {top: -425px; opacity: 0;}
to{top: -39px; opacity: 1;}
`;
const dropInThird = keyframes`
from {top: -425px; opacity: 0;}
to{top: -80px; opacity: 1;}
`;

const Container = styled.div`
  display: inline-block;
  margin: 0 5%;
  margin-bottom: 25px;
`;

const StyledImg = styled.img`
  display: inline-block;
  position: relative;
  z-index: -1;

  &.van {
    width: 450px;
    animation: ${dropInFirst} 300ms ease-in;
  }
  &.hiking {
    width: 365px;
    top: -39px;
    animation: ${dropInSec} 600ms ease-in;
  }
  &.camping {
    width: 330px;
    top: -80px;
    animation: ${dropInThird} 1s ease-in;
  }
`;
