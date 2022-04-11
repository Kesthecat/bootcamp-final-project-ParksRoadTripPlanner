import styled from "styled-components";
import { useState } from "react";
import { GiPineTree, GiHeartPlus, GiHealthNormal } from "react-icons/gi";

export const LocationMarker = ({ text }) => {
  const [isShown, setIsShown] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // window.onclick;

  return (
    <>
      <Container>
        <Marker
          onMouseOver={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setHasClicked(true)}
        >
          <TreeMarker />
        </Marker>
        {(isShown || hasClicked) && (
          <Modal>
            <ParkName>{text}</ParkName>
            <ExitBtn onClick={() => setHasClicked(false)}>x</ExitBtn>
            <BtnContainer>
              <StyledBtn>
                <GiHealthNormal />
              </StyledBtn>
              <StyledBtn>
                <GiHeartPlus />
              </StyledBtn>
            </BtnContainer>
          </Modal>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  /* border: 5px solid black; */
  position: absolute;
  transform: translate(0, -100%);
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
const ExitBtn = styled.button``;
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
