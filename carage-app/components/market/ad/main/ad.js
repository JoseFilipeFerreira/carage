import styled from "styled-components";

import { Preview } from "./ad/preview";
import { Details } from "./ad/details";
import { ContactBox } from "./ad/contactbox";
import { MaintenanceHistory } from "../../../car/main/car/maintenancehistory";

export const Ad = ({ ad, car }) => {
  return (
    <AdComponent>
      <div className="top">
        <Preview ad={ad} />
        <Details ad={ad} car={car} />
      </div>
      <ContactBox email={ad.ad.owner} phone={ad.user.phone}/>
      <MaintenanceHistory car={car} />
    </AdComponent>
  );
};

const AdComponent = styled.div`
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
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
