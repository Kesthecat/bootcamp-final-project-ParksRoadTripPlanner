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
          // console.log(response.routes[0].legs[0].end_location.lat());
          setRouteInfo(response.routes[0].legs);
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          // console.log({ routePolyline });
          routePolyline.setMap(map);
          setPolyline(routePolyline);
          if (departure.name !== destination.name) {
            setInitialBound();
          }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  const setInitialBound = () => {
    const departureLat = departure.coordinates.lat;
    const departureLng = departure.coordinates.lng;
    const destinationLat = destination.coordinates.lat;
    const destinationLng = destination.coordinates.lng;

    //figuring out the 4 corners of the bounding box
    const swLat = departureLat > destinationLat ? destinationLat : departureLat;
    const neLat = departureLat > destinationLat ? departureLat : destinationLat;
    const swLng = departureLng > destinationLng ? destinationLng : departureLng;
    const neLng = departureLng > destinationLng ? departureLng : destinationLng;

    // // Create a bounding box
    const bounds = new maps.LatLngBounds(
      new maps.LatLng(swLat, swLng),
      new maps.LatLng(neLat, neLng)
    );

    // Center map in the center of the bounding box
    map.fitBounds(bounds);
  };

  // const setWaypointsBound = () => {

  //   //figuring out the 4 corners of the bounding box
  //   const mostSWLat = waypoints.reduce((acc, cur) => {
  //     if (acc.coordinates.lat > cur.coordinates.lat) { //says cannot read undefined, reading lat..
  //       acc = cur;
  //     }
  //     return acc.coordinates.lat;
  //   }, waypoints[0]);

  //   const mostNELat = waypoints.reduce((acc, cur) => {
  //     if (acc.coordinates.lat < cur.coordinates.lat) {
  //       acc = cur;
  //     }
  //     return acc.coordinates.lat;
  //   }, waypoints[0]);

  //   const mostSWLng = waypoints.reduce((acc, cur) => {
  //     if (acc.coordinates.lng > cur.coordinates.lng) {
  //       acc = cur;
  //     }
  //     return acc.coordinates.lng;
  //   }, waypoints[0]);

  //   const mostNELng = waypoints.reduce((acc, cur) => {
  //     if (acc.coordinates.lng < cur.coordinates.lng) {
  //       acc = cur;
  //     }
  //     return acc.coordinates.lng;
  //   }, waypoints[0]);

  //   console.log("swLat", mostSWLat);
  //   // // Create a bounding box
  //   const bounds = new maps.LatLngBounds(
  //     new maps.LatLng(mostSWLat, mostSWLng),
  //     new maps.LatLng(mostNELat, mostNELng)
  //   );

  //   // Center map in the center of the bounding box
  //   map.fitBounds(bounds);
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
