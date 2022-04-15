import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";
import { Loading } from "../Loading";
import { UserContext } from "../hooks/userContext";
import moment from "moment";
import { useHistory } from "react-router-dom";

export const CreateTrip = ({ setHasClear }) => {
  const {
    departure,
    setDeparture,
    destination,
    setDestination,
    waypoints,
    setWaypoints,
    routeInfo,
    setPolyline,
  } = useContext(GMAPContext);
  const { userId } = useContext(UserContext);

  const [isWaiting, setIsWaiting] = useState(false);
  const [tripName, setTripName] = useState(null);

  let history = useHistory();

  // console.log("routeInfo", routeInfo);

  let savedRouteInfo = [];
  if (routeInfo.length > 0) {
    routeInfo.forEach((leg) => {
      const distance = leg.distance;
      const duration = leg.duration;
      savedRouteInfo.push({ distance: distance, duration: duration });
    });
  }

  // const handleClear = (e) => {
  //   e.preventDefault();
  //   // window.location.reload();
  //   // //not woking
  //   // setPolyline(null);

  //   // //working
  //   setDestination(null);
  //   setTripName("");
  //   setDeparture(null); //state null but not visually
  //   setHasClear(true);
  //   setWaypoints([]);
  // };

  const handleSave = (e) => {
    e.preventDefault();

    if (!departure || !destination) {
      window.alert(
        "Please have at least a departure point and a destination point."
      );
      return;
    }

    setIsWaiting(true);

    fetch("/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        departure: departure,
        destination: destination,
        waypoints: waypoints,
        tripName: tripName,
        userId: userId,
        time: moment().format("LL"),
        routeMetrics: savedRouteInfo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setIsWaiting(false);
        history.push(`/trip/${data.data._id}`);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <FormWrapper onSubmit={(e) => handleSave(e)}>
        <StyledP>Save your trip</StyledP>
        <StyledP>Trip Name: </StyledP>
        <StyledInput
          type="text"
          placeholder="ex: Quebec roadtrip"
          required
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
        <BtnContainer>
          {/* <StyledBtn
            type="button"
            disabled={isWaiting}
            onClick={(e) => handleClear(e)}
          >
            Clear trip
          </StyledBtn> */}
          <StyledBtn type="submit" disabled={isWaiting}>
            Save trip
          </StyledBtn>
        </BtnContainer>
      </FormWrapper>
      {isWaiting && <Loading />}
    </>
  );
};
const FormWrapper = styled.form``;
const StyledP = styled.p``;
const StyledInput = styled.input``;
const BtnContainer = styled.div``;
const StyledBtn = styled.button``;
