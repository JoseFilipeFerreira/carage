import styled from "styled-components";

import { Preview } from "../../market/ad/main/ad/preview";
import { Details } from "./car/details";
import { SellBox } from "./car/sellbox";
import { ShareBox } from "./car/sharebox";
import { PriceBox } from "./car/pricebox";
import { MaintenanceBox } from "./car/maintenancebox";
import { MaintenanceHistory } from "./car/maintenancehistory";

export const Car = ({ car }) => {
  return (
    <CarComponent>
      <div className="top">
        <Preview car={car} />
        <Details car={car} />
      </div>
      <MaintenanceHistory car={car} />
      <SellBox car={car} />
      <ShareBox car={car} />
      <MaintenanceBox car={car} />
      <PriceBox car={car} />
    </CarComponent>
  );
};

const CarComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .top {
    background-color: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    .top {
      background-color: transparent;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
