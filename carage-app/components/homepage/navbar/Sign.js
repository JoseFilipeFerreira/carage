import styled from "styled-components";

export const Sign = () => {
  return (
    <NavSign>
      <div className="signin">
        <a href="#" className="text-button navbar-option-hover">
          Sign In
        </a>
      </div>
      <a href="#">
        <div className="signup text-button">Sign Up</div>
      </a>
    </NavSign>
  );
};

const NavSign = styled.div`
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;

  .signup {
    display: flex;
    background-color: var(--LEI3);
    height: 46px;
    width: 94px;
    justify-content: center;
    align-items: center;
    margin-left: 32px;
    transition: 0.2s ease;
  }

  .signup:hover {
    background-color: var(--LEI3-1);
    transition: 0.2s ease;
  }
`;
