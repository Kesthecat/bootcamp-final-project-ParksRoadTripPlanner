import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../Loading";

export const Trip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [hasStops, setHasStops] = useState(false);

  useEffect(() => {
    fetch(`/trip/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.destination.name);
        setTrip(data.data);
        if (data.data.waypoints.length > 0) {
          setHasStops(true);
          setStops(data.data.waypoints);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }, []);

  console.log("stops", stops);

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
            stops.map((stop) => {
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
