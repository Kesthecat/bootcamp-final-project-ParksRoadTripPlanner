import styled, { keyframes } from "styled-components";
import { useContext, useEffect } from "react";

import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { DepartureDestination } from "./DepartureDestination";
import { Waypoints } from "./Waypoints";
import { GMAPContext } from "../hooks/GMAPContext";
import { UserContext } from "../hooks/userContext";
import { CreateTrip } from "./CreateTrip";
import { NavLink } from "react-router-dom";
import { RouteMetrics } from "./RouteMetrics";
import { MainGMAP } from "./MainGMAP";

///////////////////////////////////////////////////////////////

export const MainMap = () => {
  const { parksList } = useContext(ParksListContext);
  const { nukeMap } = useContext(GMAPContext);
  const { username } = useContext(UserContext);

  useEffect(() => {
    return () => nukeMap();
  }, []);

  ////////////////////////////////////
  if (parksList === []) return <Loading />;
  //////////////////////////////////////
  return (
    <Container>
      {username ? (
        <SearchContainer>
          <StyledH2>Enter you point of departure and destination: </StyledH2>
          <DepartureDestination />
          <BreakLine />
          <Waypoints />
          <BreakLine />
          <h4>Route information</h4>
          <RouteMetrics />
          <BreakLine />
          <CreateTrip />
        </SearchContainer>
      ) : (
        <SearchContainer className="notSigned">
          <StyledH2 className="notSigned">
            <StyledNavLink to={"/"}>Sign In</StyledNavLink> to use the trip
            planning features.
          </StyledH2>
        </SearchContainer>
      )}
      <MainGMAP />
    </Container>
  );
};

//animation
const flashing = keyframes`
0%{opacity: 1}
50%{opacity:0.5}
100%{opacity: 1}
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledH2 = styled.h2`
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-main);
  padding-bottom: 10px;
  text-align: center;

  &.notSigned {
    background-color: var(--color-main);
    padding: 15px 0;
  }
`;
const SearchContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  &.notSigned {
    padding-top: 150px;
  }
`;
const BreakLine = styled.div`
  border: 2px solid var(--color-tertiary);
`;
const StyledNavLink = styled(NavLink)`
  font-family: var(--font-heading);
  font-size: 35px;
  color: var(--color-text-hover);
  animation: ${flashing} 2s ease-in-out infinite;
`;
