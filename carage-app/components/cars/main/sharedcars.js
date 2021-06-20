import styled from "styled-components";

import { Car } from "./cars/car";
import { NewCar } from "./cars/newcar";

const date = require("date-fns");

export const SharedCars = ({ user }) => {
  return (
    <SharedCarsSections>
      {user.shared_cars.map((x) => (
        <Car
          car={x.model.make}
          model={x.model.model}
          km={x.car.kms}
          year={date.getYear(date.parse(x.car.car_date, "yyyy-MM-dd", new Date()))}
          id={x.car.vin}
          key={x.car.vin}
        />
      ))}
    </SharedCarsSections>
  );
};

const SharedCarsSections = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 310px);
  grid-template-rows: repeat(auto-fill, 135px);
  justify-content: center;
  gap: 30px;

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
