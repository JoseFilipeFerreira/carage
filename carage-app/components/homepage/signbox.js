import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { SignIn } from "./signbox/signin";
import { SignUp } from "./signbox/signup";

export const SignBox = () => {
  const showLogin = (state) => state.sign;
  const dispatch = useDispatch();

  const sign = useSelector(showLogin);
  const login = sign.showLogin;
  const register = sign.showRegister;

  if (login || register)
    return (
      <SBox id="sbox">
        <SignIn />
        <SignUp />
      </SBox>
    );
  else return null;
};

const SBox = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: var(--LEI1-1);

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
