import styled from "styled-components";

export const Ad = ({id}) => {
  return (
    <AdComponent>
        <div>coisas</div>
    </AdComponent>
  );
};

const AdComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;


  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
