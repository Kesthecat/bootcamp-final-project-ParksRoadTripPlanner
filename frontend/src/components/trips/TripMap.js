import { useContext, useState } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { DepartDestiMarker } from "../map/DepartDestiMarker";
import { LocationMarker } from "../map/LocationMarker";
import { bootstrapURLKeys } from "../map/GoogleMapKey";
import { GMAPContext } from "../hooks/GMAPContext";

export const TripMap = () => {
  const [activeModalId, setActiveModalId] = useState(null);
  const [pinnedModalId, setPinnedModalId] = useState(null);

  const { setMap, setMaps, waypoints, departure, destination } =
    useContext(GMAPContext);

  const handleApiLoaded = (map, maps) => {
    setMaps(maps);
    setMap(map);
  };

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
        defaultZoom={4}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {!!departure && (
          <DepartDestiMarker
            lat={departure.coordinates.lat}
            lng={departure.coordinates.lng}
          />
        )}
        {!!destination && (
          <DepartDestiMarker
            lat={destination.coordinates.lat}
            lng={destination.coordinates.lng}
          />
        )}
        {waypoints.map((waypoint, i) => {
          return (
            <LocationMarker
              key={i}
              lat={waypoint.coordinates.lat}
              lng={waypoint.coordinates.lng}
              park={waypoint}
              setIsShown={(bool) =>
                setActiveModalId(bool ? waypoint._id : null)
              }
              isShown={
                waypoint._id === activeModalId || waypoint._id === pinnedModalId
              }
              setIsPinned={(bool) =>
                setPinnedModalId(bool ? waypoint._id : null)
              }
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 600px;
  width: 820px;
  margin-top: 15px;
`;
