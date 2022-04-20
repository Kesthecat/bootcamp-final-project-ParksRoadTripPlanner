import { useContext } from "react";
import styled from "styled-components";
import { intervalToDuration } from "date-fns";

import { GMAPContext } from "../hooks/GMAPContext";

export const RouteMetrics = () => {
  const { routeInfo } = useContext(GMAPContext);

  let distance = 0;
  let duration = 0;

  if (routeInfo.length > 0) {
    //get sum of distance
    distance =
      routeInfo.reduce((acc, cur) => acc + cur.distance.value, 0) / 100;

    // get total driving time
    const durationObj = routeInfo.reduce(
      (acc, cur) => acc + cur.duration.value,
      0
    );
    duration = intervalToDuration({ start: 0, end: durationObj * 1000 });
  }

  return routeInfo.length > 0 ? (
    <Container>
      <p>
        <StyledSpan>Total Distance: </StyledSpan>
        {distance} km
      </p>
      <p>
        <StyledSpan>Driving duration: </StyledSpan>
      </p>
      <Duration>
        {duration.days !== 0 && <p>{duration.days} days(s)</p>}
        {duration.hours !== 0 && <p>{duration.hours} hour(s)</p>}
        {duration.minutes !== 0 && <p>{duration.minutes} minutes</p>}
      </Duration>
    </Container>
  ) : (
    <Container>
      <p>
        <StyledSpan>Total Distance: </StyledSpan>0 km
      </p>
      <p>
        <StyledSpan>Driving duration: </StyledSpan> 0 minute
      </p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 10px;
  height: 75px;
  margin-top: 25px;
`;
const StyledSpan = styled.span`
  font-weight: bold;
`;
const Duration = styled.p`
  position: relative;
  top: -25px;
  left: 161px;
`;
