import styled from "styled-components";

import { Social } from "./footer/social";

export const Footer = () => {
  return (
    <HomepageFooter>
      <div className="text-footnote direitos desktop">
        2021 © Todos os direitos reservados
      </div>
      <Social />
      <div className="text-title logo mobile">CARAGE</div>
      <div className="text-footnote made-with">
        Made with <span>❤️</span> by Project 93
      </div>
      <div className="text-footnote direitos mobile">
        2021 © Todos os direitos reservados
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

  .mobile {
    display: none;
  }

  .made-with {
    justify-self: end;
  }

  .logo {
    color: var(--LEI3);
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .mobile {
      display: initial;
    }

    .desktop {
      display: none;
    }

    div + div {
      margin-top: 28px;
    }
  }
`;
