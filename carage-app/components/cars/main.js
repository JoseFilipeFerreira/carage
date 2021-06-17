import styled from "styled-components";
import { Top } from "../dashboard/main/top";
import { Cars } from "./main/cars";
import { SharedCars } from "./main/sharedcars";

export const Main = ({ user }) => {
  return (
    <Dash>
      <Top title="Cars" />
      <Cars user={user} />
      <div>
        <div className="text-title shared-cars">Shared Cars</div>
        <SharedCars user={user} />
      </div>
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
  grid-template-rows: 130px auto auto;

  .shared-cars {
    margin-bottom: 60px
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
