import { BiUpArrowAlt } from "react-icons/bi";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";

export const ToTopBtn = () => {
  return (
    <HashLink smooth to="/parks/#top">
      <StyledBtn>
        <BiUpArrowAlt style={{ transform: "scale(4)" }} />
      </StyledBtn>
    </HashLink>
  );
};

const StyledBtn = styled.button`
  height: 80px;
  width: 80px;
`;
