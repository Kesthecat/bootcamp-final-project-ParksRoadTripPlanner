import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GMAPContext } from "../hooks/GMAPContext";

export const StopsMetrics = ({ trip, legsInfo, hasStops }) => {
  const { waypoints } = useContext(GMAPContext);

  return (
    <Container>
      <Container className="nameMetricsDuo">
        <InfoWrapper className="departDesti">
          <p>
            <StyledSpan>Departure: </StyledSpan>
            {trip.departure.name}
          </p>
        </InfoWrapper>
        <InfoWrapper className="stopInfo">
          <p>Driving Distance: {legsInfo[0].distance.text}</p>
          <p>Driving Time: {legsInfo[0].duration.text}</p>
        </InfoWrapper>
      </Container>
      {hasStops &&
        waypoints.map((waypoint, i) => {
          return (
            <Container className="nameMetricsDuo" key={waypoint._id}>
              <InfoWrapper
                style={{
                  width: "350px",
                  backgroundColor: "var(--color-secondary)",
                }}
              >
                <StyledSpan>Stop {i + 1}: </StyledSpan>
                <NavLink to={`/parks/${waypoint._id}`}>{waypoint.name}</NavLink>
              </InfoWrapper>
              <InfoWrapper className="stopInfo">
                <p>Driving Distance: {legsInfo[i + 1].distance.text}</p>
                <p>Driving Time: {legsInfo[i + 1].duration.text}</p>
              </InfoWrapper>
            </Container>
          );
        })}
      <InfoWrapper className="departDesti">
        <p>
          <StyledSpan>Destination: </StyledSpan>
          {trip.destination.name}
        </p>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: var(--color-main);

  &.nameMetricsDuo {
    padding: 5px 15px;
  }
`;
const StyledSpan = styled.span`
  font-weight: bold;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 5px 0;
  padding: 10px;

  &.departDesti {
    width: 350px;
    background-color: var(--color-secondary);
  }
  &.stopInfo {
    margin-left: 50px;
    font-size: 20px;
    background-color: var(--color-tertiary);
  }
`;
