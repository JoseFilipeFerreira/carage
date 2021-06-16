import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
const cookie = require('cookie');

export const Top = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <TopSection>
      <div className="text-title">{title}</div>
      <div className="top-options">
        <div className="text-subhead option">Home</div>
        <div className="text-subhead option">Help</div>
        <div
          className="text-subhead option"
          onClick={() => {
            dispatch({ type: "user/removeToken" });
            document.cookie = cookie.serialize('jwt', null);
            window.location.replace("/");
          }}
        >
          Sign Out
        </div>
        <svg className="option">
          <use href="#bell" />
        </svg>
        <img src="/assets/profile.jpg" width="40px" className="option" />
      </div>

      <svg display="none">
        <symbol
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="bell"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.9285 20.243L20.2116 17.381C19.4186 16.06 18.9996 14.547 18.9996 13.007V10.5C18.9996 7.335 16.8876 4.65802 13.9995 3.795V2.00002C13.9995 0.897 13.1025 0 11.9995 0C10.8965 0 9.9995 0.897 9.9995 2.00002V3.795C7.11153 4.65802 4.99953 7.335 4.99953 10.5V13.007C4.99953 14.547 4.58052 16.059 3.78852 17.38L2.07153 20.242C1.97853 20.397 1.97652 20.589 2.06553 20.746C2.15455 20.903 2.31955 21 2.49955 21H21.4995C21.6795 21 21.8455 20.9031 21.9345 20.7471C22.0236 20.591 22.0206 20.397 21.9285 20.243Z" />
          <path d="M8.85083 22C9.41483 23.178 10.6088 24 11.9998 24C13.3908 24 14.5848 23.178 15.1488 22H8.85083Z" />
        </symbol>
      </svg>
    </TopSection>
  );
};

const TopSection = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 25px;
    height: 25px;
    fill: var(--LEI5);
    margin-right: 10px;
    fill: ${(props) => (props.focused ? "var(--LEI3)" : "var(--LEI5)")};
  }

  .top-options {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .option {
    margin-left: 30px;
    transition: 0.2s ease;
    cursor: pointer;

    &:hover {
      fill: var(--LEI3);
      color: var(--LEI3);
    }
  }

  img {
    border-radius: 50%;
    margin-left: 10px !important;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;

