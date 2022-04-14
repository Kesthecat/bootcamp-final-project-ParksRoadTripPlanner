import { useContext } from "react";
import styled from "styled-components";
import { GMAPContext } from "../hooks/GMAPContext";
import { SearchBox } from "./SearchBox";

export const DepartureDestination = () => {
  const {
    setDeparture,
    setDestination,
    setRoute,
    setDepartureMarker,
    setDestinationMarker,
  } = useContext(GMAPContext);

  const handleClick = () => {
    setRoute();
    setDepartureMarker();
    setDestinationMarker();
  };

  return (
    <>
      <PointContainer>
        <p>Departure: </p>
        <SearchBox settingPoint={setDeparture} />
      </PointContainer>
      <PointContainer>
        <p>Destination: </p>
        <SearchBox settingPoint={setDestination} />
      </PointContainer>
      <StyledBtn onClick={() => handleClick()}>Render Route</StyledBtn>
    </>
  );
};
const PointContainer = styled.div`
  display: flex;
  border: 2px dotted purple;
`;
const StyledBtn = styled.button``;
