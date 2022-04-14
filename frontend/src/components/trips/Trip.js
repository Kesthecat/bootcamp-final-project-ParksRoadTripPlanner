import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { bootstrapURLKeys } from "../map/GoogleMapKey";
import { GMAPContext } from "../hooks/GMAPContext";
import { Loading } from "../Loading";

export const Trip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  // const [stops, setStops] = useState([]);
  const [hasStops, setHasStops] = useState(false);
  const {
    setRoute,
    setMap,
    setMaps,
    setDeparture,
    setDestination,
    setWaypoints,
    waypoints,
  } = useContext(GMAPContext);

  const handleApiLoaded = (map, maps) => {
    console.log({ map, maps });
    setMaps(maps);
    setMap(map);
  };

  useEffect(() => {
    fetch(`/trip/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.destination.name);
        setTrip(data.data);
        setDestination(data.data.destination);
        setDeparture(data.data.departure);
        if (data.data.waypoints.length > 0) {
          setHasStops(true);
          // setStops(data.data.waypoints);
          setWaypoints(data.data.waypoints);
        }
        // setRoute();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }, []);

  // console.log("stops", stops);

  if (!trip) return <Loading />;

  return (
    <Container>
      <TripName>{trip.tripName}</TripName>
      <InfoContainer>
        <Wrapper className="Route">
          <InfoWrapper>
            <StyledP>Departure: </StyledP>
            <StyledP>{trip.departure.name}</StyledP>
          </InfoWrapper>
          {hasStops &&
            waypoints.map((stop) => {
              return (
                <InfoWrapper>
                  <ParkLink to={`/parks/${stop._id}`}>{stop.name}</ParkLink>
                </InfoWrapper>
              );
            })}
          <InfoWrapper>
            <StyledP>Destination: </StyledP>
            <StyledP>{trip.destination.name}</StyledP>
          </InfoWrapper>
        </Wrapper>
        <Wrapper className="Driving">
          <InfoWrapper>
            <StyledP>Total Distance: </StyledP>
            <StyledP>distance according to route rendered...</StyledP>
          </InfoWrapper>
          <InfoWrapper>
            <StyledP>Driving duration: </StyledP>
            <StyledP>driving time according to route</StyledP>
          </InfoWrapper>
        </Wrapper>
        <Wrapper className="Buttons">
          <StyledBtn>Edit trip btn</StyledBtn>
          <StyledBtn>Delete trip btn</StyledBtn>
          <StyledBtn>Share trip btn</StyledBtn>
        </Wrapper>
      </InfoContainer>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMapReact>
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
`;
const StyledP = styled.p``;
const ParkLink = styled(NavLink)``;
const StyledBtn = styled.button``;
const MapContainer = styled.div`
  height: 600px;
  width: 1000px;
`;
