import { useRouter } from "next/router";
import styled from "styled-components";

import { Stat } from "./stats/stat";

export const Stats = ({ title, cars, shared_cars, ads, fav_ads }) => {
  return (
    <StatsSections>
        <Stat title="Cars" value={cars} icon="Car" menu="cars"/>
        <Stat title="Ads" value={ads} icon="Ads" menu="market"/>
        <Stat title="Favourite Ads" value={fav_ads} icon="Favourite" menu="market/favorite"/>
        <Stat title="Shared Cars" value={shared_cars} icon="Car" menu="cars"/>
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
