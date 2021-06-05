import styled from "styled-components";

import { Graph } from "./graphpanel/graph";

export const GraphPanel = ({}) => {
  return (
    <Panel>
      <div className="left-panel">
        <Graph title="History" />
        <div>
          <Graph title="Views" />
          <Graph title="Views" />
        </div>
      </div>
      <div className="right-panel">
        <Graph title="KMs" />
      </div>
    </Panel>
  );
};

const Panel = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 30px;

  .left-panel {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 30px;

    div {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 30px;
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
