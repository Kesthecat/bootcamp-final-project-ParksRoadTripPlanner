import styled from "styled-components";
import { AiOutlineMinus } from "react-icons/ai";
import { useContext } from "react";
import { GMAPContext } from "../hooks/GMAPContext";

export const Waypoints = () => {
  // console.log(waypoints);

  const { waypoints, setWaypoints } = useContext(GMAPContext);
  const handleRemove = (id) => {
    console.log("stop", id);
    const updatedWayppoints = waypoints.filter((point) => point._id !== id);
    setWaypoints(updatedWayppoints);
  };

  return (
    <WayPointsContainer>
      <StyledP>Your Stops:</StyledP>
      <StyledP>List of waypoints added from pins on map.</StyledP>
      {waypoints.length !== 0 ? (
        waypoints.map((stop, i) => {
          return (
            <WaypointWrapper>
              <StyledP key={stop.name + i}>
                Waypoint {i}: {stop.name}
              </StyledP>
              <StyledBtn onClick={() => handleRemove(stop._id)}>
                <RemoveIcon />
              </StyledBtn>
            </WaypointWrapper>
          );
        })
      ) : (
        <StyledP>No waypoints added.</StyledP>
      )}
    </WayPointsContainer>
  );
};

const WayPointsContainer = styled.div`
  background-color: gray;
`;
const WaypointWrapper = styled.div`
  display: flex;
`;
const StyledP = styled.p``;
const StyledBtn = styled.button``;
const RemoveIcon = styled(AiOutlineMinus)``;
