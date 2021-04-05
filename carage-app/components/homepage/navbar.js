import styled from "styled-components";

import { Options } from "./navbar/Options"; 
import { Sign } from "./navbar/Sign"; 

export const Navbar = () => {
  return (
    <Nav>
      <div className="text-title logo">CARAGE</div>
      <Options/>
      <Sign/>
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
`;
