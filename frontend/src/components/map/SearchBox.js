import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

// onPlacesChanged

export const SearchBox = ({ maps }) => {
  const inputRef = useRef(null);
  const searchBox = useRef(null);

  // const handleOnPlacesChanged = useCallback(() => {
  //   if (onPlacesChanged) {
  //     onPlacesChanged(searchBox.current.getPlaces());
  //   }
  // }, [onPlacesChanged, searchBox]);

  useEffect(() => {
    if (!searchBox.current && maps) {
      searchBox.current = new maps.places.SearchBox(inputRef.current);
      // searchBox.current.addListener("places_changed", handleOnPlacesChanged);
    }
    return () => {
      if (maps) {
        searchBox.current = null;
        maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [maps]);

  // handleOnPlacesChanged

  return <StyledInput type="text" placeholder="Enter a place" ref={inputRef} />;
};

const StyledInput = styled.input``;
