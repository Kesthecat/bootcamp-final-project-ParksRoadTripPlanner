import camperVan from "../../assets/campervan-rental-companies-770x513.jpg";
import camping from "../../assets/camping.jpg";
import hiking from "../../assets/hikingFamily.jpg";
import styled from "styled-components";

export const TopPictures = () => {
  return (
    <Container>
      <StyledImg src={camperVan} alt="Camper Van" className="van" />
      <StyledImg src={hiking} alt="hiking" className="hiking" />
      <StyledImg src={camping} alt="Camping" className="camping" />
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  margin: 0 5%;
  margin-bottom: 25px;
`;

const StyledImg = styled.img`
  display: inline-block;
  position: relative;
  /* opacity: 0.6; */

  &.van {
    width: 450px;
  }
  &.camping {
    width: 330px;
    top: -80px;
  }
  &.hiking {
    width: 365px;
    top: -39px;
  }
`;
