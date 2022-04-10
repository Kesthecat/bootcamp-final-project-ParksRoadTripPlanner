import React from "react";
import { useRef } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MapDirectionsRenderer } from "./DirectionRenderer";

const places = [
  { latitude: 25.8103146, longitude: -80.1751609 },
  { latitude: 27.9947147, longitude: -82.5943645 },
  { latitude: 28.4813018, longitude: -81.4387899 },
  //...
];

const Map = withScriptjs(
  withGoogleMap((props) => {
    const mapRef = useRef(null);
    return (
      <GoogleMap
        ref={mapRef}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {props.places.map((marker, index) => {
          const position = { lat: marker.latitude, lng: marker.longitude };
          return <Marker key={index} position={position} />;
        })}
        <MapDirectionsRenderer
          places={props.places}
          travelMode={window.google.maps.TravelMode.DRIVING}
        />
      </GoogleMap>
    );
  })
);

export const AppMap = (props) => {
  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom,
  } = props;

  return (
    <Map
      googleMapURL={""}
      places={places}
      loadingElement={loadingElement || <div style={{ height: `100%` }} />}
      containerElement={containerElement || <div style={{ height: "80vh" }} />}
      mapElement={mapElement || <div style={{ height: `100%` }} />}
      defaultCenter={defaultCenter || { lat: 25.798939, lng: -80.291409 }}
      defaultZoom={defaultZoom || 11}
    />
  );
};

// export default AppMap;
