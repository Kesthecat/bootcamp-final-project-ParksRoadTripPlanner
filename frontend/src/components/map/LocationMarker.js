import styled from "styled-components";
import { useState } from "react";
import { GiPineTree, GiHeartPlus, GiHealthNormal } from "react-icons/gi";

export const LocationMarker = ({ park, waypoints, setWaypoints }) => {
  const [isShown, setIsShown] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  //gives the ["test1"]
  // console.log("waypoints", waypoints);

  const handleAddWaypoint = (e) => {
    e.preventDefault();
    //get error saying either waypoints is undefined or waypoints.push is not a funct
    //or gives result but gives me numbers....
    const stops = [...waypoints].concat(park);
    setWaypoints(stops);
    console.log("stops", stops);
  };

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
            <ParkName>{park.name}</ParkName>
            <ExitBtn onClick={() => setHasClicked(false)}>x</ExitBtn>
            <BtnContainer>
              <StyledBtn onClick={(e) => handleAddWaypoint(e)}>
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
  display: flex;
`;
const TreeMarker = styled(GiPineTree)`
  color: rgb(255, 64, 0);
  transform: scale(3);
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
  border: 1px solid pink;
  width: 300px;
  background-color: rgba(207, 219, 213);
  height: 60px;
  display: flex;
  flex-direction: column;
`;
