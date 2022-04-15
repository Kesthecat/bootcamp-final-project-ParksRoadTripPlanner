import lost from "../assets/map-what.gif";

export const ErrorPage = () => {
  return (
    <>
      <img src={lost} alt="lost looking at map" />
      <p>
        An error has occured. Try again or contact customer services if the
        error persists.
      </p>
    </>
  );
};
