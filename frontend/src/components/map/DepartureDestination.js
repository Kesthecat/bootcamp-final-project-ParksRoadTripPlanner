import styled from "styled-components";
// import { SearchBox } from "./SearchBox";

export const DepartureDestination = () => {
  return (
    <>
      <PointContainer>
        <p>Departure: </p>
        {/* <SearchBox maps={maps} /> */}
      </PointContainer>
      <PointContainer>
        <p>Destination: </p>
        {/* <SearchBox maps={maps} /> */}
      </PointContainer>
    </>
  );
};
const PointContainer = styled.div`
  display: flex;
  border: 2px dotted purple;
`;
