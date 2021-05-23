import styled from "styled-components";

import { Stat } from "./stats/stat";

export const Stats = ({ title }) => {
  return (
    <StatsSections>
        <Stat title="Cars" value="0" icon="Car"/>
        <Stat title="Ads" value="0" icon="Ads"/>
        <Stat title="Favourite Ads" value="0" icon="Favourite"/>
        <Stat title="Shared Cars" value="0" icon="Car" />
    </StatsSections>
  );
};

const StatsSections = styled.div`
    display: flex;
    flex-direction: row;
    height: 138px;
    width: 100%;
    justify-content: space-between;


  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
