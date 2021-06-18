import styled from "styled-components";
import { useDispatch } from "react-redux";

const date = require("date-fns");
const axios = require("axios");
const cookie = require("cookie");

export const Details = ({ car }) => {
  const dispatch = useDispatch();

  let year = date.getYear(
    date.parse(car.car.car_date, "yyyy-MM-dd", new Date())
  );
  let month = date.format(
    date.parse(car.car.car_date, "yyyy-MM-dd", new Date()), 'MMM'
  );
  return (
    <DetailsComponent>
      <div className="details">
        <div className="detail">
          <div className="text-headline">Brand</div>
          <div className="text-body">{car.model.make}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Model</div>
          <div className="text-body">{car.model.model}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Year</div>
          <div className="text-body">{year}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Month</div>
          <div className="text-body">{month}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Kilometers</div>
          <div className="text-body">{car.car.kms}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Power</div>
          <div className="text-body">{car.model.power}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Displacement</div>
          <div className="text-body">{car.model.engine_size}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Gearbox</div>
          <div className="text-body">{car.car.gearbox}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Body type</div>
          <div className="text-body">{car.car.body_type}</div>
        </div>
      </div>
      <div className="price">{null} EUR</div>
      <div className="buttons text-headline">
        <div className="buttons-top">
          <div
            className="maintenance"
            onClick={() => dispatch({ type: "car/showMaintenance" })}
          >
            Add Maintenance
          </div>
          <div
            className="sell"
            onClick={() => dispatch({ type: "car/showSell" })}
          >
            Sell Car
          </div>
        </div>
        <div className="buttons-top">
          <div className="estimate">Estimate Price</div>
          <div
            className="share"
            onClick={() => dispatch({ type: "car/showShare" })}
          >
            Share Car
          </div>
        </div>
      </div>
    </DetailsComponent>
  );
};

const DetailsComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10%;

  .details,
  .price,
  .buttons {
    width: 100%;
  }

  .detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .price {
    text-align: right;
    font-size: 50px;
    color: var(--LEI3);
    display: none;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;

    .buttons-top {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-bottom: 3%;

      div + div {
        margin-left: 20px;
      }
    }

    .maintenance,
    .sell,
    .estimate,
    .share {
      display: flex;
      width: 100%;
      height: 45px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
    }

    .maintenance {
      background-color: var(--LEI4);
    }

    .sell {
      background-color: var(--LEI3);
    }

    .maintenance:hover {
      background-color: var(--LEI4-1);
    }

    .sell:hover {
      background-color: var(--LEI3-1);
    }

    .estimate {
      background-color: var(--LEI6);
    }

    .estimate:hover {
      background-color: var(--LEI6-1);
    }

    .share {
      background-color: var(--LEI7);
    }

    .share:hover {
      background-color: var(--LEI7-1);
    }
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
