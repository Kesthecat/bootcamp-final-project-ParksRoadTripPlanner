import styled from "styled-components";

export const About = () => {
  return (
    <>
      <Container>
        <StyledH2>About this Project</StyledH2>
        <InnerContainer>
          <StyledP>
            Version 1.1 of this website was created in the context of my
            Concordia Full-Stack Web Developper Bootcamp final project.
            Completion date: April 19th, 2022
          </StyledP>
        </InnerContainer>
        <InnerContainer>
          <Styledh4>Library and APIs used:</Styledh4>
          <StyledUl>
            <StyledLi>
              Google Maps API (Map, Place and Directions) from
              <StyledA
                href="https://developers.google.com/maps"
                target="_blank"
              >
                https://developers.google.com/maps
              </StyledA>
            </StyledLi>
            <StyledLi>
              Google-Map_React from{" "}
              <StyledA
                href="https://www.npmjs.com/package/google-map-react"
                target="_blank"
              >
                https://www.npmjs.com/package/google-map-react
              </StyledA>
            </StyledLi>
            <StyledLi>
              React-Icons from{" "}
              <StyledA
                href="https://react-icons.github.io/react-icons"
                target="_blank"
              >
                https://react-icons.github.io/react-icons
              </StyledA>
            </StyledLi>
            <StyledLi>
              date-fns from
              <StyledA href="https://date-fns.org/" target="_blank">
                https://date-fns.org/
              </StyledA>
            </StyledLi>
            <StyledLi>
              moment.js from
              <StyledA href="https://momentjs.com/" target="_blank">
                https://momentjs.com/
              </StyledA>
            </StyledLi>
          </StyledUl>
        </InnerContainer>
      </Container>
      <Container>
        <StyledH2>Special thanks and copyrights 🍓</StyledH2>
        <InnerContainer>
          <StyledP>
            Specials thanks to the intructors at Concordia Bootcamp for their
            help as well as my husband who provided after class hour assistance.
          </StyledP>
        </InnerContainer>
        <InnerContainer>
          <Styledh4>Images and gif source: </Styledh4>
          <StyledUl>
            <StyledLi>
              Gif on Loading page by Yimbo Escárrega from
              <StyledA
                href="https://dribbble.com/shots/4161554-Roadtrip"
                target="_blank"
              >
                https://dribbble.com/shots/4161554-Roadtrip
              </StyledA>
            </StyledLi>
            <StyledLi>
              Gif on Error page by dickeamanda from{" "}
              <StyledA
                href="https://tenor.com/view/map-what-where-searching-gif-15716893"
                target="_blank"
              >
                https://tenor.com/view/map-what-where-searching-gif-15716893
              </StyledA>
            </StyledLi>
            <StyledLi>
              Rocher Perce picture by RADIO-CANADA / ISABELLE LAROSE from{" "}
              <StyledA
                href="https://ici.radio-canada.ca/nouvelle/1813102/rocher-perce-2e-trou-erosion-geologie-cavite"
                target="_blank"
              >
                https://ici.radio-canada.ca/nouvelle/1813102/rocher-perce-2e-trou-erosion-geologie-cavite
              </StyledA>
            </StyledLi>
            <StyledLi>
              Lake Louise picture from{" "}
              <StyledA
                href="https://www.escape.com.au/destinations/north-america/canada/lake-louise-truth-behind-the-atypical-water-colour/news-story/c81de9112845fd41cdffeffa17d558ae"
                target="_blank"
              >
                https://www.escape.com.au/destinations/north-america/canada/lake-louise-truth-behind-the-atypical-water-colour/news-story/c81de9112845fd41cdffeffa17d558ae
              </StyledA>
            </StyledLi>
            <StyledLi>
              Hiking picture from{" "}
              <StyledA
                href="https://www.lemassif.com/en/activities-events/activity-finder/hiking"
                target="_blank"
              >
                https://www.lemassif.com/en/activities-events/activity-finder/hiking
              </StyledA>
            </StyledLi>
            <StyledLi>
              Camping picture by Lana Law from{" "}
              <StyledA
                href="https://www.planetware.com/canada/best-places-for-camping-in-ontario-cdn-1-248.htm"
                target="_blank"
              >
                https://www.planetware.com/canada/best-places-for-camping-in-ontario-cdn-1-248.htm
              </StyledA>
            </StyledLi>
            <StyledLi>
              Sandbanks picture from{" "}
              <StyledA
                href="          https://www.ontarioparks.com/park/sandbanks/camping
              "
                target="_blank"
              >
                {" "}
                https://www.ontarioparks.com/park/sandbanks/camping
              </StyledA>
            </StyledLi>
            <StyledLi>
              All parks logo from their respective official website.
            </StyledLi>
          </StyledUl>
        </InnerContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  border: 25px solid var(--color-secondary);
  background-color: var(--color-tertiary);
  padding: 15px;
`;
const InnerContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledH2 = styled.h2``;
const Styledh4 = styled.h4`
  margin-bottom: 5px;
`;
const StyledP = styled.p`
  padding-left: 25px;
`;
const StyledUl = styled.ul`
  list-style: disc;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 25px;
`;
const StyledLi = styled.li``;
const StyledA = styled.a`
  margin-left: 5px;
`;
