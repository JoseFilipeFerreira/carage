import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Sign } from "./Sign";
import { Social } from "../footer/social";

export const NavbarMobile = ({ focused }) => {
  let dashboard = false;
  let cars = false;
  let market = false;
  let favorite = false;

  const showNavbar = (state) => state.dashboard.showNavbar;
  const dispatch = useDispatch();

  const value = useSelector(showNavbar);
  return (
    <NavbarMobileComponent value={value}>
      <div className="mobile-logo">
        <Link className="text-title logo" href={`/`} passHref>
          <div className="mobile-logo-text">CARAGE</div>
        </Link>
        <svg
          className="close"
          onClick={() => dispatch({ type: "dashboard/hideNavbar" })}
        >
          <use href="#close" />
        </svg>
      </div>
      <Sign />
      <div className="menu text-title">
        <div className="option">Home</div>
        <div className="option">About</div>
        <div className="option">Contact</div>
      </div>
      <Social />
      <SVGs />
    </NavbarMobileComponent>
  );
};

const NavbarMobileComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: none;
  flex-direction: column;
  padding: 30px;
  padding-right: 0;
  padding-top: 0;
  animation: 0.2s ease-in-out show;

  .logo {
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: start;
    color: var(--LEI3);
    font-size: 40px;
    height: 216px;
    padding-top: 30px;
    font-weight: bold;
  }

  .mobile-logo {
    display: none;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--LEI2);
    height: 100vh;
    width: 100vw;
    display: ${(props) => (props.value ? "flex" : "none")};

    .logo {
      display: none;
    }

    .mobile-logo {
      display: initial;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .mobile-logo-text {
      color: var(--LEI3);
      font-size: 40px;
      height: 216px;
      padding-top: 30px;
      font-weight: bold;
    }

    .close {
      margin-top: 40px;
      margin-right: 30px;
      fill: var(--LEI5);
    }

    svg {
      width: 25px;
      height: 25px;
      transition: 0.1s ease;
      cursor: pointer;
    }

    .menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      .option {
        margin-bottom: 20%;
      }
    }
  }

  @keyframes show {
    0% {
      left: 100vw;
    }
    100% {
      left: 0;
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
