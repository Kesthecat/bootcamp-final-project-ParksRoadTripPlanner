import { useContext, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";

export const SearchBox = ({ settingPoint }) => {
  const { maps } = useContext(GMAPContext);
  const inputRef = useRef(null);
  let searchBox = {};
  const options = { fields: ["place_id", "name", "geometry"] };

  const handleOnPlacesChanged = () => {
    let place = searchBox.getPlace();
    console.log("inside", place);
    if (!place.geometry || !place.geometry.location) {
      window.alert("Please select location from dropdown.");
    } else {
      // console.log("place", JSON.stringify(place.geometry.location));
      const location = JSON.stringify(place.geometry.location);
      const locationValues = Object.values(JSON.parse(location));
      const coordinates = { lat: locationValues[0], lng: locationValues[1] };
      // console.log(coordinates);
      settingPoint(
        coordinates
        // lat: JSON.stringify(place.geometry.location.lat),
        // lng: JSON.stringify(place.geometry.location.lng),
      );
    }
  };

  // useEffect(() => {
  if (maps) {
    searchBox = new maps.places.Autocomplete(inputRef.current, options);
    // searchBar.bindTo("bounds", map)
    //map.controls[maps.ControlPosition.TOP_LEFT].push(searchInput.current);
    //<Search ref={searchInput} type="text" placeholder="Search Box" />
    searchBox.addListener("place_changed", handleOnPlacesChanged);
  }
  // return () => {
  //     if (maps) {
  //       searchBox = null;
  //       maps.event.clearInstanceListeners(searchBox);
  //     }
  //   };
  // }, [maps, handleOnPlacesChanged]);

  //

  return <StyledInput type="text" placeholder="Enter a place" ref={inputRef} />;
};

const StyledInput = styled.input``;
