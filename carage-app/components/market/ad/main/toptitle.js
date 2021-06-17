import styled from "styled-components";

const axios = require("axios");
const cookie = require("cookie");

export const TopTitle = ({ title, id }) => {
  async function starAd() {
    await axios
      .post("http://localhost:8000/ad/favorite", id, {
        headers: {
          "Content-Type": "text/plain",
          jwt: cookie.parse(document.cookie).jwt,
        },
      })
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <TopTitleComponent>
      <div>{title}</div>
      <div className="clickable" onClick={starAd}>
        <span>⭐</span>
      </div>
    </TopTitleComponent>
  );
};

export const TopTitleComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .clickable {
    cursor: pointer;
  }
`;
