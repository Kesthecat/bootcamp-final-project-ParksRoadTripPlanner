import { useState } from "react";
import styled from "styled-components";
import { SearchBox } from "./SearchBox";

export const DepartureDestination = ({ setDeparture, setDestination }) => {
  const [address, setAddress] = useState(null);

  const settingDeparture = (location) => {
    setDeparture(location);
  };

  const settingDestination = (location) => {
    setDestination(location);
  };

  return (
    <>
      <PointContainer>
        <p>Departure: </p>
        <SearchBox settingPoint={settingDeparture} />
      </PointContainer>
      <PointContainer>
        <p>Destination: </p>
        <SearchBox settingPoint={settingDestination} />
      </PointContainer>
    </>
  );
};
const PointContainer = styled.div`
  display: flex;
  border: 2px dotted purple;
`;
