import styled from "styled-components";

export const Preview = ({}) => {
  return (
    <PreviewComponent>
      <div className="big">
        <img src="../../../assets/noPhotoAd.png" />
      </div>
      <div className="images">
        <img src="../../../assets/noPhotoAd.png" />
        <img src="../../../assets/noPhotoAd.png" />
        <img src="../../../assets/noPhotoAd.png" />
        <img src="../../../assets/noPhotoAd.png" />
      </div>
    </PreviewComponent>
  );
};

const PreviewComponent = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .big, .big img {
    width: 100%;
    object-fit: contain;

    img {
        margin-bottom: 10px;
    }
  }

  .images {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    width: 100%;
    height: 100%;
    align-items: start;
  }

  .images img {
    width: 100%;
    object-fit: contain;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
