import styled from "styled-components";

import { Car } from "./cars/car";
import { NewCar } from "./cars/newcar";

export const Cars = ({}) => {
  return (
    <CarsSections>
        <Car car="Seat" model="Ibiza" year="2021" km="1000"/>
        <Car car="Toyota" model="Corola" year="1994" km="1250000" />
        <Car car="Renault" model="Laguna" year="2004" km="208000"  />
        <NewCar />
    </CarsSections>
  );
};

const CarsSections = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 310px);
    grid-template-rows: repeat(auto-fill, 135px);
    justify-content: center;
    gap: 40px;


  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
