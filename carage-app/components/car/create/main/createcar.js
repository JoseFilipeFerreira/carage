import styled from "styled-components";
import { useDispatch } from "react-redux";

const axios = require("axios");
const date = require("date-fns");
const cookie = require("cookie");

export const CreateCar = ({ owner, brands }) => {
  return (
    <CreateCarComponent>
      <Form owner={owner} brands={brands} />
      <SVGs />
    </CreateCarComponent>
  );
};

const CreateCarComponent = styled.div`
  width: 100%;
  background-color: transparent;
  margin-top: 35px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .form {
    display: grid;
    grid-template-columns: auto auto auto auto;
    width: 100%;
    column-gap: 20px;
    row-gap: 50px;
  }

  .login-button {
    align-self: center;
    width: 274px;
    grid-row-start: 4;
    grid-row-end: 5;
    margin-top: 30px;
  }

  .login-button button {
    width: 100%;
    height: 48px;
    background-color: var(--LEI3);
    border: none;
    border-radius: 8px;
    color: var(--LEI5);
  }

  .login-button button:hover {
    background-color: var(--LEI3-1);
  }

  .signin-input {
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    padding: 0 16px;
    height: 48px;
    background-color: transparent;
    color: var(--LEI5);
    border: solid 1px var(--LEI2-1);
    outline: none;
    margin-top: 33px;
  }

  .signin-input:hover {
    border: solid 1px var(--LEI3);
  }

  .signin-input:focus {
    outline: solid 2px var(--LEI3);
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form {
      display: grid;
      grid-template-columns: repeat(2, minmax(10px, 1fr));
      width: 100%;
      column-gap: 20px;
      row-gap: 50px;
    }
    .text-subhead {
      text-align: center;
    }
  }
`;

function Form({ owner, brands, models }) {
  const dispatch = useDispatch();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const createCar = async (event) => {
    event.preventDefault();

    let allFilled = true;

    for (let i of event.target) {
      if (i.localName !== "button" && i.type !== "file") {
        if (i.value === undefined || i.value === "" || i.value === "default")
          allFilled = false;
      }
    }

    if (allFilled) {
      let car_date = date.format(
        new Date(event.target.year.value, event.target.month.value - 1, 1),
        "yyyy-MM-dd",
        false
      );

      const reload = axios
        .post(
          "http://localhost:8000/car/create",
          {
            vin: event.target.vin.value,
            name: event.target.name.value,
            number_plate: event.target.number_plate.value,
            kms: parseInt(event.target.kms.value),
            model: event.target.pdf.value,
            gearbox: event.target.gearbox.value,
            car_date: car_date,
            body_type: event.target.body_type.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              jwt: cookie.parse(document.cookie).jwt,
            },
          }
        )
        .then(
          (response) => {
            return response.data;
          },
          (error) => {
            console.log(error);
          }
        );

      if (event.target.image.files) {
        console.log(event.target.image.files);
        for (let i = 0; i < event.target.image.files.length; i++) {
          let file = event.target.image.files[i];
          if (file.type.includes("image")) {
            await axios
              .post(
                "http://localhost:8000/img/create",
                {
                  car_id: event.target.vin.value,
                  filename: file.name,
                  image: await toBase64(file),
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    jwt: cookie.parse(document.cookie).jwt,
                  },
                }
              )
              .then(
                (response) => {
                  console.log(response);
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      }
      if (reload) window.location.replace("/dashboard/cars/");
    }
  };

  const getModels = async () => {
    const make = document.getElementById("brand").value;
    axios
      .post("http://localhost:8000/car/model/models", make, {
        headers: { "Content-Type": "plain/text" },
      })
      .then(
        (response) => {
          document.getElementById(
            "model"
          ).innerHTML = `<option value="default" disabled selected>Select car's model...</option>`;
          console.log(response.data);
          response.data.sort().map((x) => {
            document.getElementById(
              "model"
            ).innerHTML += `<option value="${x}">${x}</option>`;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getVariant = async () => {
    const make = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    console.log(model);
    axios
      .post(
        "http://localhost:8000/car/model/variant",
        {
          make: make,
          model: model,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(
        (response) => {
          console.log(response.data);
          document.getElementById(
            "pdf"
          ).innerHTML = `<option value="default" disabled selected>Select car's model...</option>`;
          response.data
            .sort((x, y) => x.power - y.power)
            .map((x) => {
              document.getElementById(
                "pdf"
              ).innerHTML += `<option value="${x.id}">${x.power}cv + ${x.engine_size}cc + ${x.fuel}</option>`;
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <form onSubmit={createCar}>
      <div className="form">
        <div>
          <div className="text-subhead">Brand</div>
          <select
            id="brand"
            name="brand"
            className="signin-input"
            defaultValue={"default"}
            onChange={getModels}
          >
            <option value="default" disabled>
              Select car's brand...
            </option>
            {brands.sort().map(function (brand) {
              return (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div className="text-subhead">Model</div>
          <select
            id="model"
            name="model"
            placeholder="Select car's model..."
            className="signin-input"
            defaultValue="default"
            onChange={getVariant}
          >
            <option value="default" disabled>
              Select car's model...
            </option>
          </select>
        </div>
        <div>
          <div className="text-subhead">Year</div>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Enter car's year..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Month</div>
          <input
            type="number"
            id="month"
            name="month"
            placeholder="Enter car's month..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Kilometers</div>
          <input
            type="number"
            id="kms"
            name="kms"
            placeholder="Enter car's kilometers..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Number place</div>
          <input
            type="text"
            id="number_plate"
            name="number_plate"
            placeholder="Enter car's number plate..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Vin</div>
          <input
            type="number"
            id="vin"
            name="vin"
            placeholder="Enter car's vin..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Body type</div>
          <select
            id="body_type"
            name="body_type"
            placeholder="Select car's body type..."
            className="signin-input"
            defaultValue="default"
          >
            <option value="default" disabled>
              Select car's body type...
            </option>
            <option value="Sedan">Sedan</option>
            <option value="Wagon">Wagon</option>
            <option value="Convertible">Convertible</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Minivan">Minivan</option>
          </select>
        </div>
        <div>
          <div className="text-subhead">Gearbox</div>
          <select
            id="gearbox"
            name="gearbox"
            placeholder="Select car's gearbox..."
            className="signin-input"
            defaultValue="default"
          >
            <option value="default" disabled>
              Select car's gearbox...
            </option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <div className="text-subhead">Power + Displacement + Fuel</div>
          <select
            id="pdf"
            name="pdf"
            className="signin-input"
            defaultValue="default"
          >
            <option value="default" disabled>
              Select car's power & displacement & fuel...
            </option>
          </select>
        </div>
        <div>
          <div className="text-subhead">Name</div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter car's name..."
            className="signin-input"
          ></input>
        </div>
        <div>
          <div className="text-subhead">Images</div>
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Upload car's photos..."
            className="signin-input"
            multiple
          ></input>
        </div>
      </div>
      <div>
        <div className="login-button">
          <button className="text-headline">Create Car</button>
        </div>
      </div>
    </form>
  );
}

const SVGs = () => {
  return (
    <svg display="none">
      <symbol width="80" height="57" viewBox="0 0 80 57" id="Car">
        <path
          d="M53.6228 51.9935L46.5948 47.0493C45.5611 44.465 43.8386 42.1684 41.8876 41.0424C38.7249 39.2162 36.1611 41.1546 36.1611 45.3715C36.1611 49.5884 38.7249 54.4868 41.8876 56.313C43.3863 57.1784 44.7505 57.1971 45.771 56.5295L53.6228 51.9935Z"
          fill="#23292E"
        />
        <path
          d="M79.05 36.5481C79.05 35.7864 78.9191 35.0313 78.6628 34.3142L78.6037 34.149C77.7123 31.6575 76.035 29.5238 73.8235 28.0697L65.9542 22.8963L63.4368 16.7482C61.4978 12.0127 58.0487 8.05026 53.6255 5.47622C47.808 2.0904 40.9664 0.913139 34.3516 2.15915L30.0514 2.96912L27.9388 2.63621C27.4207 2.55479 26.9219 2.65128 26.4973 2.87624C26.4563 2.89795 26.4171 2.92268 26.3773 2.9468L1.21284 17.7144C0.496957 18.104 0 18.8621 0 19.7523V22.0929C0 24.5138 1.29245 26.7501 3.38944 27.9587L10.5453 36.755C14.5107 36.0234 18.6069 36.7272 22.1007 38.7404L52.549 56.2853C52.6962 56.3703 52.8524 56.4029 53.0031 56.3944C53.0031 56.3944 53.1394 56.3788 53.1907 56.3637L54.1207 56.196C60.4551 55.0537 66.5313 52.7794 72.0582 49.4817C75.2649 47.568 77.7044 44.6026 78.9704 41.0943C78.9909 41.0509 79.0084 41.0056 79.0216 40.9574C79.0307 40.9315 79.0409 40.9061 79.05 40.8802L79.0403 40.8669C79.0463 40.8265 79.05 40.7843 79.05 40.7415V36.5481Z"
          fill="#7192C4"
        />
        <path
          d="M53.4494 49.085C52.5623 46.5706 50.8766 44.4187 48.6523 42.9562L40.6932 37.7237L38.3067 31.8953C36.2966 26.986 32.7648 22.8132 28.1571 20.1842C22.3848 16.8907 15.627 15.7557 9.09058 16.9866L4.79045 17.7966L2.67778 17.4636C1.27134 17.2417 0 18.3285 0 19.7524V22.0931C0 24.5139 1.29245 26.7502 3.38944 27.9588L10.5453 36.7551C14.5107 36.0235 18.6069 36.7274 22.1007 38.7405L52.549 56.2854C53.1002 56.6032 53.789 56.2052 53.789 55.5689V51.1862C53.789 50.4721 53.687 49.758 53.4494 49.085Z"
          fill="#304E75"
        />
        <path
          d="M47.614 51.9839C47.614 56.2008 45.0503 58.1386 41.8876 56.313C38.7249 54.4868 36.1611 49.5884 36.1611 45.3715C36.1611 41.1546 38.7249 39.2162 41.8876 41.0424C45.0503 42.868 47.614 47.767 47.614 51.9839Z"
          fill="#2E373D"
        />
        <path
          d="M44.7027 50.3031C44.7027 52.3765 43.4422 53.3294 41.8874 52.4314C40.3326 51.5334 39.0715 49.1252 39.0715 47.0523C39.0715 44.9789 40.332 44.0259 41.8874 44.9234C43.4422 45.8214 44.7027 48.2296 44.7027 50.3031Z"
          fill="#CECECE"
        />
        <path
          d="M43.4145 49.5589C43.4145 50.6837 42.7305 51.2006 41.8874 50.7139C41.0443 50.2266 40.3604 48.9202 40.3604 47.7961C40.3604 46.6713 41.0437 46.1544 41.8874 46.6417C42.7305 47.1284 43.4145 48.4348 43.4145 49.5589Z"
          fill="#627681"
        />
        <path
          d="M12.6647 32.0491C12.6647 36.266 10.1009 38.2043 6.93827 36.3781C3.77619 34.5525 1.2124 29.6542 1.2124 25.4373C1.2124 21.2204 3.77619 19.282 6.93827 21.1082C10.1015 22.9338 12.6647 27.8328 12.6647 32.0491Z"
          fill="#2E373D"
        />
        <path
          d="M9.75397 30.3687C9.75397 32.4422 8.49349 33.3951 6.93869 32.4971C5.38329 31.5997 4.1228 29.1909 4.1228 27.1174C4.1228 25.0445 5.38329 24.091 6.93869 24.9891C8.49349 25.8871 9.75397 28.2953 9.75397 30.3687Z"
          fill="#CECECE"
        />
        <path
          d="M8.46574 29.6251C8.46574 30.7493 7.78182 31.2661 6.93868 30.7794C6.09494 30.2921 5.41162 28.9858 5.41162 27.8616C5.41162 26.7368 6.09494 26.22 6.93868 26.7073C7.78182 27.194 8.46574 28.5003 8.46574 29.6251Z"
          fill="#627681"
        />
        <path
          d="M55.6099 43.5315C56.8849 45.2184 57.4916 47.597 56.9645 48.8454C56.4368 50.0932 54.9755 49.738 53.7005 48.0517C52.425 46.3655 51.8182 43.9862 52.346 42.7384C52.8731 41.49 54.3344 41.8452 55.6099 43.5315Z"
          fill="white"
        />
        <path
          d="M76.481 31.3597C77.7565 33.0466 78.3632 35.4253 77.8355 36.6737C77.3084 37.9215 75.8471 37.5663 74.5715 35.88C73.2966 34.1937 72.6898 31.8145 73.217 30.5666C73.7447 29.3182 75.206 29.6734 76.481 31.3597Z"
          fill="white"
        />
        <path
          d="M42.3438 36.755L64.6001 23.6911L60.1076 14.445C59.3188 12.822 57.3261 12.199 55.7538 13.0832L40.3186 21.7648C37.9846 23.0778 37.0793 25.9835 38.2554 28.3887L42.3438 36.755Z"
          fill="#304E75"
        />
        <path
          d="M38.7701 36.4499L35.9102 31.0974C33.2915 26.1965 29.1898 22.2498 24.1925 19.8217C19.9201 17.7459 14.8969 17.925 10.7837 20.3L38.7701 36.4499Z"
          fill="#243B58"
        />
        <path
          d="M62.8472 22.5434L59.9873 17.1914C59.1278 15.5824 58.0941 14.0885 56.9356 12.705C56.5321 12.7508 56.131 12.8708 55.7541 13.0831L51.0444 15.7319L62.8472 22.5434Z"
          fill="#59718B"
        />
        <path
          d="M14.1014 34.6562L13.3596 25.8617L21.5491 30.59L16.8558 29.3054L17.1212 34.126L21.8887 36.4498L14.1014 34.6562Z"
          fill="#23292E"
        />
        <path
          d="M25.1344 0.331123L23.9137 0.120037L23.9125 0.12064C22.0514 -0.199004 20.0834 0.111594 18.3513 1.11154L4.8032 8.93379C1.7129 10.7178 1.03501 14.8864 3.39978 17.5576L4.79054 17.7958L30.0515 2.9691C28.7271 1.50597 26.9775 0.609757 25.1344 0.331123Z"
          fill="#304E75"
        />
        <path
          d="M4.79045 17.7965C2.42568 15.1253 3.10357 10.9567 6.19327 9.17211L19.742 1.34988C23.1308 -0.606586 27.4255 0.068285 30.0514 2.9686L4.79045 17.7965Z"
          fill="#4D7EB7"
        />
      </symbol>
      <symbol width="62" height="62" viewBox="0 0 62 62" id="Ads">
        <g clipPath="url(#clip0)">
          <path
            d="M13.5793 58.5676L8.14098 55.5177C7.25809 55.0225 6.95027 53.9017 7.45644 53.0253L18.4608 33.9716L27.0687 38.7991L16.0419 57.8917C15.5445 58.7529 14.4468 59.0542 13.5793 58.5676Z"
            fill="#4D5788"
          />
          <path
            d="M26.2113 40.2927L46.2775 52.2137C47.4887 52.9332 49.0228 52.0606 49.0228 50.6522V5.01898C49.0228 3.59976 47.4676 2.72874 46.2568 3.46995L26.2113 15.7423L24.9106 27.8106L26.2113 40.2927Z"
            fill="#F1F1FA"
          />
          <path
            d="M24.9421 28.1133L26.2112 40.2928L46.2774 52.2137C47.4886 52.9333 49.0227 52.0607 49.0227 50.6522V28.1133H24.9421Z"
            fill="#DED7F9"
          />
          <path
            d="M10.8433 35.9488H3.4496C1.54443 35.9488 0 34.4044 0 32.4992V23.1218C0 21.2167 1.54443 19.6722 3.4496 19.6722H10.8433V35.9488Z"
            fill="#667197"
          />
          <path
            d="M0 28.1132V32.4992C0 34.4043 1.54491 35.9488 3.45069 35.9488H10.8432V28.1132H0Z"
            fill="#4D5788"
          />
          <path
            d="M26.2113 40.2928H15.6873C12.276 40.086 9.51074 37.3215 9.51074 33.9114V21.71C9.51074 18.2999 12.276 15.5355 15.6873 15.7425H26.2113V40.2928Z"
            fill="#E06C6C"
          />
          <path
            d="M9.51074 28.1133V33.9114C9.51074 37.3215 12.276 40.0858 15.6873 40.2928H26.2113V28.1133H9.51074Z"
            fill="#C63C50"
          />
          <path
            d="M57.0014 42.6604C56.5364 42.6604 56.0714 42.483 55.7166 42.1283L52.0512 38.4641C51.3416 37.7549 51.3416 36.6047 52.0512 35.8953C52.7607 35.1861 53.9114 35.1861 54.6209 35.8953L58.2862 39.5595C58.9958 40.2688 58.9958 41.4189 58.2862 42.1283C57.9314 42.483 57.4664 42.6604 57.0014 42.6604Z"
            fill="#EDBE2C"
          />
          <path
            d="M53.3358 20.8635C52.8707 20.8635 52.4058 20.6862 52.051 20.3315C51.3414 19.6222 51.3414 18.4721 52.051 17.7627L55.7164 14.0986C56.426 13.3892 57.5764 13.3892 58.286 14.0986C58.9955 14.8078 58.9955 15.9581 58.286 16.6673L54.6206 20.3315C54.2659 20.686 53.8008 20.8635 53.3358 20.8635Z"
            fill="#F3D652"
          />
          <path
            d="M60.183 29.9297H54.9994C53.9959 29.9297 53.1824 29.1164 53.1824 28.1133C53.1824 27.1101 53.9959 26.2969 54.9994 26.2969H60.183C61.1865 26.2969 62.0001 27.1101 62.0001 28.1133C62.0001 29.1164 61.1865 29.9297 60.183 29.9297Z"
            fill="#F3D652"
          />
          <path
            d="M54.9994 29.9297H60.183C61.1865 29.9297 62.0001 29.1164 62.0001 28.1133H53.1824C53.1824 29.1164 53.9959 29.9297 54.9994 29.9297Z"
            fill="#EDBE2C"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="62" height="62" fill="white" />
          </clipPath>
        </defs>
      </symbol>
      <symbol width="60" height="60" viewBox="0 0 60 60" id="Favourite">
        <g clipPath="url(#clip0)">
          <path
            d="M58.5845 22.0616L39.1503 20.2591L31.4305 2.33312C30.89 1.07793 29.1103 1.07793 28.5698 2.33312L20.8501 20.2593L1.4159 22.0616C0.0551208 22.1878 -0.494839 23.8803 0.531839 24.7822L15.195 37.6637L10.9038 56.7038C10.6034 58.0369 12.0431 59.0829 13.2182 58.3852L30.0002 48.4203L46.7823 58.3852C47.9573 59.0829 49.3972 58.0369 49.0967 56.7038L44.8054 37.6637L59.4686 24.7822C60.4953 23.8803 59.9453 22.1878 58.5845 22.0616Z"
            fill="#FFDC64"
          />
          <path
            d="M31.4305 2.33312C30.89 1.07793 29.1103 1.07793 28.5698 2.33312L20.8501 20.2593L1.4159 22.0616C0.0551208 22.1878 -0.494839 23.8803 0.531839 24.7822L15.195 37.6637L10.9038 56.7038C10.6034 58.0369 12.0431 59.0829 13.2182 58.3852L16.9638 56.1611C17.4823 34.8212 27.3975 19.7934 35.2476 11.1967L31.4305 2.33312Z"
            fill="#FFC850"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </symbol>
    </svg>
  );
};
