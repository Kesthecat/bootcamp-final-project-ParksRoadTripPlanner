import styled from "styled-components";
import { AiOutlineMinus } from "react-icons/ai";
import { useContext } from "react";
import { GMAPContext } from "../hooks/GMAPContext";
import { FlagContext } from "../hooks/Flags";

export const Waypoints = () => {
  // console.log(waypoints);

  const { waypoints, setWaypoints, routeInfo } = useContext(GMAPContext);
  const { setAddedWaypoint } = useContext(FlagContext);

  const handleRemove = (id) => {
    // console.log("stop", id);
    const updatedWayppoints = waypoints.filter((point) => point._id !== id);
    setWaypoints(updatedWayppoints);
    setAddedWaypoint(false);
  };

  return (
    <WayPointsContainer>
      <StyledP>Your Stops:</StyledP>
      <StyledP>List of waypoints added from pins on map.</StyledP>
      {waypoints.length !== 0 ? (
        <>
          {waypoints.map((stop, i) => {
            // console.log("routeInfo", routeInfo);
            return (
              <WaypointWrapper>
                <StyledP key={stop.name + i}>
                  Waypoint {i + 1}: {stop.name}
                </StyledP>
                <StyledBtn onClick={() => handleRemove(stop._id)}>
                  <RemoveIcon />
                </StyledBtn>
              </WaypointWrapper>
            );
          })}
          <StyledP>Total Distance: </StyledP>
          <StyledP>Total Travel Time: </StyledP>
        </>
      ) : (
        <StyledP>No waypoints added.</StyledP>
      )}
    </WayPointsContainer>
  );
};

const WayPointsContainer = styled.div`
  border: 2px solid orange;
`;
const WaypointWrapper = styled.div`
  display: flex;
`;
const StyledP = styled.p``;
const StyledBtn = styled.button``;
const RemoveIcon = styled(AiOutlineMinus)``;
