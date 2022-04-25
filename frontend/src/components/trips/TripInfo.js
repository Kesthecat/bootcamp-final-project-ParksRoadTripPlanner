import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { intervalToDuration } from "date-fns";

import { UserContext } from "../hooks/userContext";
import { StopsMetrics } from "./StopsMetrics";

export const TripInfo = ({ legsInfo, trip, hasStops }) => {
  const { userId } = useContext(UserContext);

  let history = useHistory();

  const handleDelete = (id) => {
    fetch(`/trip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          history.push("/Error");
          return;
        }
        window.alert("Trip was successfully deleted.");
        history.push(`/user/${userId}`);
      })
      .catch((error) => {
        history.push("/Error");
      });
  };

  if (!trip) return <div>Loading...</div>;

  // once the trip info loaded from fetch, calculate the driving metrics
  const sumDistance =
    legsInfo.reduce((acc, cur) => acc + cur.distance.value, 0) / 100;

  const durationSumSec = legsInfo.reduce(
    (acc, cur) => acc + cur.duration.value,
    0
  );
  const durationObj = intervalToDuration({
    start: 0,
    end: durationSumSec * 1000,
  });

  return (
    <InfoContainer>
      <StopsMetrics trip={trip} legsInfo={legsInfo} hasStops={hasStops} />
      <Wrapper className="driving">
        <p>
          <StyledSpan>Total Distance: </StyledSpan>
          {sumDistance} km
        </p>
        <InfoWrapper className="drivingTime">
          <p>
            <StyledSpan>Driving duration: </StyledSpan>
          </p>
          <DurationWrapper>
            {durationObj.days !== 0 && <p>{durationObj.days} days(s)</p>}
            {durationObj.hours !== 0 && <p>{durationObj.hours} hour(s)</p>}
            {durationObj.minutes !== 0 && <p>{durationObj.minutes} minutes</p>}
          </DurationWrapper>
        </InfoWrapper>
      </Wrapper>
      <Wrapper className="buttons">
        <StyledBtn disabled={true}>Edit</StyledBtn>
        <StyledBtn onClick={() => handleDelete(trip._id)}>Delete</StyledBtn>
        <StyledBtn disabled={true}>Share</StyledBtn>
      </Wrapper>
    </InfoContainer>
  );
};

const StyledSpan = styled.span`
  font-weight: bold;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px 25px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  &.driving {
    width: fit-content;
    padding: 15px;
    margin-left: 50px;
  }
  &.buttons {
    flex-direction: row;
    justify-content: space-between;
    border-top: 2px solid var(--color-secondary);
    padding-top: 15px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;
const StyledBtn = styled.button`
  height: 45px;
  font-size: 20px;
  padding: 10px;
  background-color: ${(props) =>
    props.disabled ? "var(--color-tertiary)" : "var(--color-main)"};
`;
const DurationWrapper = styled.div`
  padding-top: 5px;
  padding-left: 162px;
  margin-top: -24px;
`;
