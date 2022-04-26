import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { Logo } from "../ParksLogo";
import { ToTopBtn } from "./ToTopBtn";

export const ParksList = () => {
  const { origins, parksList } = useContext(ParksListContext);

  if (origins === [] || parksList === []) return <Loading />;

  return (
    <>
      <TopContainer>
        <ToTopBtn />
      </TopContainer>
      <StyledH1 id="top">Canada and Provincial Parks</StyledH1>
      <Logo />
      <Container>
        {origins.map((origin) => {
          return (
            <ListContainer key={origin}>
              <Origin id={origin.replaceAll(" ", "")}>{origin}</Origin>
              <LabelsContainer>
                <LeftSide>
                  <Data>Park Name</Data>
                </LeftSide>
                <RightSide className="labels">
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
                          <Data className="name">{park.name}</Data>
                        </NameLink>
                      </LeftSide>
                      <RightSide className="park">
                        <Data className="YesNo">
                          {park.camping.toUpperCase()}
                        </Data>
                        <Data className="YesNo">
                          {park.swimming.toUpperCase()}
                        </Data>
                        <Data className="YesNo">
                          {park.hiking.toUpperCase()}
                        </Data>
                        <Data className="YesNo">{park.dog.toUpperCase()}</Data>
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

const TopContainer = styled.div`
  position: fixed;
  top: 83vh;
  left: 85vw;
`;
const Container = styled.div``;
const StyledH1 = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-main);
  padding-bottom: 10px;
`;
const ListContainer = styled.div``;
const Origin = styled.h2`
  padding-left: 15px;
  background-color: var(--color-secondary);
  padding: 15px;
`;
const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  position: sticky;
  top: 0;
  background-color: var(--color-tertiary);
`;
const LeftSide = styled.div`
  padding: 10px 0;
`;
const RightSide = styled.div`
  display: flex;
  gap: 20px;

  &.labels {
    align-items: center;
  }

  &.park {
    justify-content: space-evenly;
    width: 385px;
    gap: 85px;
    margin-right: 72px;
    align-items: center;
  }
`;
const Data = styled.h3`
  &.name {
    font-weight: 200;
  }
  &.YesNo {
    font-weight: 200;
  }
`;
const ParkContainer = styled.div`
  border: 1px solid var(--color-tertiary);
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
const NameLink = styled(NavLink)`
  font-size: 20px;
`;
