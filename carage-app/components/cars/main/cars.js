import styled from "styled-components";

import { Car } from "./cars/car";
import { NewCar } from "./cars/newcar";

const date = require("date-fns");

export const Cars = ({ user }) => {
  return (
    <CarsSections>
      {user.my_cars.map((x) => (
        <Car
          car={x.model.make}
          model={x.model.model}
          km={x.car.kms}
          year={date.getYear(date.parse(x.car.car_date, "yyyy-MM-dd", new Date()))}
          id={x.car.vin}
        />
      ))}
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
