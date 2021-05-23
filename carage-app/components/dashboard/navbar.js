import styled from "styled-components";
import { Option } from "./navbar/option";

export const Navbar = () => {
  return (
    <Nav>
      <a className="text-title logo" href="/">
        <div className="logo">CARAGE</div>
      </a>
      <a href="/dashboard">
        <Option title="Home" focused={true}/>
      </a>
      <a href="/dashboard/cars">
        <Option title="Cars"/>
      </a>
      <a href="/dashboard/market">
        <Option title="Market"/>
      </a>
    </Nav>
  );
};

const Nav = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-right: 0;
  padding-top: 0;

  .logo {
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: start;
    color: var(--LEI3);
    font-size: 40px;
    height: 216px;
    padding-top: 30px;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
