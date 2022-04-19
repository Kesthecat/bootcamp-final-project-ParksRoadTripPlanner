import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";
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
  const [tripName, setTripName] = useState("");

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
        console.log("error", data.message);
        if (data.message !== "success") {
          setIsWaiting(false);
          history.push("/Error");
          return;
        }
        // console.log(data.data);
        setIsWaiting(false);
        history.push(`/trip/${data.data._id}`);
      })
      .catch((error) => {
        console.log("error", error);
        history.push("/Error");
      });
  };

  return (
    <>
      <FormWrapper onSubmit={(e) => handleSave(e)}>
        <Styledh3>Save your trip</Styledh3>
        <StyledP>Trip Name: </StyledP>
        <StyledInput
          type="text"
          placeholder="ex: Quebec roadtrip"
          required
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />

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
      </FormWrapper>
      {isWaiting && <p>Loading</p>}
    </>
  );
};
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const Styledh3 = styled.h3`
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-main);
`;
const StyledP = styled.p`
  margin: 10px 0;
`;
const StyledInput = styled.input`
  height: 30px;
  font-size: 20px;
  padding-left: 5px;
  width: 350px;
`;
const StyledBtn = styled.button`
  width: 105px;
  height: 30px;
  font-size: 22px;
  margin-top: 15px;
`;
