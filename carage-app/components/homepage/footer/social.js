import styled from "styled-components";

export const Social = () => {
  return (
    <FooterSocials>
        <a href="#">
          <svg>
            <use href="#facebook" />
          </svg>
        </a>
        <a href="#">
          <svg>
            <use href="#instagram" />
          </svg>
        </a>
        <a href="#">
          <svg>
            <use href="#twitter" />
          </svg>
        </a>
    </FooterSocials>
  );
};

export const FooterSocials = styled.div`
  svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    transition: 0.2s ease;
  }

  a + a {
    margin-left: 25px;
  }

  svg:hover {
    fill: var(--LEI3);
    transition: 0.2s ease;
  }
`;
