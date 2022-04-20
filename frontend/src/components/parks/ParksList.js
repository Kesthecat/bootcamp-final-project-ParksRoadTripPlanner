import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ParksListContext } from "../hooks/ParksContext";
import { Loading } from "../Loading";
import { Logo } from "../ParksLogo";

export const ParksList = () => {
  const { origins, parksList } = useContext(ParksListContext);

  if (origins === [] || parksList === []) return <Loading />;

  return (
    <>
      <StyledH1>Canada and Provincial Parks</StyledH1>
      <Logo />
      {/* <ChoicesContainer> trying to have clickables to bring to the right section on page but hash link not working for me....
        {origins.map((origin) => {
          return (
            <Link
              to={{ hash: `#${origin}`, pathname: "/parks" }}
              key={`link-${origin}`}
            >
              {origin}
            </Link>
          );
        })}
      </ChoicesContainer> */}
      <Container>
        {origins.map((origin) => {
          return (
            <ListContainer key={origin}>
              <Origin id={origin}>{origin}</Origin>
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

///a little chaotic style-components.... i think less is needed...
const Container = styled.div``;
const StyledH1 = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-main);
  padding-bottom: 10px;
`;
// const ChoicesContainer = styled.div`
//   border: 2px solid palevioletred;
// `;
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
