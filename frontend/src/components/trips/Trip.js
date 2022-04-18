import { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";
import { intervalToDuration } from "date-fns";

import { bootstrapURLKeys } from "../map/GoogleMapKey";
import { GMAPContext } from "../hooks/GMAPContext";
import { Loading } from "../Loading";
import { LocationMarker } from "../map/LocationMarker";
import { FlagContext } from "../hooks/Flags";

export const Trip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [hasStops, setHasStops] = useState(false);
  const [legsInfo, setLegsInfo] = useState([]);

  const {
    setMap,
    setMaps,
    setDeparture,
    setDestination,
    setWaypoints,
    waypoints,
    setDepartureMarker,
    departure,
    destination,
    setDestinationMarker,
    nukeMap,
  } = useContext(GMAPContext);
  const { setNotTripPage } = useContext(FlagContext);

  let history = useHistory();

  const handleApiLoaded = (map, maps) => {
    // console.log({ map, maps });
    setMaps(maps);
    setMap(map);
  };

  useEffect(() => {
    setNotTripPage(false);

    fetch(`/trip/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", { data });
        // console.log("routeMetrics", data.data.routeMetrics);
        if (data.message !== "success") {
          setNotTripPage(true);
          history.push("/Error");
          return;
        }
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
        console.error("error", error);
        history.push("/Error");
      });
  }, []);

  useEffect(() => {
    return () => nukeMap();
  }, []);

  if (!trip) return <Loading />;

  const sumDistance =
    legsInfo.reduce((acc, cur) => acc + cur.distance.value, 0) / 100;
  // console.log("distance", sumDistance);

  const durationSumSec = legsInfo.reduce(
    (acc, cur) => acc + cur.duration.value,
    0
  );
  const durationObj = intervalToDuration({
    start: 0,
    end: durationSumSec * 1000,
  });
  // console.log("durationObj", durationObj);

  // console.log({ departure, legsInfo });

  return (
    <>
      <TripName>{trip.tripName}</TripName>
      <Container>
        <InfoContainer>
          <Wrapper className="trip">
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
            <Wrapper className="waypoints">
              {hasStops &&
                waypoints.map((waypoint, i) => {
                  return (
                    <Wrapper key={waypoint._id}>
                      <InfoWrapper
                        style={{
                          width: "350px",
                          backgroundColor: "var(--color-secondary)",
                        }}
                      >
                        <StyledSpan>Stop {i + 1}: </StyledSpan>
                        <NavLink to={`/parks/${waypoint._id}`}>
                          {waypoint.name}
                        </NavLink>
                      </InfoWrapper>
                      <InfoWrapper className="stopInfo">
                        <p>Driving Distance: {legsInfo[i + 1].distance.text}</p>
                        <p>Driving Time: {legsInfo[i + 1].duration.text}</p>
                      </InfoWrapper>
                    </Wrapper>
                  );
                })}
            </Wrapper>
            <InfoWrapper className="departDesti">
              <p>
                <StyledSpan>Destination: </StyledSpan>
                {trip.destination.name}
              </p>
            </InfoWrapper>
          </Wrapper>
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
                {durationObj.minutes !== 0 && (
                  <p>{durationObj.minutes} minutes</p>
                )}
              </DurationWrapper>
            </InfoWrapper>
          </Wrapper>
          <Wrapper className="buttons">
            <StyledBtn>Edit</StyledBtn>
            <StyledBtn>Delete</StyledBtn>
            <StyledBtn>Share</StyledBtn>
          </Wrapper>
        </InfoContainer>
        <MapContainer>
          <GoogleMapReact
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
            defaultZoom={4}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {!!departure && (
              <MdLocationPin
                size={40}
                lat={departure.coordinates.lat}
                lng={departure.coordinates.lng}
              />
            )}
            {!!destination && (
              <MdLocationPin
                size={40}
                lat={destination.coordinates.lat}
                lng={destination.coordinates.lng}
              />
            )}
            {waypoints.map((waypoint, i) => {
              return (
                <LocationMarker
                  key={i}
                  lat={waypoint.coordinates.lat}
                  lng={waypoint.coordinates.lng}
                  park={waypoint}
                />
              );
            })}
          </GoogleMapReact>
        </MapContainer>
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
  &.trip {
    padding: 15px;
    background-color: var(--color-main);
  }
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
  gap: 10px;
  margin: 5px 0;
  /* border: 2px solid purple; */
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
  &.drivingTime {
    gap: 0px;
    padding: 0;
  }
`;
const StyledBtn = styled.button`
  height: 45px;
  font-size: 20px;
  padding: 10px;
`;
const MapContainer = styled.div`
  height: 600px;
  width: 820px;
  margin-top: 15px;
  /* border: 2px solid blue; */
`;
const DurationWrapper = styled.div`
  padding-top: 5px;
  padding-left: 162px;
  margin-top: -24px;
`;
