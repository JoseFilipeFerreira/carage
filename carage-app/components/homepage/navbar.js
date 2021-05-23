import styled from "styled-components";

import { Options } from "./navbar/Options";
import { Sign } from "./navbar/Sign";

export const Navbar = () => {
  return (
    <Nav>
      <a className="text-title logo" href="/">
        <div>CARAGE</div>
      </a>
      <Options />
      <Sign />
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

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    grid-template-columns: 20% auto 20%;
    padding-left: 10px;
    padding-right: 10px;

    .logo {
      grid-column-start: 1;
      font-size: 30px;
    }
  }
`;
