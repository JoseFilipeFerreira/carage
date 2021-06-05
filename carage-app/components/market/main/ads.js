import styled from "styled-components";

import { Ad } from "./ads/ad";

export const Ads = ({}) => {
  return (
    <AdsSections>
      <Ad
        car="Renault"
        model="Laguna"
        year="2004"
        km="205000"
        month="August"
        power="120"
        fuel="Diesel"
        price="1500"
        image="https://auto8.imgs.sapo.pt/0493/00140493/v/0735/002273735/1370x1053/Renault-Laguna-131146849.jpg"
      />
      <Ad 
      car="Car"
      model="Model"
      year="Year"
      km="Km"
      month="Month"
      power="Power"
      fuel="Fuel"
      price="Price"
      image="../assets/noPhotoAd.png" 
      />
      <Ad 
      car="Car"
      model="Model"
      year="Year"
      km="Km"
      month="Month"
      power="Power"
      fuel="Fuel"
      price="Price"
      image="../assets/noPhotoAd.png" 
      />
    </AdsSections>
  );
};

const AdsSections = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 250px);
  justify-content: center;
  gap: 28px;

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
