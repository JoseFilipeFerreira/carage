import styled from "styled-components";
import { useDispatch } from "react-redux";

const date = require("date-fns");
const axios = require("axios");
const cookie = require("cookie");

export const MaintenanceHistory = ({ car }) => {
  const dispatch = useDispatch();

  let year = date.getYear(
    date.parse(car.car.car_date, "yyyy-MM-dd", new Date())
  );
  let month = date.getMonth(
    date.parse(car.car.car_date, "yyyy-MM-dd", new Date())
  );
  return (
    <MaintenanceHistoryComponent>
      <div className="text-title">Maintenance History</div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {car.maintenances.map(function (x) {
            return (
              <tr className="hover">
                <td className="center">{x.date}</td>
                <td className="center">{x.type_}</td>
                <td className="desc">{x.description}</td>
                <td className="center">{x.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MaintenanceHistoryComponent>
  );
};

const MaintenanceHistoryComponent = styled.div`
  margin-top: 50px;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin-bottom: 20px;

  .text-title {
    margin-bottom: 30px;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;

    th {
      width: min-content;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 20px;
    }

    tr {
      border-bottom: 2px solid var(--LEI2);
    }

    td {
      padding: 10px;
    }

    .hover:hover {
      background-color: var(--LEI2-2);
    }

    .center {
      text-align: center;
    }

    .desc {
      text-align: left;
    }
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
