import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Top } from "./main/top";
import { Stats } from "./main/stats";
import { GraphPanel } from "./main/graphpanel";

export const Main = ({ user }) => {
  console.log(user);

  const showNavbar = (state) => state.dashboard.showNavbar;
  const dispatch = useDispatch();

  const value = useSelector(showNavbar);
  if (!value)
    return (
      <Dash>
        <Top title="Dashboard" />
        <Stats
          cars={user.my_cars.length}
          shared_cars={user.shared_cars.length}
          ads={user.ads.length}
          fav_ads={user.fav_ads.length}
        />
        <div className="divisor"></div>
        <GraphPanel user={user}/>
      </Dash>
    );
  else return null;
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
  grid-template-rows: 130px 138px auto auto;
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
    grid-template-rows: min-content min-content auto;
    border-radius: 0;
    
    .divisor {
    }

  }
`;
