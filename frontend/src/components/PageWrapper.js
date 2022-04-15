import styled from "styled-components";

export const PageWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 20px;
  border: 3px solid red;
  padding: 20px;
`;
