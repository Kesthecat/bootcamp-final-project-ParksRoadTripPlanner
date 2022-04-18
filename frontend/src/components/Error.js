import styled from "styled-components";
import lost from "../assets/map-what.gif";

export const ErrorPage = () => {
  return (
    <Container>
      <StyledImg src={lost} alt="lost looking at map" />
      <h3>An error has occured.</h3>
      <h3>Try again or contact customer services if the error persists.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
const StyledImg = styled.img`
  width: 400px;
`;
