import styled from "styled-components";
import { useDispatch } from "react-redux"

export const Sign = () => {
  const dispatch = useDispatch();
  return (
    <NavSign>
      <div className="signin text-button navbar-option-hover"  onClick={() => dispatch({ type: "sign/showLogin" })}>
          Sign In
      </div>
        <div className="signup text-button" onClick={() => dispatch({ type: "sign/showRegister" })}>Sign Up</div>
    </NavSign>
  );
};

const NavSign = styled.div`
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;

  .signin {
    cursor: pointer;
  }

  .signup {
    display: flex;
    background-color: var(--LEI3);
    height: 46px;
    width: 94px;
    justify-content: center;
    align-items: center;
    margin-left: 32px;
    transition: 0.2s ease;
    cursor: pointer;
  }

  .signup:hover {
    background-color: var(--LEI3-1);
    transition: 0.2s ease;
  }

  /* Portrait and Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    display: none;
}
`;
