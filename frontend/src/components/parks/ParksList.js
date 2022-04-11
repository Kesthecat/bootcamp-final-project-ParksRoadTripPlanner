import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ParksListContext } from "../hooks/ParksContext";

export const ParksList = () => {
  const { origins, parksList } = useContext(ParksListContext);

  // console.log("origin", origins);
  // console.log("parks", parksList);

  return (
    <>
      <h2>Canada and Provincial Parks</h2>
      <Container>
        {origins.map((origin) => {
          return (
            <ListContainer key={origin}>
              <Origin>{origin}</Origin>
              <LabelsContainer>
                <LeftSide>
                  <Data>Name</Data>
                </LeftSide>
                <RightSide>
                  <Data>Camping</Data>
                  <Data>Swimming</Data>
                  <Data>Hiking</Data>
                  <Data>Pet Friendly</Data>
                </RightSide>
              </LabelsContainer>
              {parksList.map((park) => {
                if (park.parkOrigin === origin) {
                  return (
                    <ParkContainer key={park._id}>
                      <LeftSide>
                        <NameLink to={`/parks/${park._id}`}>
                          {park.name}
                        </NameLink>
                      </LeftSide>
                      <RightSide className="park">
                        <Data>{park.camping.toUpperCase()}</Data>
                        <Data>{park.swimming.toUpperCase()}</Data>
                        <Data>{park.hiking.toUpperCase()}</Data>
                        <Data>{park.dog.toUpperCase()}</Data>
                      </RightSide>
                    </ParkContainer>
                  );
                }
              })}
            </ListContainer>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  border: 2px solid gray;
`;
const ListContainer = styled.div`
  border: 2px dotted purple;
`;
const Origin = styled.h2`
  border: 2px solid gray;
  padding-left: 15px;
`;
const LabelsContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
const LeftSide = styled.div``;
const RightSide = styled.div`
  display: flex;
  gap: 20px;

  /* not working???? */
  .park {
    color: red;
  }
`;
const Data = styled.h3``;
const ParkContainer = styled.div`
  border: 2px solid green;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
const NameLink = styled(NavLink)``;
