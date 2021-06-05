import styled from "styled-components";

export const Graph = ({ title }) => {
  return (
    <GraphBox>
        <div className="text-headline">{title}</div>
    </GraphBox>
  );
};

const GraphBox = styled.div`
    height: 100%;
    width: 100%;
    background-color: var(--LEI2);
    padding: 20px;
    border-radius: 20px;

    .text-headline {
        font-size: 16px;
    }

    

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
