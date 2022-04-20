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
            setBound();
          }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  const setBound = () => {
    //departure, destination, waypoints
    const allCoord = [
      departure.coordinates,
      destination.coordinates,
      ...waypoints.map((point) => point.coordinates),
    ];
    const mostSWLat = allCoord.reduce((acc, cur) => {
      console.log({ acc, cur });
      if (acc > cur.lat) {
        //says cannot read undefined, reading lat..
        return cur.lat;
      }
      return acc;
    }, allCoord[0].lat);

    const mostNELat = allCoord.reduce((acc, cur) => {
      if (acc < cur.lat) {
        return cur.lat;
      }
      return acc;
    }, allCoord[0].lat);

    const mostSWLng = allCoord.reduce((acc, cur) => {
      if (acc > cur.lng) {
        return cur.lng;
      }
      return acc;
    }, allCoord[0].lng);

    const mostNELng = allCoord.reduce((acc, cur) => {
      if (acc < cur.lng) {
        return cur.lng;
      }
      return acc;
    }, allCoord[0].lng);

    // // Create a bounding box
    const bounds = new maps.LatLngBounds(
      new maps.LatLng(mostSWLat, mostSWLng),
      new maps.LatLng(mostNELat, mostNELng)
    );

    // Center map in the center of the bounding box
    map.fitBounds(bounds);
  };

  const nukeMap = () => {
    polyline?.setMap(null);
    setDeparture(null);
    setDestination(null);
    setWaypoints([]);
    setRouteInfo([]);
  };
  useEffect(() => {
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
