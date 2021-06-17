import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
const axios = require("axios");
const cookie = require("cookie");
const date = require("date-fns");

export const MaintenanceBox = ({ car }) => {
  const showBox = (state) => state.car.showMaintenance;
  const dispatch = useDispatch();

  const value = useSelector(showBox);

  if (value)
    return (
      <Background>
        <MaintenanceBoxContainer>
          <Form car={car} />
        </MaintenanceBoxContainer>
        <SVGs />
      </Background>
    );
  else return null;
};

function Form({ car }) {
  const dispatch = useDispatch();
  const createMaintenance = async (event) => {
    event.preventDefault();
    let kms = parseInt(event.target.kms.value);
    console.log(kms)
    if (!kms) kms = 0;

    await axios
      .post(
        "http://localhost:8000/car/maintenance/create",
        {
          car: car.car.vin,
          owner: "",
          type_: event.target.type.value,
          price: parseInt(event.target.price.value) ?? 0,
          kms: kms,
          date: event.target.date.value,
          description: event.target.description.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            jwt: cookie.parse(document.cookie).jwt,
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <form onSubmit={createMaintenance}>
      <div>
        <div className="box-header">
          <div className="text-title">Add Maintenance</div>
          <svg onClick={() => dispatch({ type: "car/hideMaintenance" })}>
            <use href="#close" />
          </svg>
        </div>
      </div>
      <div className="content">
        <div className="text-subhead">Type</div>
        <select
          type="text"
          id="type"
          name="type"
          className="signin-input"
          defaultValue="default"
        >
          <option value="default" disabled>
            Enter maintenance's type...
          </option>
          <option value="Fuel">Fuel</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Preventive">Preventive</option>
          <option value="Tires">Tires</option>
          <option value="BreakDown">BreakDown</option>
        </select>
      </div>
      <div className="content">
        <div className="text-subhead">Price</div>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Enter maintenance's price..."
          className="signin-input"
        ></input>
      </div>
      <div className="content">
        <div className="text-subhead">Kilometers</div>
        <input
          type="text"
          id="kms"
          name="kms"
          placeholder="Enter maintenance's kilometers..."
          className="signin-input"
        ></input>
      </div>
      <div className="content">
        <div className="text-subhead">Description</div>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Enter maintenance's description..."
          className="signin-input"
        ></textarea>
      </div>
      <div className="content">
        <div className="text-subhead">Date</div>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Enter maintenance's date..."
          className="signin-input"
        ></input>
      </div>

      <div className="login-button">
        <button className="text-button">Add Maintenance</button>
      </div>
    </form>
  );
}

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--LEI1-1);
`;

const MaintenanceBoxContainer = styled.div`
  width: 496px;
  max-height: 100%;
  background-color: var(--LEI2);
  border-radius: 25px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: 0.2s ease-in-out show;
  position: fixed;

  .content {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    transition: 0.1s ease;
    cursor: pointer;
  }

  svg:hover {
    fill: var(--LEI3);
    transition: 0.2s ease;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    height: 100%;
    width: 100%;
  }

  .box-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .text-title {
    margin-bottom: 10px;
  }

  .login-button {
    align-self: center;
    width: 100%;
  }

  .login-button button {
    width: 100%;
    height: 48px;
    background-color: var(--LEI3);
    border: none;
    border-radius: 8px;
    color: var(--LEI5);
  }

  .login-button button:hover {
    background-color: var(--LEI3-1);
  }

  .signin-input {
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    padding: 0 16px;
    height: 48px;
    background-color: transparent;
    color: var(--LEI5);
    border: solid 1px var(--LEI2-1);
    outline: none;
    margin-top: 10px;
  }

  .signin-input:hover {
    border: solid 1px var(--LEI3);
  }

  .signin-input:focus {
    outline: solid 2px var(--LEI3);
  }

  .clickable {
    cursor: pointer;
    color: var(--LEI3);
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }

  @keyframes show {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const SVGs = () => {
  return (
    <svg display="none">
      <symbol width="25" height="25" viewBox="0 0 25 25" id="close">
        <path d="M 16.628906 12.503906 L 24.367188 4.769531 C 25.21875 3.914062 25.21875 2.527344 24.367188 1.675781 L 23.335938 0.644531 C 22.480469 -0.210938 21.09375 -0.210938 20.238281 0.644531 L 12.503906 8.378906 L 4.769531 0.640625 C 3.914062 -0.214844 2.527344 -0.214844 1.675781 0.640625 L 0.640625 1.671875 C -0.214844 2.527344 -0.214844 3.914062 0.640625 4.765625 L 8.378906 12.503906 L 0.644531 20.238281 C -0.210938 21.09375 -0.210938 22.480469 0.644531 23.335938 L 1.675781 24.367188 C 2.527344 25.21875 3.914062 25.21875 4.769531 24.367188 L 12.503906 16.628906 L 20.238281 24.367188 C 21.09375 25.21875 22.480469 25.21875 23.335938 24.367188 L 24.367188 23.335938 C 25.21875 22.480469 25.21875 21.09375 24.367188 20.238281 Z M 16.628906 12.503906 " />
      </symbol>
    </svg>
  );
};
