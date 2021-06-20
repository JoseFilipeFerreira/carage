import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Options } from "./navbar/Options";
import { Sign } from "./navbar/Sign";
import { NavbarMobile } from "./navbar/navbarmobile";

export const Navbar = () => {
  const dispatch = useDispatch();
  dispatch({ type: "sign/hideSign" });

  return (
    <Nav>
      <a className="text-title logo" href="/">
        CARAGE
      </a>
      <svg
        className="mobile"
        onClick={() => dispatch({ type: "dashboard/showNavbar" })}
      >
        <use href="#menu" />
      </svg>
      <Options />
      <Sign />
      <NavbarMobile />

      <svg display="none">
        <symbol width="24" height="24" viewBox="0 0 24 24" id="menu">
          <path d="M 21.675781 1.160156 L 2.324219 1.160156 C 1.046875 1.160156 0 2.207031 0 3.484375 C 0 4.761719 1.046875 5.804688 2.324219 5.804688 L 21.675781 5.804688 C 22.953125 5.804688 24 4.761719 24 3.484375 C 24 2.207031 22.953125 1.160156 21.675781 1.160156 Z M 21.675781 1.160156 " />
          <path d="M 21.675781 9.675781 L 2.324219 9.675781 C 1.046875 9.675781 0 10.722656 0 12 C 0 13.277344 1.046875 14.324219 2.324219 14.324219 L 21.675781 14.324219 C 22.953125 14.324219 24 13.277344 24 12 C 24 10.722656 22.953125 9.675781 21.675781 9.675781 Z M 21.675781 9.675781 " />
          <path d="M 21.675781 18.195312 L 2.324219 18.195312 C 1.046875 18.195312 0 19.238281 0 20.515625 C 0 21.792969 1.046875 22.839844 2.324219 22.839844 L 21.675781 22.839844 C 22.953125 22.839844 24 21.792969 24 20.515625 C 24 19.238281 22.953125 18.195312 21.675781 18.195312 Z M 21.675781 18.195312 " />
        </symbol>
      </svg>
    </Nav>
  );
};

const Nav = styled.div`
  justify-self: stretch;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #151417;
  border: 1px solid #151417;
  color: #f0f0f1;
  display: grid;
  grid-template-columns: 20% 12% auto 12% 20%;
  justify-items: center;
  align-items: center;

  .mobile {
    display: none;
  }

  .logo {
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: start;
    color: var(--LEI3);
  }

  .navbar-option-hover {
    transition: 0.2s ease;
  }

  .navbar-option-hover:hover {
    color: var(--LEI3);
    transition: 0.2s ease;
  }

  svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    margin-right: 10px;
    fill: ${(props) => (props.focused ? "var(--LEI3)" : "var(--LEI5)")};
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    grid-template-columns: 20% auto 20%;
    padding-left: 10px;
    padding-right: 10px;

    .logo {
      grid-column-start: 1;
      font-size: 30px;
    }

    .mobile {
      display: initial;
    }
  }
`;
