import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
const axios = require('axios');
const cookie = require('cookie');

export const SignIn = () => {
  const showLogin = (state) => state.sign.showLogin;
  const dispatch = useDispatch();

  const value = useSelector(showLogin);

  if (value)
    return (
      <SIBox>
        <Form />
      </SIBox>
    );
  else return null;
};

function Form() {
  const showLogin = (state) => state.sign.showLogin;
  const dispatch = useDispatch();
  const loginUser = async event => {
    event.preventDefault()

    axios.post('http://localhost:8000/user/login', {
      email: event.target.email.value,
      passwd: event.target.passwd.value
    }, {headers: {"Content-Type": "application/json"}})
    .then((response) => {
      console.log(response);
      switch (response.status) {
        case 404:
          alert('Invalid credentials')
          break;
        default:
          document.cookie = cookie.serialize('jwt', response.data);
          window.location.replace("/dashboard");
          break;
      }
    }, (error) => {
      alert('Invalid credentials')
    });
  }

  return (
    <form onSubmit={loginUser}>
          <div>
            <div className="box-header">
              <div className="text-title">Log In</div>
              <svg onClick={() => dispatch({ type: "sign/hideSign" })}>
                <use href="#close" />
              </svg>
            </div>
            <div className="text-footnote">
              New to Carage?
              <span
                className="clickable"
                onClick={() => dispatch({ type: "sign/showRegister" })}
              >
                {" "}
                Create an account
              </span>
            </div>
          </div>
          <div>
            <div className="text-subhead">Email address</div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address..."
              className="signin-input"
            ></input>
          </div>
          <div>
            <div className="text-subhead">Password</div>
            <input
              type="password"
              id="passwd"
              name="passwd"
              placeholder="Enter your password..."
              className="signin-input"
            ></input>
          </div>
          <div className="login-button">
              <button className="text-button">Log In</button>
          </div>
        </form>
  )
}


const SIBox = styled.div`
  width: 496px;
  height: 382px;
  background-color: var(--LEI2);
  border-radius: 25px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: 0.2s ease-in-out showOpacity;

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
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
      margin-left: 10px;
      margin-right: 10px;
  }

  @keyframes showOpacity {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;
