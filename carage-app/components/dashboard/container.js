import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
  justify-items: center;
  align-content: stretch;
  height: 100vh;
  background-color: var(--LEI2);

  @media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    grid-template-rows: 68px auto 255px;
  }
`;