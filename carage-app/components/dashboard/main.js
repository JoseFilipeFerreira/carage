import styled from "styled-components";
import { Top } from "./main/top";
import { Stats } from "./main/stats";

export const Main = () => {
  return (
    <Dash>
        <Top title="Dashboard"/>
        <Stats/>
        <div className="divisor"></div>
    </Dash>
  );
};

const Dash = styled.div`
  background-color: var(--LEI1);
  height: 100%;
  width: 100%;
  border-radius: 50px 0 0 50px;
  padding-right: 144px;
  padding-left: 144px;

    .divisor {
        width: 100%;
        height: 2px;
        background-color: var(--LEI2);
        margin-top: 40px;
        margin-bottom: 40px;
    }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
