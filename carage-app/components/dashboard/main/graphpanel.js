import styled from "styled-components";

import { Graph } from "./graphpanel/graph";

const date_fns = require("date-fns");

export const GraphPanel = ({ user }) => {
  let all_dates = user.my_cars.map(function (car) {
    return car.maintenances
      .sort((x, y) => new Date(x.date) - new Date(y.date))
      .map(function (main) {
        return { date: main.date, kms: main.kms, price: main.price };
      });
  });

  let cars = [];
  for (let car of all_dates) {
    let history = {};
    for (let date of car) {
      let index = date_fns.format(
        date_fns.parse(date.date, "yyyy-MM-dd", new Date()),
        "yyyy-MMM"
      );
      if (history[index]) {
        history[index].kms =
          date.kms > history[index].kms ? date.kms : history[index].kms;
        history[index].price += date.price;
      } else {
        history[index] = {};
        history[index].kms = date.kms;
        history[index].price = date.price;
      }
    }
    cars.push(history);
  }

  let carsObject = {};
  for (let index in cars)
    carsObject[`${user.my_cars[index].car.name}`] = cars[index];

  for (let car in carsObject) {
    let value = carsObject[car];
    carsObject[car] = 0;
    if (Object.keys(value).length > 0) {
      for (let date in value) {
        carsObject[car] += value[date].price;
      }
    }
  }

  let resume = {};

  for (let car of cars) {
    for (let date in car) {
      let value = car[date];
      if (!resume[date]) resume[date] = value;
      else {
        resume[date].kms += value.kms;
        resume[date].price += value.price;
      }
    }
  }

  const expMonth = {
    labels: Object.keys(resume),
    datasets: [
      {
        label: "Months",
        data: Object.keys(resume).map((x) => resume[x].price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const kmMonth = {
    labels: Object.keys(resume),
    datasets: [
      {
        label: "Months",
        data: Object.keys(resume).map((x) => resume[x].kms),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let randomColors = [...Array(user.my_cars.length)].map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const expCar = {
    labels: Object.keys(carsObject),
    datasets: [
      {
        data: Object.keys(carsObject).map((x) => carsObject[x]),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
      },
    ],
  };

  return (
    <Panel>
      {/* <Graph title="Recent Maintenances" type="bar" data={resume}/> */}
      <Graph title="Expenses/Car" type="doughnut" data={expCar} />
      <div className="right">
        <Graph title="Expenses/Month" type="bar" data={expMonth} />
        <Graph title="Km/Month" type="line" data={kmMonth} />
      </div>
    </Panel>
  );
};

const Panel = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-gap: 30px;

  .right {
    display: grid;
    grid-template-rows: repeat(2, minmax(100px, 1fr));
    grid-gap: 30px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px){
    display: flex;
    flex-direction: column;

    .right {
      margin-bottom: 30px;
    }
  }
`;
