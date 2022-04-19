import styled, { keyframes } from "styled-components";
import GoogleMapReact from "google-map-react";
import { bootstrapURLKeys } from "./GoogleMapKey";
import { useContext, useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";

import { LocationMarker } from "./LocationMarker";
import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { DepartureDestination } from "./DepartureDestination";
import { Waypoints } from "./Waypoints";
import { GMAPContext } from "../hooks/GMAPContext";
import { UserContext } from "../hooks/userContext";
import { CreateTrip } from "./CreateTrip";
import { FlagContext } from "../hooks/Flags";
import { NavLink } from "react-router-dom";
import { RouteMetrics } from "./RouteMetrics";
import { DepartDestiMarker } from "./DepartDestiMarker";

///////////////////////////////////////////////////////////////

export const MainMap = () => {
  const { parksList } = useContext(ParksListContext);
  const { setMaps, setMap, nukeMap, departure, destination } =
    useContext(GMAPContext);
  const { username } = useContext(UserContext);
  const { setNotTripPage } = useContext(FlagContext);

  const [activeModalId, setActiveModalId] = useState(null);
  const [pinnedModalId, setPinnedModalId] = useState(null);
  const [hasClear, setHasClear] = useState(false);

  const handleApiLoaded = (map, maps) => {
    setMaps(maps);
    setMap(map);
    setNotTripPage(true);
  };

  useEffect(() => {
    return () => nukeMap();
  }, []);

  ////////////////////////////////////
  if (parksList === []) return <Loading />;
  //////////////////////////////////////
  // console.log({ activeModalId });
  return (
    <Container>
      {username ? (
        <SearchContainer>
          <StyledH2>Enter you point of departure and destination: </StyledH2>
          <DepartureDestination hasClear={hasClear} setHasClear={setHasClear} />
          <BreakLine />
          <Waypoints />
          <BreakLine />
          <h4>Route information</h4>
          <RouteMetrics />
          <BreakLine />
          <CreateTrip setHasClear={setHasClear} />
        </SearchContainer>
      ) : (
        <SearchContainer className="notSigned">
          <StyledH2 className="notSigned">
            <StyledNavLink to={"/"}>Sign In</StyledNavLink> to use the trip
            planning features.
          </StyledH2>
        </SearchContainer>
      )}
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={{ lat: 52.87927, lng: -91.47617 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {parksList.map((park, i) => {
            return (
              <LocationMarker
                key={park._id + i}
                lat={park.coordinates.lat}
                lng={park.coordinates.lng}
                park={park}
                setIsShown={(bool) => setActiveModalId(bool ? park._id : null)}
                isShown={
                  park._id === activeModalId || park._id === pinnedModalId
                }
                setIsPinned={(bool) => setPinnedModalId(bool ? park._id : null)}
              />
            );
          })}
          {!!departure && (
            <DepartDestiMarker
              lat={departure.coordinates.lat}
              lng={departure.coordinates.lng}
            />
          )}
          {!!destination && (
            <DepartDestiMarker
              lat={destination.coordinates.lat}
              lng={destination.coordinates.lng}
            />
          )}
        </GoogleMapReact>
      </MapContainer>
    </Container>
  );
};

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
  /* height: 900px; */
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* border: 2px solid yellowgreen; */
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
const MapContainer = styled.div`
  height: 900px;
  width: 855px;
  /* border: 3px solid brown; */
`;
