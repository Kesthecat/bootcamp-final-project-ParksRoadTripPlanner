import { useEffect, useState } from "react";
import { createContext } from "react";

export const GMAPContext = createContext();

export const GMAPProvider = ({ children }) => {
  const [maps, setMaps] = useState(null);
  const [map, setMap] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [polyline, setPolyline] = useState(null);

  let waypointsCoord = [];
  waypoints.forEach((point) => {
    waypointsCoord.push({
      stopover: true,
      location: point.coordinates,
    });
  });
  console.log({ waypoints, departure, destination, waypointsCoord });

  const setRoute = () => {
    if (!map || !maps) return;

    if (polyline) polyline.setMap(null);

    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route(
      {
        origin: departure.coordinates,
        destination: destination.coordinates,
        travelMode: maps.TravelMode.DRIVING,
        waypoints: waypointsCoord,
        // optimizeWaypoints: true,
      },
      (response, status) => {
        console.log({ response, status, response });
        if (status === "OK") {
          console.log({ map, maps });
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          routePolyline.setMap(map);
          setPolyline(routePolyline);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  useEffect(() => {
    setRoute();
  }, [waypoints]);

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
