import styled from "styled-components";
import { GiPineTree, GiHeartPlus, GiHealthNormal } from "react-icons/gi";
import { AiOutlineMinus } from "react-icons/ai";
import { useContext } from "react";

import { GMAPContext } from "../hooks/GMAPContext";
import { FlagContext } from "../hooks/Flags";

export const LocationMarker = ({ park, isShown, setIsShown, setIsPinned }) => {
  const { waypoints, setWaypoints } = useContext(GMAPContext);
  const { notTripPage } = useContext(FlagContext);

  const handleAddWaypoint = () => {
    const stops = [...waypoints].concat(park);
    setWaypoints(stops);
    // console.log("stops", stops);
  };

  const handleRemoveWaypoint = (id) => {
    const updatedWaypoints = waypoints.filter((point) => point._id !== id);
    setWaypoints(updatedWaypoints);
  };

  const addedWaypoint = !!waypoints.find((point) => point._id === park._id);

  return (
    <>
      <Container>
        <Marker
          onMouseOver={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setIsPinned(true)}
        >
          <TreeMarker />
        </Marker>
        {isShown && (
          <Modal>
            <ParkName>{park.name}</ParkName>
            <ExitBtn onClick={() => setIsPinned(false)}>x</ExitBtn>
            {notTripPage && (
              <BtnContainer>
                {addedWaypoint ? (
                  <StyledBtn onClick={() => handleRemoveWaypoint(park._id)}>
                    <AiOutlineMinus />
                  </StyledBtn>
                ) : (
                  <StyledBtn onClick={() => handleAddWaypoint()}>
                    <GiHealthNormal />
                  </StyledBtn>
                )}
                <StyledBtn>
                  <GiHeartPlus />
                </StyledBtn>
              </BtnContainer>
            )}
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
  display: flex;
`;
const TreeMarker = styled(GiPineTree)`
  /* color: rgb(255, 64, 0); */
  color: var(--color-marker);
  transform: scale(3);
  z-index: -5;
`;
const Marker = styled.div``;
const ParkName = styled.p`
  margin: 10px;
  color: rgba(36, 36, 35);
  width: fit-content;
`;
const ExitBtn = styled.button`
  position: absolute;
  left: 270px;
  width: 30px;
`;
const BtnContainer = styled.div`
  margin: 0 10px;
  display: flex;
  gap: 10px;
`;
const StyledBtn = styled.button`
  background-color: rgba(245, 203, 92);
`;
const Modal = styled.div`
  position: absolute;
  top: -80px;
  left: 10px;
  width: 300px;
  padding-bottom: 10px;
  padding-right: 10px;
  border: 1px solid pink;
  background-color: rgba(207, 219, 213);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;
