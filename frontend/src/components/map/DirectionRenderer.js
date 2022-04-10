import { useEffect, useState } from "react";
import { DirectionsRenderer } from "react-google-maps";
const google = window.google;

export const MapDirectionsRenderer = (props) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  console.log({ google });
  useEffect(() => {
    if (!window.google) return;
    const { places, travelMode } = props;
    console.log("google", google);
    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        console.log(result);
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }
  return directions && <DirectionsRenderer directions={directions} />;
};
