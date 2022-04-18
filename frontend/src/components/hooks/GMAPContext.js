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
  const [routeInfo, setRouteInfo] = useState([]);

  let waypointsCoord = [];
  waypoints.forEach((point) => {
    waypointsCoord.push({
      stopover: true,
      location: point.coordinates,
    });
  });

  const setRoute = () => {
    // console.log({
    //   waypoints,
    //   departure,
    //   destination,
    //   waypointsCoord,
    //   map,
    //   maps,
    // });
    if (polyline) polyline.setMap(null);
    if (!map || !maps || !departure || !destination) {
      polyline && polyline.setMap(null);
      return;
    }

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
        // console.log({ response, status, response });
        if (status === "OK") {
          setRouteInfo(response.routes[0].legs);
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          // console.log({ routePolyline });
          routePolyline.setMap(map);
          setPolyline(routePolyline);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  // const setDepartureMarker = () => {
  //   if (!map || !maps || !departure) return;
  //   let marker = new maps.Marker({
  //     position: departure.coordinates,
  //     map,
  //   });
  //   return marker;
  // };

  // const setDestinationMarker = () => {
  //   if (!map || !maps || !departure) return;
  //   let marker = new maps.Marker({
  //     position: destination.coordinates,
  //     map,
  //   });
  //   return marker;
  // };

  const nukeMap = () => {
    // console.log("nuke");
    polyline?.setMap(null);
    setDeparture(null);
    setDestination(null);
    setWaypoints([]);
    setRouteInfo([]);
  };
  useEffect(() => {
    // console.log("setRoute");
    setRoute();
  }, [waypoints, map, maps]);

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
        // setDepartureMarker,
        // setDestinationMarker,
        nukeMap,
        routeInfo,
        setRouteInfo,
        setPolyline,
      }}
    >
      {children}
    </GMAPContext.Provider>
  );
};
