import styled from "styled-components";
import { Bar, Line, Doughnut } from "react-chartjs-2";

export const Graph = ({ title, type, data }) => {
  
  return (
    <GraphBox>
      <div className="text-headline">{title}</div>
      <div className="center">
      {[type].map(function (x) {
        switch (type) {
          case 'bar':
            return <Bar key={type} data={data} options={{
              responsive: true
            }}/>;
          case 'doughnut':
            return <Doughnut key={type} data={data} options={{
              responsive: true
            }}/>;
          case 'line':
            return <Line key={type} data={data} options={{
              responsive: true
            }}/>;
          default:
            break;
        }
      })}

      </div>
    </GraphBox>
  );
};

const GraphBox = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--LEI2);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  .text-headline {
    font-size: 16px;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
