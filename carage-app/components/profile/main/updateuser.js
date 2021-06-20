import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'

const axios = require("axios");
const date = require("date-fns");
const cookie = require("cookie");

export const UpdateUser = ({ user }) => {
  
  return (
    <UpdateUserComponent>
      <Form user={user} />
      <SVGs />
    </UpdateUserComponent>
  );
};

const UpdateUserComponent = styled.div`
  width: 100%;
  background-color: transparent;
  margin-top: 35px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .form {
    display: grid;
    grid-template-columns: auto auto auto;
    width: 100%;
    column-gap: 20px;
    row-gap: 50px;
  }

  .login-button {
    align-self: center;
    width: 274px;
    grid-row-start: 4;
    grid-row-end: 5;
    margin-top: 30px;
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
    margin-top: 33px;
  }

  .signin-input:hover {
    border: solid 1px var(--LEI3);
  }

  .signin-input:focus {
    outline: solid 2px var(--LEI3);
  }

  .text-subhead {
    text-align: center;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px){
    .form {
    display: flex;
    flex-direction: column;
    padding: 25px;
    width: 100%;
    column-gap: 20px;
    row-gap: 50px;
  }
  }
`;

function Form({ user }) {
  const dispatch = useDispatch();

  const updateUser = async (event) => {
    event.preventDefault();

    await axios
      .post(
        "http://localhost:8000/user/update",
        {
          email: user.email,
          name: event.target.name.value || null,
          passwd: event.target.passwd.value || null,
          phone: parseInt(event.target.phone.value) || null
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
          console.log(response.data);
          user.name = response.data.name;
          user.phone = response.data.phone;
          window.location.replace("/dashboard/profile/");
        },
        (error) => {
          window.location.replace("/dashboard/profile/");
          console.log(error);
        }
      );
  };

  return (
    <form onSubmit={updateUser}>
      <div className="form">
        <div>
          <div className="text-subhead">Name</div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter new name..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Password</div>
          <input
            type="text"
            id="passwd"
            name="passwd"
            placeholder="Enter new password..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Phone</div>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter new phone..."
            className="signin-input"
          ></input>
        </div>
      </div>
      <div>
        <div className="login-button">
          <button className="text-headline">Update User</button>
        </div>
      </div>
    </form>
  );
}

const SVGs = () => {
  return <svg display="none"></svg>;
};
