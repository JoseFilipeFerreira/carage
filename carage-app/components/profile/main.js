import styled from "styled-components";
import { Top } from "../dashboard/main/top";
import { UpdateUser } from "./main/updateuser";
import { Profile } from "./main/profile";

export const Main = ({ user }) => {
  return (
    <Dash>
      <Top title="Profile" />
      <Profile user={user} />
      <UpdateUser user={user} />
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
  grid-template-rows: 130px min-content auto;

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {

    padding-right: 0;
    padding-left: 0;
    padding: 0;
    grid-template-rows: 20px min-content auto;
    
  }
`;
