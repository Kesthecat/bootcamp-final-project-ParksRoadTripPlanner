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
        <StyledP>Departure: </StyledP>
        <SearchBox settingPoint={setDeparture} />
      </PointContainer>
      <PointContainer>
        <StyledP>Destination: </StyledP>
        <SearchBox settingPoint={setDestination} />
      </PointContainer>
      <StyledBtn onClick={() => handleClick()}>Render Route</StyledBtn>
    </>
  );
};
const PointContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 2px dotted purple; */
`;
const StyledP = styled.p`
  margin-right: 10px;
`;
const StyledBtn = styled.button`
  width: 155px;
  height: 30px;
  font-size: 22px;
  /* margin-top: 10px; */
`;
