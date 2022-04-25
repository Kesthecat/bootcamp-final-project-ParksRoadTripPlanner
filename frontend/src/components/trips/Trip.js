import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { GMAPContext } from "../hooks/GMAPContext";
import { Loading } from "../Loading";
import { FlagContext } from "../hooks/Flags";
import { TripInfo } from "./TripInfo";
import { TripMap } from "./TripMap";

export const Trip = () => {
  const { id } = useParams();
  let history = useHistory();

  const [trip, setTrip] = useState(null);
  const [hasStops, setHasStops] = useState(false);
  const [legsInfo, setLegsInfo] = useState([]);

  const { setDeparture, setDestination, setWaypoints, nukeMap } =
    useContext(GMAPContext);
  const { setNotTripPage } = useContext(FlagContext);

  useEffect(() => {
    setNotTripPage(false);

    fetch(`/trip/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          history.push("/Error");
          return;
        }
        setNotTripPage(false);
        setDestination(data.data.destination);
        setDeparture(data.data.departure);
        setLegsInfo(data.data.routeMetrics);
        if (data.data.waypoints.length > 0) {
          setHasStops(true);
          setWaypoints(data.data.waypoints);
        }
        setTrip(data.data);
      })
      .catch((error) => {
        // console.error("error", error);
        history.push("/Error");
      });
  }, []);

  //reset all state in GMAP context if hit return to mainMap after deleting a trip so the map there is also empty
  useEffect(() => {
    return () => nukeMap();
  }, []);

  if (!trip) return <Loading />;

  return (
    <>
      <TripName>{trip.tripName}</TripName>
      <Container>
        <TripInfo legsInfo={legsInfo} trip={trip} hasStops={hasStops} />
        <TripMap />
      </Container>
    </>
  );
};

const TripName = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-main);
  padding-bottom: 10px;
`;
const Container = styled.div`
  display: flex;
`;
