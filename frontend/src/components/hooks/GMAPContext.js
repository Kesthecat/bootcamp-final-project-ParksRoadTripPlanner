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
          if (waypoints.length > 0) {
            setInitialBound();
          } else if (departure.name !== destination.name) {
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

    //figuring out which pins is which corner reference
    const swLat = departureLat > destinationLat ? destinationLat : departureLat;
    const neLat = departureLat > destinationLat ? departureLat : destinationLat;
    const swLng = departureLng > destinationLng ? destinationLng : departureLng;
    const neLng = departureLng > destinationLng ? departureLng : destinationLng;

    // Define the two corners of the bounding box
    // const sw = new GLatLng(swLat, swLng);
    // const ne = new GLatLng(neLat, neLng);

    // // Create a bounding box
    // const bounds = new GlatLngBounds(sw, ne);
    const bounds = new maps.LatLngBounds(
      new maps.LatLng(swLat, swLng),
      new maps.LatLng(neLat, neLng)
    );

    // Center map in the center of the bounding box
    // and calculate the appropriate zoom level
    map.fitBounds(bounds);

    // console.log("bounds", map.getBounds());
  };

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
        setInitialBound,
      }}
    >
      {children}
    </GMAPContext.Provider>
  );
};
