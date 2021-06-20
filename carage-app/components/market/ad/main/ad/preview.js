import styled from "styled-components";

const axios = require("axios");

export const Preview = ({ car }) => {
  console.log(car);
  function handleInput(e) {
    document.getElementById("big").src = e.target.src;
  }

  let imgDefault;
  if (car.imgs[0]) imgDefault = `http://localhost:8000/img/${car.imgs[0].id}`;
  else imgDefault = "/assets/noPhotoAd.png";

  return (
    <PreviewComponent>
      <div className="big">
        <img id="big" src={imgDefault} />
      </div>
      <div className="images">
        {car.imgs.map((img) => (
          <img
            src={`http://localhost:8000/img/${img.id}`}
            onClick={(e) => handleInput(e, "src")}
          />
        ))}
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

  .big {
    max-width: 30vw;
    max-height: 40vh;
    margin-bottom: 10px;
    border-radius: 40px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .images {
    display: flex;
    flex-direction: row;
    gap: 10px;
    max-width: 30vw;
    height: 100px;
    overflow: scroll;
  }

  .images img {
    height: 75px;
    object-fit: contain;
    border-radius: 15px;
  }

  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    .big {
      max-width: 100%;
      max-height: 40vh;
    }

    .images {
    max-width: 100%;
  }
  }
`;
