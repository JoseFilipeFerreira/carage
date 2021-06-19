import styled from "styled-components";

import { Stat } from "./stats/stat";

export const Stats = ({ title, cars, shared_cars, ads, fav_ads }) => {
  return (
    <StatsSections>
        <Stat title="Cars" value={cars} icon="Car"/>
        <Stat title="Ads" value={ads} icon="Ads"/>
        <Stat title="Favourite Ads" value={fav_ads} icon="Favourite"/>
        <Stat title="Shared Cars" value={shared_cars} icon="Car" />
    </StatsSections>
  );
};

const StatsSections = styled.div`
    display: flex;
    flex-direction: row;
    height: 138px;
    width: 100%;
    justify-content: space-between;


  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  
    flex-direction: column;
    width: 100%;
    height: 100%;

  }
`;
