import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Footer = () => {
  return (
    <Container>
      <StyledNavLink to={"/About"}>About</StyledNavLink>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: var(--color-main);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)``;
