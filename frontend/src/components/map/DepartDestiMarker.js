import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";

export const DepartDestiMarker = () => {
  return (
    <Container>
      <Marker />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  transform: translate(0, -100%);
  display: flex;
`;
const Marker = styled(MdLocationPin)`
  color: rgb(36, 47, 64);
  transform: scale(5);
  z-index: -5;
`;
