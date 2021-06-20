import styled from "styled-components";

import { Ad } from "./ads/ad";

const date = require('date-fns')

export const Ads = ({ ads }) => {

  function getImageDefault(car) {
    console.log(car)
    if (car.imgs[0]) return `http://localhost:8000/img/${car.imgs[0].id}`;
    else return "/assets/noPhotoAd.png";
  }

  return (
    <AdsSections>
      {ads[1].map(function (x) {
        let year = date.getYear(
          date.parse(x.car.car_date, "yyyy-MM-dd", new Date())
        );
        let month = date.format(
          date.parse(x.car.car_date, "yyyy-MM-dd", new Date()), 'MMM'
        );
        return (
          <Ad
            id={x.ad.id}
            car={x.model.make}
            model={x.model.model}
            year={year}
            km={x.car.kms}
            month={month}
            power={x.model.power}
            fuel={x.model.fuel}
            price={x.ad.price}
            image={getImageDefault(x)}
            key={x.ad.id}
          />
        );
      })}
    </AdsSections>
  );
};

const AdsSections = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 260px);
  justify-content: center;
  gap: 20px;

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    margin-bottom: 20px;
  
  }
`;
