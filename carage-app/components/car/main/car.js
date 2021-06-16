import styled from "styled-components";

import { Preview } from "../../market/ad/main/ad/preview";
import { Details } from "./car/details";
import { SellBox } from "./car/sellbox";
import { ShareBox } from "./car/sharebox";

export const Car = ({ car }) => {
  return (
    <CarComponent>
      <Preview car={car}/>
      <Details car={car}/>
      <SellBox car={car}/>
      <ShareBox car={car}/>
    </CarComponent>
  );
};

const CarComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
