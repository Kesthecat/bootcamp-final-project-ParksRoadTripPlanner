import styled from "styled-components";
import { GiPineTree, GiHeartPlus, GiHealthNormal } from "react-icons/gi";

export const LocationMarker = ({ text }) => {
  return (
    <Container>
      <Marker>
        <TreeMarker />
      </Marker>
      <Modal>
        <ParkName>{text}</ParkName>
        <BtnContainer>
          <StyledBtn>
            <GiHealthNormal />
          </StyledBtn>
          <StyledBtn>
            <GiHeartPlus />
          </StyledBtn>
        </BtnContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const TreeMarker = styled(GiPineTree)`
  color: rgb(255, 64, 0);
  transform: scale(3);
`;
const Marker = styled.div``;
const ParkName = styled.p`
  margin: 10px;
  color: rgba(36, 36, 35);
`;
const BtnContainer = styled.div`
  margin: 10px;
  display: flex;
  gap: 10px;
`;
const StyledBtn = styled.button`
  background-color: rgba(245, 203, 92);
`;
const Modal = styled.div`
  border: 1px solid pink;
  width: fit-content;
  background-color: rgba(207, 219, 213);
`;
