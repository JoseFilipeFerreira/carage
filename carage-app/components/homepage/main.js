import styled from "styled-components";

export const Main = () => {
  return (
    <MainContent>
      <img src="assets/homepage_image.svg" height="50%"></img>
      <div className="homepage-text">
        <div className="text-title">LoremWhat is Lorem Ipsum?</div>
        <div className="text-body homepage-body">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
    </MainContent>
  );
};

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  padding-right: 20%;
  padding-left: 20%;

  .homepage-text {
    margin-left: 5%;
    text-align: center;
  }

  .homepage-body {
    margin-top: 5%;
  }
`;
