import { useContext, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";

export const SearchBox = ({ settingPoint, hasClear, setHasClear }) => {
  const { maps } = useContext(GMAPContext);
  const inputRef = useRef(null);
  // const [temp, setTemp] = useState("");

  let searchBox = {};
  const options = { fields: ["place_id", "name", "geometry"] };

  const handleOnPlacesChanged = (e) => {
    // setTemp(e.target.value);
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
      settingPoint(inputLocation);
      // setTemp(place.name);
    }
  };

  if (maps) {
    searchBox = new maps.places.Autocomplete(inputRef.current, options);
    searchBox.addListener("place_changed", handleOnPlacesChanged);
  }

  // if (hasClear) {
  //   setHasClear(false);
  //   setTemp("");
  // }

  return (
    <StyledInput
      type="text"
      placeholder="Enter a place"
      // value={temp}
      // onChange={(e) => handleOnPlacesChanged(e)}
      ref={inputRef}
    />
  );
};

const StyledInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
  padding-left: 5px;
  border-radius: 5px;
`;
