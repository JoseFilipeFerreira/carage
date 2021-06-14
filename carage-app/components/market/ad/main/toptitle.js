import styled from "styled-components";

export const TopTitle = () => {
  return <TopTitleComponent>
      <div>Titulo</div>
      <div>Star</div>
  </TopTitleComponent>;
};

export const TopTitleComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
