import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { bootstrapURLKeys } from "./GoogleMapKey";
import { LocationMarker } from "./LocationMarker";

expo rt const Map = () => {
    const handleApiLoaded = (map, maps, myMarkers) => {
        console.log('test')
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();
        directionsService.route({
          origin: { lat: 40.756795, lng: -73.954298 }, // first waypoint
          destination: { lat: 41.756795, lng: -78.954298 }, // last waypoint
          travelMode: maps.TravelMode.DRIVING,
          waypoints: [] // all the waypoints
        }, (response, status) => {
            console.log({response, status})
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            const routePolyline = new maps.Polyline({
              path: response.routes[0].overview_path
            });
            routePolyline.setMap(map);
          } else {
            window.alert('Directions request failed due to ' + status);
            }
          });
    };
// see: https://github.com/google-map-react/google-map-react/issues/916
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      <LocationMarker
        lat={45.471738324691806}
        lng={-73.40844863063269}
        text={"Park name as link"}
      />
      </GoogleMapReact>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 800px;
  width: 800px;
  border: 3px solid red;
`;