import { useContext, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";

export const SearchBox = ({ settingPoint }) => {
  const { maps } = useContext(GMAPContext);
  const inputRef = useRef(null);
  let searchBox = {};

  const handleOnPlacesChanged = () => {
    let place = searchBox.getPlace();
    if (!place.geometry || !place.geometry.location) {
      window.alert("Please select location from dropdown.");
    } else {
      console.log("place", JSON.stringify(place.geometry.location));
      settingPoint(place.geometry.location);
    }
  };

  useEffect(() => {
    if (!searchBox && maps) {
      searchBox = new maps.places.Autocomplete(inputRef.current, {});
      // searchBar.bindTo("bounds", map)
      //map.controls[maps.ControlPosition.TOP_LEFT].push(searchInput.current);
      //<Search ref={searchInput} type="text" placeholder="Search Box" />
      searchBox.addListener("place_changed", handleOnPlacesChanged);
    }
    return () => {
      if (maps) {
        searchBox = null;
        maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [maps, handleOnPlacesChanged]);

  //

  return <StyledInput type="text" placeholder="Enter a place" ref={inputRef} />;
};

const StyledInput = styled.input``;
