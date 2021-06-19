import styled from "styled-components";

const axios = require("axios");
const cookie = require("cookie");

export const TopTitle = ({ title, id, favorite }) => {
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

  async function unstarAd() {
    await axios
      .delete(`http://localhost:8000/ad/favorite/${id}`, {
        headers: {
          "Content-Type": "application/json",
          jwt: cookie.parse(document.cookie).jwt,
        }
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
      <SVGs />
      <div>{title}</div>
      {[""].map(function () {
        if (favorite)
          return (
            <div className="clickable" onClick={unstarAd} key={title}>
              <svg className="star">
                <use href="#star" />
              </svg>
            </div>
          );
        else
          return (
            <div className="clickable" onClick={starAd} key={title}>
              <svg>
                <use href="#unstar" />
              </svg>
            </div>
          );
      })}
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

  svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    transition: 0.2s ease;
    margin-right: 10px;
    fill: ${(props) => (props.focused ? "var(--LEI3)" : "var(--LEI5)")};
  }

  .star {
    fill: #fcca03;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    margin-top: 20px;
  }
`;

const SVGs = () => {
  return (
    <svg display="none">
      <symbol width="25" height="25" viewBox="0 0 25 25" id="star">
        <path d="M 24.925781 9.585938 C 24.761719 9.082031 24.3125 8.71875 23.78125 8.671875 L 16.570312 8.019531 L 13.714844 1.34375 C 13.507812 0.851562 13.027344 0.535156 12.496094 0.535156 C 11.964844 0.535156 11.484375 0.851562 11.273438 1.34375 L 8.421875 8.019531 L 1.207031 8.671875 C 0.675781 8.722656 0.230469 9.082031 0.0664062 9.585938 C -0.0976562 10.09375 0.0546875 10.648438 0.453125 10.996094 L 5.90625 15.777344 L 4.296875 22.859375 C 4.179688 23.382812 4.382812 23.917969 4.816406 24.230469 C 5.046875 24.398438 5.320312 24.484375 5.59375 24.484375 C 5.828125 24.484375 6.0625 24.421875 6.273438 24.296875 L 12.496094 20.578125 L 18.714844 24.296875 C 19.167969 24.570312 19.742188 24.542969 20.175781 24.230469 C 20.605469 23.917969 20.808594 23.378906 20.691406 22.859375 L 19.082031 15.777344 L 24.535156 10.996094 C 24.9375 10.648438 25.089844 10.09375 24.925781 9.585938 Z M 24.925781 9.585938 " />
      </symbol>
      <symbol width="25" height="25" viewBox="0 0 25 25" id="unstar">
        <path d="M 5.59375 24.484375 C 5.320312 24.484375 5.046875 24.398438 4.816406 24.230469 C 4.382812 23.917969 4.179688 23.378906 4.300781 22.859375 L 5.90625 15.777344 L 0.453125 10.996094 C 0.0546875 10.648438 -0.0976562 10.09375 0.0664062 9.585938 C 0.230469 9.082031 0.675781 8.722656 1.207031 8.671875 L 8.421875 8.019531 L 11.273438 1.34375 C 11.484375 0.851562 11.964844 0.535156 12.496094 0.535156 C 13.027344 0.535156 13.507812 0.851562 13.714844 1.34375 L 16.570312 8.019531 L 23.78125 8.671875 C 24.3125 8.71875 24.761719 9.082031 24.925781 9.585938 C 25.089844 10.09375 24.9375 10.648438 24.535156 10.996094 L 19.085938 15.777344 L 20.691406 22.859375 C 20.808594 23.378906 20.609375 23.917969 20.175781 24.230469 C 19.746094 24.542969 19.167969 24.566406 18.714844 24.292969 L 12.496094 20.578125 L 6.273438 24.296875 C 6.0625 24.421875 5.828125 24.484375 5.59375 24.484375 Z M 12.496094 18.976562 C 12.730469 18.976562 12.964844 19.039062 13.175781 19.164062 L 19.046875 22.675781 L 17.53125 15.992188 C 17.421875 15.515625 17.582031 15.019531 17.949219 14.695312 L 23.097656 10.183594 L 16.289062 9.5625 C 15.796875 9.519531 15.375 9.210938 15.183594 8.757812 L 12.496094 2.460938 L 9.804688 8.757812 C 9.613281 9.207031 9.191406 9.515625 8.703125 9.5625 L 1.890625 10.179688 L 7.039062 14.695312 C 7.40625 15.015625 7.570312 15.511719 7.460938 15.988281 L 5.941406 22.675781 L 11.8125 19.164062 C 12.023438 19.039062 12.257812 18.976562 12.496094 18.976562 Z M 8.367188 8.148438 Z M 16.621094 8.144531 Z M 16.621094 8.144531 " />
      </symbol>
    </svg>
  );
};
