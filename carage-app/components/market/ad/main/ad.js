import styled from "styled-components";

import { Preview } from "./ad/preview"
import { Details } from "./ad/details"
import { ContactBox } from "./ad/contactbox"

export const Ad = ({ad}) => {
  return (
    <AdComponent>
        <Preview ad={ad}/>
        <Details ad={ad}/>
        <ContactBox email={ad.ad.ad.owner}/>
    </AdComponent>
  );
};

const AdComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
