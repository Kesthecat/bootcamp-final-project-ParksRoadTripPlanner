import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "../Loading";
import { ReviewForm } from "./ReviewsForm";
import { PostedReviews } from "./PostedReviews";
import { ParkDetails } from "./ParkDetails";

export const Park = () => {
  const { id } = useParams();

  const [park, setPark] = useState(null);
  const [parkLoad, setParkLoad] = useState("idle"); //loaded
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

  if (parkLoad === "idle") return <Loading />;

  return (
    <>
      <Styledh1>{park.name}</Styledh1>
      <InfoContainer>
        <Intro>{park.introduction}</Intro>
        <ParkDetails park={park} />
      </InfoContainer>
      <ReviewsContainer>
        <h3 style={{ borderBottom: "1px solid var(--color-main)" }}>Reviews</h3>
        <ReviewForm parkId={id} setNewReview={setNewReview} />
        <PostedReviews parkId={id} newReview={newReview} />
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
const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 35px 25px;
`;
