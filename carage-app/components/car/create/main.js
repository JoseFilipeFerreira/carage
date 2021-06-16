import styled from "styled-components";
import { Top } from "../../dashboard/main/top";
import { CreateCar } from "./main/createcar";

export const Main = ({user, brands}) => {
  return (
    <Dash>
        <Top title="Car • Create"/>
        <CreateCar owner={user.email} brands={brands}/>
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
  grid-template-rows: 130px auto;

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
