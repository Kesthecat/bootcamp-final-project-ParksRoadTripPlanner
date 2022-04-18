import styled from "styled-components";
import car from "../assets/606232bad5caee79392a7f5fb26c4a6d.gif";
import { PageWrapper } from "./PageWrapper";

export const Loading = () => {
  return (
    <PageWrapper>
      <Container>
        <img src={car} alt="camper van on the road" />
      </Container>
    </PageWrapper>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
