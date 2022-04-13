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

///////////////////////////////////////////////////////////////

export const MainMap = ({ isSignedIn }) => {
  const { parksList } = useContext(ParksListContext);
  const { setMaps } = useContext(GMAPContext);
  const { username } = useContext(UserContext);

  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);

  let waypointsCoord = [];
  waypoints.forEach((point) => {
    waypointsCoord.push(point.coordinates);
  });

  // console.log("waypointsCoord", waypointsCoord);

  /////on GoogleMap APi load, will render a route
  const handleApiLoaded = (map, maps) => {
    setMaps(maps);

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

  ////////////////////////////////////
  if (parksList === []) return <Loading />;
  //////////////////////////////////////

  return (
    <PageWrapper>
      {username ? (
        <SearchContainer>
          <p>Enter you point of departure and destination: </p>
          <DepartureDestination
            setDeparture={setDeparture}
            setDestination={setDestination}
          />
          <Waypoints waypoints={waypoints} setWaypoints={setWaypoints} />
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
                setWaypoints={setWaypoints}
                waypoints={waypoints}
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
