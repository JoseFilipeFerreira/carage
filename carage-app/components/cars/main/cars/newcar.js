import styled from "styled-components";

export const NewCar = ({ car, model, km, year, icon }) => {
  return (
    <CarBox>
      <div className="inside">
        <svg>
          <use href="#Add" />
        </svg>
      </div>
      <SVGs />
    </CarBox>
  );
};

const CarBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background-color: var(--LEI2);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    
    background-color: var(--LEI2-2);

      .inside {
        background-color: #333036;

        svg {
            fill: #47434a;
        }
      }
    }

  .inside {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #28262a;
    border-radius: 15px;

  }

  svg {
    width: 60px;
    height: 60px;
    fill: #373439;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;

const SVGs = () => {
  return (
    <svg display="none">
      <symbol
        width="60"
        height="60"
        viewBox="0 0 60 60"
        id="Add"
      >
        <path
          d="M55.9089 24.5455H35.4544V4.09091C35.4544 1.83272 33.6217 0 31.3635 0H28.6364C26.3782 0 24.5455 1.83272 24.5455 4.09091V24.5455H4.09091C1.83272 24.5455 0 26.3782 0 28.6364V31.3635C0 33.6217 1.83272 35.4544 4.09091 35.4544H24.5455V55.9089C24.5455 58.1671 26.3782 59.9998 28.6364 59.9998H31.3635C33.6217 59.9998 35.4544 58.1671 35.4544 55.9089V35.4544H55.9089C58.1671 35.4544 59.9998 33.6217 59.9998 31.3635V28.6364C59.9998 26.3782 58.1671 24.5455 55.9089 24.5455V24.5455Z"
        />
      </symbol>
    </svg>
  );
};
