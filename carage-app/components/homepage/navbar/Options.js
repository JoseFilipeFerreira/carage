import styled from "styled-components";

export const Options = () => {
  return (
    <NavOptions>
      <div>
        <a href="#" className="text-subhead navbar-option-hover">
          Home
        </a>
      </div>
      <div>
        <a href="#" className="text-subhead navbar-option-hover">
          About
        </a>
      </div>
      <div>
        <a href="#" className="text-subhead navbar-option-hover">
          Contact
        </a>
      </div>
    </NavOptions>
  );
};

const NavOptions = styled.div`
    display: flex;
    flex-direction: row;

  div {
    padding: 16px;
    align-self: center;
    flex-grow: 2;
  }

  @media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {

    display: none;


  }
`;
