import styled from "styled-components";
import { SearchBox } from "./SearchBox";

export const DepartureDestination = ({ setDeparture, setDestination }) => {
  // const settingDeparture = (location) => {
  //   setDeparture(location);
  // };

  // const settingDestination = (location) => {
  //   setDestination(location);
  // };

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
      <StyledBtn>Render Route</StyledBtn>
    </>
  );
};
const PointContainer = styled.div`
  display: flex;
  border: 2px dotted purple;
`;
const StyledBtn = styled.button``;
