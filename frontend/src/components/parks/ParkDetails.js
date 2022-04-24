import styled from "styled-components";
import { GiHeartPlus } from "react-icons/gi";
import { GiCampingTent } from "react-icons/gi";
import { FaSwimmer, FaHiking, FaDog } from "react-icons/fa";

export const ParkDetails = ({ park }) => {
  const handleFavorite = () => {
    window.alert("Feature coming soon!");
  };

  return (
    <Container>
      <InnerContainer className="contacts">
        <StyledP>Official website: </StyledP>
        <a href={park.website} target="_blank">
          {park.website}
        </a>
      </InnerContainer>
      <InnerContainer>
        <StyledP>
          <GiCampingTent
            style={{ marginRight: "10px", transform: "scale(1.5)" }}
          />
          Camping: <span>{park.camping.toUpperCase()}</span>
        </StyledP>
        <StyledP>
          {" "}
          <FaSwimmer style={{ marginRight: "10px", transform: "scale(1.5)" }} />
          Swimming: <span>{park.swimming.toUpperCase()}</span>
        </StyledP>
        <StyledP>
          <FaHiking style={{ marginRight: "10px", transform: "scale(1.5)" }} />
          Hiking: <span>{park.hiking.toUpperCase()}</span>
        </StyledP>
        <StyledP>
          <FaDog style={{ marginRight: "10px", transform: "scale(1.5)" }} />
          Pet Friendly: <span>{park.dog.toUpperCase()}</span>
        </StyledP>
      </InnerContainer>
      <BtnContainer onClick={() => handleFavorite()}>
        Add to favorite
        <StyledBtn>
          <GiHeartPlus style={{ transform: "scale(2)" }} />
        </StyledBtn>
      </BtnContainer>
    </Container>
  );
};

const StyledP = styled.p`
  margin: 5px 0;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 25px;
`;
const InnerContainer = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 20px;
  padding: 15px;
`;
const StyledBtn = styled.button`
  height: 50px;
  width: 65px;
  padding-top: 6px;
`;
