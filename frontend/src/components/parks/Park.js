import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { GiHeartPlus } from "react-icons/gi";
import { ReviewForm } from "../ReviewsForm";
import { PostedReviews } from "../PostedReviews";

export const Park = () => {
  const { id } = useParams();
  const [park, setPark] = useState(null);
  const [parkLoad, setParkLoad] = useState("idle"); //loaded

  let history = useHistory();

  useEffect(() => {
    fetch(`/parks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setPark(data.data);
        setParkLoad("loaded");
      })
      .catch((error) => {
        // console.log(error.message);
        history.push("/error");
      });
  }, []);

  // console.log(park);

  if (parkLoad === "idle") return <div>Loading...</div>;

  return (
    <>
      <h1>{park.name}</h1>
      <InfoContainer>
        <Intro>{park.introduction}</Intro>
        <MiddleContainer>
          <InnerContainer>
            <p>{park.website}</p>
          </InnerContainer>
          <InnerContainer>
            <p>
              Camping: <span>{park.camping.toUpperCase()}</span>
            </p>
            <p>
              Swimming: <span>{park.swimming.toUpperCase()}</span>
            </p>
            <p>
              Hiking: <span>{park.hiking.toUpperCase()}</span>
            </p>
            <p>
              Pet Friendly: <span>{park.dog.toUpperCase()}</span>
            </p>
          </InnerContainer>
          <BtnContainer>
            Add to favorite{" "}
            <StyledBtn>
              <GiHeartPlus />
            </StyledBtn>
          </BtnContainer>
        </MiddleContainer>
      </InfoContainer>
      <ReviewsContainer>
        <ReviewForm parkId={id} />
        <PostedReviews parkId={id} />
      </ReviewsContainer>
    </>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
`;
const Intro = styled.div`
  border: 2px dotted orange;
  margin: 25px 0;
  /* need to set
  width
  height */
`;
const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
`;
const InnerContainer = styled.div`
  border: 2px solid blue;
  /* need to set
  width
  height */
`;
const BtnContainer = styled.div`
  border: 2px solid skyblue;
  /* need to set
  width
  height */
`;
const StyledBtn = styled.button``;
const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid brown;
`;
