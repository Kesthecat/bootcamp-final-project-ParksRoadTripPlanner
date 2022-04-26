import { HashLink } from "react-router-hash-link";
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
      <Container className="row">
        <HashLink smooth to="/parks/#CanadaParks">
          <StyledImg src={canada} alt="Canada Parks' logo" className="canada" />
        </HashLink>
        <HashLink smooth to="/parks/#Alberta">
          <StyledImg
            src={alberta}
            alt="Alberta parks' logo"
            className="alberta"
          />
        </HashLink>
        <HashLink smooth to="/parks/#BritishColumbia">
          <StyledImg
            src={BC}
            alt="Bristish Columbia parks' logo"
            className="bc"
          />
        </HashLink>
        <HashLink smooth to="/parks/#Manitoba">
          <StyledImg
            src={manitoba}
            alt="Manitoba parks' logo"
            className="manitoba"
          />
        </HashLink>
        <HashLink smooth to="/parks/#NewBrunswick">
          <StyledImg
            src={newB}
            alt="New Brunswick parks' logo"
            className="newB"
          />
        </HashLink>
        <HashLink smooth to="/parks/#NewfoundlandandLabrador">
          <StyledImg
            src={newLand}
            alt="Newfoundland and Labrador parks' logo"
            className="newLand"
          />
        </HashLink>
      </Container>
      <Container className="row">
        <HashLink smooth to="/parks/#NovaScotia">
          <StyledImg
            src={novaScotia}
            alt="Nova Scotia parks' logo"
            className="nova"
          />
        </HashLink>
        <HashLink smooth to="/parks/#Ontario">
          <StyledImg
            src={ontario}
            alt="Ontatio parks' logo"
            className="ontario"
          />
        </HashLink>
        <HashLink smooth to="/parks/#PrinceEdwardIsland">
          <StyledImg
            src={pei}
            alt="Prince Edward Island parks' logo"
            className="pei"
          />
        </HashLink>
        <HashLink smooth to="/parks/#Sepaq">
          <StyledImg src={sepaq} alt="Sepaq logo" className="sepaq" />
        </HashLink>
        <HashLink smooth to="/parks/#Saskatchewas">
          <StyledImg src={sask} alt="Saskatchewan" className="sask" />
        </HashLink>
      </Container>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  &.row {
    flex-direction: row;
    gap: 45px;
  }
`;
const StyledImg = styled.img`
  display: inline-block;
  position: relative;
  width: 100px;

  &.alberta {
  }
  &.bc {
    width: 130px;
  }
  &.canada {
    width: 50px;
  }
  &.manitoba {
  }
  &.newB {
    width: 130px;
  }
  &.nova {
  }
  &.ontario {
    width: 50px;
  }
  &.pei {
    width: 90px;
  }
  &.sepaq {
    width: 90px;
  }
  &.sask {
  }
`;
