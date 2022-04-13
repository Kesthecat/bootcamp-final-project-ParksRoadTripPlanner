import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { bootstrapURLKeys } from "./GoogleMapKey";
import { useContext } from "react";

import { LocationMarker } from "./LocationMarker";
import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { DepartureDestination } from "./DepartureDestination";
import { Waypoints } from "./Waypoints";
import { SaveCleatTripBtn } from "./SaveClearTripBtn";
import { GMAPContext } from "../hooks/GMAPContext";
import { UserContext } from "../hooks/userContext";
import { useEffect } from "react";

///////////////////////////////////////////////////////////////

export const MainMap = () => {
  const { parksList } = useContext(ParksListContext);
  const { setMaps, setMap } = useContext(GMAPContext);
  const { username } = useContext(UserContext);

  // console.log("waypointsCoord", waypointsCoord);

  /////on GoogleMap APi load, will render a route
  const handleApiLoaded = (map, maps) => {
    setMaps(maps);
    setMap(map);
  };

  ////////////////////////////////////
  if (parksList === []) return <Loading />;
  //////////////////////////////////////

  return (
    <PageWrapper>
      {username ? (
        <SearchContainer>
          <p>Enter you point of departure and destination: </p>
          <DepartureDestination />
          <Waypoints />
          <SaveCleatTripBtn />
        </SearchContainer>
      ) : (
        <SearchContainer>
          <p>Sign In or Sign Up to use the trip planning feature.</p>
        </SearchContainer>
      )}
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* rendering all the parks on the map on load */}
          {parksList.map((park, i) => {
            // console.log("stopArrInMap", stopsArr);
            //console.log fine
            return (
              <LocationMarker
                key={park._id + i}
                lat={park.coordinates.lat}
                lng={park.coordinates.lng}
                park={park}
              />
            );
          })}
        </GoogleMapReact>
      </MapContainer>
    </PageWrapper>
  );
};

const SearchContainer = styled.div`
  height: 900px;
  width: 400px;
  border: 2px solid yellowgreen;
`;

const MapContainer = styled.div`
  height: 900px;
  width: 1300px;
  /* border: 3px solid red; */
`;
