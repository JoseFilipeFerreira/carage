import styled from "styled-components";

import { Social } from "./footer/social"; 

export const Footer = () => {
  return (
    <HomepageFooter>
      <div className="text-footnote direitos">
          2021 © Todos os direitos reservados
        </div>
        <Social/>
        <div className="text-footnote made-with">
          Made with <span>❤️</span> by Group 7
        </div>
    </HomepageFooter>
  );
};

export const HomepageFooter = styled.div`
  justify-self: stretch;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #151417;
  border: 1px solid #151417;
  color: #f0f0f1;
  display: grid;
  grid-template-columns: 20% 15% auto 15% 20%;
  justify-items: center;
  align-items: center;

  .direitos {
    justify-self: start;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .made-with {
    justify-self: end;
  }

  .social svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    transition: 0.2s ease;
  }

  .social a + a {
    margin-left: 25px;
  }

  .social svg:hover {
    fill: var(--LEI3);
    transition: 0.2s ease;
  }
`;
