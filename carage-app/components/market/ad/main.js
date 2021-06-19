import styled from "styled-components";

import { TopTitle } from "./main/toptitle"
import { Top } from "../../dashboard/main/top";
import { Ad } from "./main/ad";


export const Main = ({ad, car}) => {
  return (
    <Dash>
        <Top title="Market • Ad"/>
        <TopTitle title={`${ad.model.make} ${ad.model.model}`} id={ad.ad.id} favorite={ad.favorite}/>
        <div className="divisor"></div>
        <Ad ad={ad} car={car}/>
    </Dash>
  );
};

const Dash = styled.div`
  background-color: var(--LEI1);
  height: 100%;
  width: 100%;
  border-radius: 50px 0 0 50px;
  padding: 30px;
  padding-right: 144px;
  padding-left: 144px;
  display: grid;
  grid-template-rows: min-content min-content min-content auto;
  overflow-y: scroll;

    .divisor {
        width: 100%;
        height: 2px;
        background-color: var(--LEI2);
        margin-top: 25px;
        margin-bottom: 25px;
    }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    padding: 10px;
    padding-right: 10px;
    padding-left: 10px;
    grid-template-rows: min-content min-content min-content auto;
    border-radius: 0;

    .divisor {
      margin-top: 10px;
    }
  }
`;
