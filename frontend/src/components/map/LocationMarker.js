import styled from "styled-components";
import { GiPineTree, GiHeartPlus, GiHealthNormal } from "react-icons/gi";

export const LocationMarker = ({ text }) => {
  return (
    <Container>
      <Marker>
        <GiPineTree />
      </Marker>
      <Modal>
        <p>{text}</p>
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

const Container = styled.div``;
const Marker = styled.div``;
const BtnContainer = styled.div``;
const StyledBtn = styled.button``;
const Modal = styled.div``;
