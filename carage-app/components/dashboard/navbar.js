import styled from "styled-components";
import { Option } from "./navbar/option";
import Link from "next/link";

export const Navbar = ({ focused }) => {
  let dashboard = false;
  let cars = false;
  let market = false;
  let favorite = false;

  switch (focused) {
    case "dashboard":
      dashboard = true;
      break;
    case "cars":
      cars = true;
      break;
    case "market":
      market = true;
      break;
    case "favorite":
      favorite = true;
      break;
    default:
      break;
  }

  return (
    <Nav>
      <Link className="text-title logo" href={`/`} passHref>
        <div className="logo">CARAGE</div>
      </Link>
      <Link href={`/dashboard`} passHref>
        <Option title="Home" focused={dashboard} />
      </Link>
      <Link href={`/dashboard/cars`} passHref>
        <Option title="Cars" focused={cars} />
      </Link>
      <Link href={`/dashboard/market`} passHref>
        <Option title="Market" focused={market} />
      </Link>
      <Link href={`/dashboard/market/favorite`} passHref>
        <Option title="Favorite" focused={favorite} />
      </Link>
    </Nav>
  );
};

const Nav = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-right: 0;
  padding-top: 0;

  .logo {
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: start;
    color: var(--LEI3);
    font-size: 40px;
    height: 216px;
    padding-top: 30px;
    font-weight: bold;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
