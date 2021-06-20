import styled from "styled-components";
import { useDispatch } from "react-redux";

const date = require("date-fns");

export const Details = ({ ad, car }) => {
  const dispatch = useDispatch();
  console.log(ad);
  let year = date.getYear(
    date.parse(ad.car.car_date, "yyyy-MM-dd", new Date())
  );
  let month = date.format(
    date.parse(ad.car.car_date, "yyyy-MM-dd", new Date()),
    "MMM"
  );

  let appraisal = parseInt(ad.appraisal);
  let appraisal_text, appraisal_color;
  if (ad.ad.price > appraisal * 1.05 && ad.ad.price < appraisal * 1.05) {
    appraisal_color = "#6188ed";
    appraisal_text = "This car is fairly priced";
  } else if (ad.ad.price < appraisal * 1.05) {
    appraisal_color = "#6FCF97";
    appraisal_text = "This car is cheaper than normal";
  } else if (ad.ad.price > appraisal * 1.05) {
    appraisal_color = "#ff3333";
    appraisal_text = "This car is more expensive than normal";
  }

  return (
    <DetailsComponent appraisal_color={appraisal_color}>
      <div className="details">
        <div className="detail">
          <div className="text-headline">Brand</div>
          <div className="text-body">{ad.model.make}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Model</div>
          <div className="text-body">{ad.model.model}</div>
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
          <div className="text-body">{ad.car.kms}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Power</div>
          <div className="text-body">{ad.model.power}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Displacement</div>
          <div className="text-body">{ad.model.engine_size}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Gearbox</div>
          <div className="text-body">{ad.car.gearbox}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Body type</div>
          <div className="text-body">{ad.car.body_type}</div>
        </div>
      </div>
      <div className="price">{ad.ad.price} EUR</div>
      <div className="appraisal" color={appraisal_color}>
        {appraisal_text}
      </div>
      <div className="contacts text-headline">
        <div
          className="phone"
          onClick={() => dispatch({ type: "ad/showPhone" })}
        >
          Show Phone
        </div>
        <div
          className="email"
          onClick={() => dispatch({ type: "ad/showEmail" })}
        >
          Show Email
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
  .contacts {
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
  }

  .appraisal {
    text-align: right;
    color: ${(props) => props.appraisal_color};
  }

  .contacts {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;

    .email,
    .phone {
      display: flex;
      height: 45px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-top: 10%;
      cursor: pointer;
    }

    .email {
      background-color: var(--LEI4);
    }

    .phone {
      background-color: var(--LEI3);
    }

    .email:hover {
      background-color: var(--LEI4-1);
    }

    .phone:hover {
      background-color: var(--LEI3-1);
    }
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    margin: 0;
    padding: 10px;

    .maintenance,
    .sell,
    .estimate,
    .share {
      text-align: center;
    }
  }
`;
