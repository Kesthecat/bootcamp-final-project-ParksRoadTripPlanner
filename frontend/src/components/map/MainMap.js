import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { bootstrapURLKeys } from "./GoogleMapKey";
import { useContext } from "react";

import { LocationMarker } from "./LocationMarker";
import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { useState } from "react";
import { PageWrapper } from "../PageWrapper";
// import { SearchBox } from "./SearchBox";

export const MainMap = () => {
  const { parksList } = useContext(ParksListContext);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  //   console.log(parksList);

  //on GoogleMap APi load, will render a route
  const handleApiLoaded = (map, maps) => {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route(
      {
        origin: { lat: 40.756795, lng: -73.954298 }, // first waypoint
        destination: { lat: 41.756795, lng: -78.954298 }, // last waypoint
        travelMode: maps.TravelMode.DRIVING,
        waypoints: [], // all the waypoints
      },
      (response, status) => {
        console.log({ response, status });
        if (status === "OK") {
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          routePolyline.setMap(map);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  if (parksList === []) return <Loading />;

  return (
    <PageWrapper>
      <SearchContainer>
        <p>Enter you point of departure and destination: </p>
        <PointContainer>
          <p>Departure: </p>
          {/* <SearchBox maps={maps} /> */}
        </PointContainer>
        <PointContainer>
          <p>Destination: </p>
          {/* <SearchBox maps={maps} /> */}
        </PointContainer>
        <WayPointsContainer>
          <p>Your Stops:</p>
          <p>List of waypoints added from pins on map.</p>
        </WayPointsContainer>
        <FunctionsContainer>
          <StyledBtn>Clear Trip</StyledBtn>
          <StyledBtn>Save Trip</StyledBtn>
        </FunctionsContainer>
      </SearchContainer>
      <MapContainer>
        <GoogleMapReact
          // bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* rendering all the parks on the map on load */}
          {parksList.map((park, i) => {
            const lat = park.coordinates.lat;
            return (
              <LocationMarker
                key={park._id + i}
                lat={lat}
                lng={park.coordinates.lng}
                text={park.name}
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
const PointContainer = styled.div`
  display: flex;
  border: 2px dotted purple;
`;
const WayPointsContainer = styled.div`
  background-color: gray;
`;
const FunctionsContainer = styled.div``;
const StyledBtn = styled.button``;
const MapContainer = styled.div`
  height: 900px;
  width: 1300px;
  /* border: 3px solid red; */
`;
