import styled from "styled-components";

export const Details = ({
  brand,
  model,
  year,
  month,
  km,
  pow,
  displacement,
  gear,
  body,
  price,
}) => {
  return (
    <DetailsComponent>
      <div className="details">
        <div className="detail">
          <div className="text-headline">Brand</div>
          <div className="text-body">{brand}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Model</div>
          <div className="text-body">{model}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Year</div>
          <div className="text-body">{year}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Month</div>
          <div>{month}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Kilometers</div>
          <div className="text-body">{km}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Power</div>
          <div className="text-body">{pow}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Displacement</div>
          <div className="text-body">{displacement}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Gearbox</div>
          <div className="text-body">{gear}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Body type</div>
          <div className="text-body">{body}</div>
        </div>
      </div>
      <div className="price">{price} EUR</div>
      <div className="contacts text-headline">
        <div className="phone">Show Phone</div>
        <div className="email">Show Email</div>
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
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
