import lake from "../../assets/lakeLouise.jpeg";
import rocherPerce from "../../assets/rocher-perce-gaspesie-.jpg";
import beach from "../../assets/sandbanks.jpg";
import styled, { keyframes } from "styled-components";

export const BottomPictures = () => {
  return (
    <Container>
      <StyledImg src={lake} alt="Lake Louise" className="lake" />
      <StyledImg src={rocherPerce} alt="Rocher Perce" className="rock" />
      <StyledImg src={beach} alt="Sandbanks' beach" className="beach" />
    </Container>
  );
};

///animation
const PopUp1 = keyframes`
from {bottom: -256px; opacity: 0;}
to{bottom: 0px; opacity: 1;}
`;
const PopUp2 = keyframes`
from {bottom: -220px; opacity: 0;}
to{bottom: 0px; opacity: 1;}
`;
const PopUp3 = keyframes`
from {bottom: -175px; opacity: 0;}
to{bottom: 0px; opacity: 1;}
`;

const Container = styled.div`
  z-index: -5;
  display: inline-block;
  margin: 0 5%;
  margin-top: 25px;
`;

const StyledImg = styled.img`
  position: relative;

  &.lake {
    width: 461px;
    animation: ${PopUp1} 300ms ease-in;
  }
  &.rock {
    width: 390px;
    z-index: 10;
    animation: ${PopUp2} 600ms ease-in;
  }
  &.beach {
    width: 290px;
    animation: ${PopUp3} 1s;
  }
`;
