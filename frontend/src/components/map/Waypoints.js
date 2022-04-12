import styled from "styled-components";

export const Waypoints = () => {
  return (
    <WayPointsContainer>
      <p>Your Stops:</p>
      <p>List of waypoints added from pins on map.</p>
      {/* {stopsArr.length !== 0 && (
            {stopsArr.map((stop, i) => {
              return <p>Waypoint {i}: {stop.name}</p>
            })}
          )} */}
    </WayPointsContainer>
  );
};

const WayPointsContainer = styled.div`
  background-color: gray;
`;
