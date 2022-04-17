import styled from "styled-components";
import alberta from "../assets/AL-logo.png";
import BC from "../assets/BC-logo.jpg";
import canada from "../assets/Canada-logo.jpg";
import manitoba from "../assets/MB-logo.jpg";
import newB from "../assets/NB-logo.png";
import newLand from "../assets/NL-logo.png";
import novaScotia from "../assets/NS-logo.png";
import ontario from "../assets/ON-logo.png";
import pei from "../assets/PEI-logo.jpg";
import sepaq from "../assets/SEPAQ-logo.jpg";
import sask from "../assets/SK-logo.png";

export const Logo = () => {
  return (
    <Container>
      <StyledImg src={alberta} alt="Alberta parks' logo" className="alberta" />
      <StyledImg src={BC} alt="Bristish Columbia parks' logo" className="bc" />
      <StyledImg src={canada} alt="Canada Parks' logo" className="canada" />
      <StyledImg
        src={manitoba}
        alt="Manitoba parks' logo"
        className="manitoba"
      />
      <StyledImg src={newB} alt="New Brunswick parks' logo" className="newB" />
      <StyledImg
        src={newLand}
        alt="Newfoundland and Labrador parks' logo"
        className="newLand"
      />
      <StyledImg
        src={novaScotia}
        alt="Nova Scotia parks' logo"
        className="nova"
      />
      <StyledImg src={ontario} alt="Ontatio parks' logo" className="ontario" />
      <StyledImg
        src={pei}
        alt="Prince Edward Island parks' logo"
        className="pei"
      />
      <StyledImg src={sepaq} alt="Sepaq logo" className="sepaq" />
      <StyledImg src={sask} alt="Saskatchewan" className="sask" />
    </Container>
  );
};
const Container = styled.div`
  /* display: flex; */
`;
const StyledImg = styled.img`
  display: inline-block;
  position: relative;
  opacity: 0.5;

  &.alberta {
    left: 15px;
    width: 200px;
  }
  &.bc {
    width: 300px;
    top: -55px;
    right: -23px;
  }
  &.canada {
    top: 62px;
    right: -80px;
    height: 160px;
  }
  &.manitoba {
    width: 250px;
  }
  &.newB {
    width: 300px;
  }
  &.nova {
    width: 300px;
  }
  &.ontario {
    height: 160px;
  }
  &.pei {
    width: 230px;
  }
  &.sepaq {
    width: 200px;
  }
  &.sask {
  }
`;
