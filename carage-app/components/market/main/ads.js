import styled from "styled-components";

import { Ad } from "./ads/ad";

export const Ads = ({}) => {
  return (
    <AdsSections>
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
  grid-template-rows: repeat(auto-fill, 260px);
  justify-content: space-between;
  row-gap: 20px;

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
