import styled from "styled-components";

export const Profile = ({ user }) => {
    console.log(user)
  return (
    <ProfileComponent>
      <div className="image">
        <img src="/assets/profile.jpg" />
      </div>
      <div className="details">
        <div className="detail">
          <div className="text-headline">Email</div>
          <div className="text-body">{user.email}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Name</div>
          <div className="text-body">{user.name}</div>
        </div>
        <div className="detail">
          <div className="text-headline">Phone</div>
          <div className="text-body">{user.phone}</div>
        </div>
      </div>
    </ProfileComponent>
  );
};

const ProfileComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .image {
    img {
      height: 200px;
      border-radius: 20px;
    }
  }

  .detail {
    display: flex;
    flex-direction: row;
    margin-left: 30px;

    div + div {
        margin-left: 20px;
    }
  }


  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {

    margin-top: 35px;
    

    .image {
    img {
      height: 100px;
      border-radius: 20px;
    }
  }

  .detail {
    display: flex;
    flex-direction: row;
    margin-left: 15px;

    div + div {
        margin-left: 10px;
    }
  }
  }
`;
