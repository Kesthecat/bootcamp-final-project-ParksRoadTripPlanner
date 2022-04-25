import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { bootstrapURLKeys } from "./GoogleMapKey";
import { useContext, useState } from "react";

import { ParksListContext } from "../hooks/ParksContext";
import { LocationMarker } from "./LocationMarker";
import { FlagContext } from "../hooks/Flags";
import { GMAPContext } from "../hooks/GMAPContext";
import { DepartDestiMarker } from "./DepartDestiMarker";

export const MainGMAP = () => {
  const { parksList } = useContext(ParksListContext);
  const { setMaps, setMap, departure, destination } = useContext(GMAPContext);
  const { setNotTripPage } = useContext(FlagContext);

  const [activeModalId, setActiveModalId] = useState(null);
  const [pinnedModalId, setPinnedModalId] = useState(null);

  const handleApiLoaded = (map, maps) => {
    setMaps(maps);
    setMap(map);
    setNotTripPage(true);
  };

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={{ lat: 52.87927, lng: -91.47617 }}
        defaultZoom={4}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {parksList.map((park, i) => {
          return (
            <LocationMarker
              key={park._id + i}
              lat={park.coordinates.lat}
              lng={park.coordinates.lng}
              park={park}
              setIsShown={(bool) => setActiveModalId(bool ? park._id : null)}
              isShown={park._id === activeModalId || park._id === pinnedModalId}
              setIsPinned={(bool) => setPinnedModalId(bool ? park._id : null)}
            />
          );
        })}
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
      </GoogleMapReact>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 900px;
  width: 855px;
`;
