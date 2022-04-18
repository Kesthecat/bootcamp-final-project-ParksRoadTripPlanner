import styled from "styled-components";
import { AiOutlineMinus } from "react-icons/ai";
import { useContext, useState } from "react";
import { intervalToDuration } from "date-fns";

import { GMAPContext } from "../hooks/GMAPContext";
import { FlagContext } from "../hooks/Flags";

export const Waypoints = () => {
  // console.log(waypoints);

  const { waypoints, setWaypoints } = useContext(GMAPContext);
  const { setAddedWaypoint } = useContext(FlagContext);

  const handleRemove = (id) => {
    // console.log("stop", id);
    const updatedWayppoints = waypoints.filter((point) => point._id !== id);
    setWaypoints(updatedWayppoints);
    setAddedWaypoint(false);
  };

  return (
    <WayPointsContainer>
      <StyledH3>Add/Remove stops by using the pins on the map.</StyledH3>
      {waypoints.length !== 0 ? (
        <>
          {waypoints.map((stop, i) => {
            // console.log("routeInfo", routeInfo);
            return (
              <WaypointWrapper key={stop.name + i}>
                <div>
                  <StyledP style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Waypoint {i + 1}:
                  </StyledP>
                  <StyledP>{stop.name}</StyledP>
                </div>
                <StyledBtn onClick={() => handleRemove(stop._id)}>
                  <RemoveIcon />
                </StyledBtn>
              </WaypointWrapper>
            );
          })}
        </>
      ) : (
        <StyledP>No stops added.</StyledP>
      )}
    </WayPointsContainer>
  );
};

const WayPointsContainer = styled.div`
  border: 2px solid var(--color-secondary);
  padding: 15px;
`;
const WaypointWrapper = styled.div`
  margin: 15px;
  display: flex;
  justify-content: space-between;
`;
const StyledH3 = styled.h3`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-main);
`;
const StyledP = styled.p``;
const StyledBtn = styled.button`
  height: 20px;
  padding-top: 4px;
`;
const RemoveIcon = styled(AiOutlineMinus)``;
