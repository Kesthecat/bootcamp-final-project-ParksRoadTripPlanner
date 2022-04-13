import { useState } from "react";
import { createContext } from "react";

export const GMAPContext = createContext();

export const GMAPProvider = ({ children }) => {
  const [maps, setMaps] = useState(null);
  const [map, setMap] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);

  let waypointsCoord = [];
  waypoints.forEach((point) => {
    waypointsCoord.push(point.coordinates);
  });

  const setRoute = () => {
    if (!map || !maps) {
      return;
    }
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route(
      {
        origin: departure.coordinates,
        destination: destination.coordinates,
        // origin: { lat: 40.756795, lng: -73.954298 }, // first waypoint
        // destination: { lat: 41.756795, lng: -78.954298 }, // last waypoint
        travelMode: maps.TravelMode.DRIVING,
        waypoints: waypointsCoord,
        // waypoints: [], // all the waypoints
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

  return (
    <GMAPContext.Provider
      value={{
        maps,
        setMaps,
        setMap,
        waypoints,
        setWaypoints,
        departure,
        setDeparture,
        destination,
        setDestination,
        setRoute,
      }}
    >
      {children}
    </GMAPContext.Provider>
  );
};
