import { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";
import { intervalToDuration } from "date-fns";
import moment from "moment";

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
  // const [last, setLast] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

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
          // setLast(data.data.routeMetrics.length - 1);
        }
        setTrip(data.data);
      })
      .catch((error) => {
        console.error("error", error);
        // window.alert(error.message);
        history.push("/Error");
      });
  }, []);

  useEffect(() => {
    return () => nukeMap();
  }, []);

  if (setLegsInfo.length > 0) {
    const sumDistance =
      legsInfo.reduce((acc, cur) => acc + cur.distance.value, totalDistance) /
      100;
    // console.log("distance", sumDistance);

    // setTotalDistance(sumDistance); ///get Too many re-render error message

    const durationSumSec = legsInfo.reduce(
      (acc, cur) => acc + cur.duration.value,
      totalDuration
    );
    const durationObj = intervalToDuration({
      start: 0,
      end: durationSumSec * 1000,
    });
    // console.log("durationObj", durationObj);

    // const duration = (s) => moment.duration(s, "seconds").humanize(); //rounds the time
    // console.log("duration", duration(durationSumSec));

    // setTotalDuration()
  }

  if (!trip) return <Loading />;

  // console.log({ departure, legsInfo });
  return (
    <Container>
      <TripName>{trip.tripName}</TripName>
      <InfoContainer>
        <Wrapper className="Route">
          <InfoWrapper>
            <StyledP>Departure: </StyledP>
            <StyledP>{trip.departure.name}</StyledP>
            <StyledP>Distance: {legsInfo[0].distance.text}</StyledP>
            <StyledP>Duration: {legsInfo[0].duration.text}</StyledP>
          </InfoWrapper>
          {hasStops &&
            waypoints.map((waypoint, i) => {
              return (
                <InfoWrapper key={waypoint._id}>
                  <ParkLink to={`/parks/${waypoint._id}`}>
                    {waypoint.name}
                  </ParkLink>
                  <StyledP>Distance: {legsInfo[i + 1].distance.text}</StyledP>
                  <StyledP>Durating: {legsInfo[i + 1].duration.text}</StyledP>
                </InfoWrapper>
              );
            })}
          <InfoWrapper>
            <StyledP>Destination: </StyledP>
            <StyledP>{trip.destination.name}</StyledP>
            {/* {!hasStops && (
              <>
                <StyledP>Distance: {legsInfo[last].distance.text}</StyledP>
                <StyledP>Durating: {legsInfo[last].duration.text}</StyledP>
              </>
            )} */}
          </InfoWrapper>
        </Wrapper>
        <Wrapper className="Driving">
          <InfoWrapper>
            <StyledP>Total Distance: </StyledP>
            <StyledP>{totalDistance} km</StyledP>
          </InfoWrapper>
          <InfoWrapper>
            <StyledP>Driving duration: </StyledP>
            <DurationWrapper>
              <StyledP>problem with rendering</StyledP>
              {/* {
                totalDuration === 0 ? <StyledP>{totalDuration} minutes</StyledP> :
                ({totalDuration.days && 
                  <StyledP>{totalDuration.days} days(s)</StyledP>
              }
              {
                totalDuration.hours && 
              <StyledP>{totalDuration.hours} hour(s)</StyledP>
              }
              {
                totalDuration.minutes &&
              <StyledP>{totalDuration.minutes} minute(s)</StyledP>
              })
                } */}
            </DurationWrapper>
          </InfoWrapper>
        </Wrapper>
        <Wrapper className="Buttons">
          <StyledBtn>Edit trip btn</StyledBtn>
          <StyledBtn>Delete trip btn</StyledBtn>
          <StyledBtn>Share trip btn</StyledBtn>
        </Wrapper>
      </InfoContainer>
      <MapContainer>
        {/* <GoogleMapReact
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
        </GoogleMapReact> */}
      </MapContainer>
    </Container>
  );
};

const Container = styled.div``;
const TripName = styled.h1``;
const InfoContainer = styled.div`
  display: flex;
`;
const Wrapper = styled.div``;
const InfoWrapper = styled.div`
  display: flex;
  border: 2px solid purple;
`;
const StyledP = styled.p``;
const ParkLink = styled(NavLink)``;
const StyledBtn = styled.button``;
const MapContainer = styled.div`
  height: 600px;
  width: 1000px;
`;
const DurationWrapper = styled.div`
  display: flex;
`;
