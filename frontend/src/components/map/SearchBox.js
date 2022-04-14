import { useContext, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";

export const SearchBox = ({ settingPoint, hasClear, setHasClear }) => {
  const { maps } = useContext(GMAPContext);
  const inputRef = useRef(null);

  let searchBox = {};
  const options = { fields: ["place_id", "name", "geometry"] };

  const handleOnPlacesChanged = () => {
    let place = searchBox.getPlace();
    // console.log("inside", place);
    if (!place.geometry || !place.geometry.location) {
      window.alert("Please select location from dropdown.");
    } else {
      // console.log("place", JSON.stringify(place.geometry.location));
      const location = JSON.stringify(place.geometry.location);
      const locationValues = Object.values(JSON.parse(location));
      const inputLocation = {
        coordinates: { lat: locationValues[0], lng: locationValues[1] },
        name: place.name,
      };
      // console.log(coordinates);
      settingPoint(inputLocation);
    }
  };

  if (maps) {
    searchBox = new maps.places.Autocomplete(inputRef.current, options);
    searchBox.addListener("place_changed", handleOnPlacesChanged);
  }

  return <StyledInput type="text" placeholder="Enter a place" ref={inputRef} />;
};

const StyledInput = styled.input``;
