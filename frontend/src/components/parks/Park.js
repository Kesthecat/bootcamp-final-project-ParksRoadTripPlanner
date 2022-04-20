import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { GiHeartPlus } from "react-icons/gi";
import { GiCampingTent } from "react-icons/gi";
import { FaSwimmer, FaHiking, FaDog } from "react-icons/fa";

import { Loading } from "../Loading";
import { ReviewForm } from "../ReviewsForm";
import { PostedReviews } from "../PostedReviews";

export const Park = () => {
  const { id } = useParams();

  const [park, setPark] = useState(null);
  const [parkLoad, setParkLoad] = useState("idle"); //loaded
  const [hasNewReview, setHasNewReview] = useState(false);
  const [newReview, setNewReview] = useState(null);

  let history = useHistory();

  useEffect(() => {
    fetch(`/parks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        if (data.message !== "success") {
          history.push("/Error");
          return;
        }
        setPark(data.data);
        setParkLoad("loaded");
      })
      .catch((error) => {
        // console.log(error.message);
        history.push("/Error");
      });
  }, []);

  const handleFavorite = () => {
    window.alert("Feature coming soon!");
  };

  if (parkLoad === "idle") return <Loading />;

  return (
    <>
      <Styledh1>{park.name}</Styledh1>
      <InfoContainer>
        <Intro>{park.introduction}</Intro>
        <MiddleContainer>
          <InnerContainer className="contacts">
            {/* <StyledP>Address: </StyledP> */}
            {/* <p>{park.address}</p> */}
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
              <FaSwimmer
                style={{ marginRight: "10px", transform: "scale(1.5)" }}
              />
              Swimming: <span>{park.swimming.toUpperCase()}</span>
            </StyledP>
            <StyledP>
              <FaHiking
                style={{ marginRight: "10px", transform: "scale(1.5)" }}
              />
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
        </MiddleContainer>
      </InfoContainer>
      <ReviewsContainer>
        <h3 style={{ borderBottom: "1px solid var(--color-main)" }}>Reviews</h3>
        <ReviewForm
          parkId={id}
          setNewReview={setNewReview}
          setHasNewReview={setHasNewReview}
        />
        <PostedReviews
          parkId={id}
          hasNewReview={hasNewReview}
          newReview={newReview}
        />
      </ReviewsContainer>
    </>
  );
};

const Styledh1 = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-main);
  padding-bottom: 10px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dotted var(--color-secondary);
`;
const Intro = styled.p`
  margin: 25px;
  padding: 15px;
  height: fit-content;
`;
const StyledP = styled.p`
  margin: 5px 0;
`;
const MiddleContainer = styled.div`
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

  &.contacts {
  }
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
const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 35px 25px;
`;
