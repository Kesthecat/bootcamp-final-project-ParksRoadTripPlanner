import lake from "../../assets/lakeLouise.jpeg";
import rocherPerce from "../../assets/rocher-perce-gaspesie-.jpg";
import beach from "../../assets/sandbanks.jpg";
import styled from "styled-components";

export const BottomPictures = () => {
  return (
    <Container>
      <StyledImg src={lake} alt="Lake Louise" className="lake" />
      <StyledImg src={rocherPerce} alt="Rocher Perce" className="rock" />
      <StyledImg src={beach} alt="Sandbanks' beach" className="beach" />
    </Container>
  );
};
const Container = styled.div`
  z-index: -5;
  display: inline-block;
  margin: 0 5%;
  margin-top: 25px;
`;

const StyledImg = styled.img`
  /* display: inline-block; */
  position: relative;
  /* opacity: 0.6; */

  &.lake {
    width: 461px;
  }
  &.rock {
    width: 390px;
    z-index: 10;
  }
  &.beach {
    width: 290px;
    /* right: 175px; */
  }
`;
