import Head from "next/head";
import { Provider } from "react-redux";
import ErrorPage from "next/error";
import { useDispatch, useSelector } from "react-redux";

import GlobalStyle from "../../../styles/globals";
import { Container } from "../../../components/dashboard/container";
import { Navbar } from "../../../components/dashboard/navbar";
import { Main } from "../../../components/car/create/main";

const axios = require("axios");
const cookie = require("cookie");

export default function Home({ user, brands }) {
  if (user) {
    return (
      <Container>
        <GlobalStyle />
        <Head>
          <title>Carage - Create Car</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <Navbar focused="cars" />
        <Main user={user} brands={brands}/>
      </Container>
    );
  } else return <ErrorPage statusCode={404} title="You don't have access to this page"/>;
}

Home.getInitialProps = async ({ req, reduxStore }) => {
  if (req) {
    try {
      reduxStore.dispatch({
        type: "user/storeToken",
        token: cookie.parse(req.headers.cookie).jwt,
      });
    } catch {}
  }

  let config = {
    headers: {
      "Content-Type": "application/json",
      jwt: "",
    },
  };

  if (req) {
    try {
      config.headers.jwt = cookie.parse(req.headers.cookie).jwt;
    } catch {}
  } else {
    config.headers.jwt = reduxStore.getState().user.token;
  }

  const result = await axios.get("http://localhost:8000/user/smol", config).then(
    (response) => {
      return { user: response.data };
    },
    (error) => {
      console.log(error);
    }
  );

  const brands = await axios.get("http://localhost:8000/car/model/make").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

  if (result) {
    result['brands'] = brands;
    return result;
  }
  else return { user: null, brands: null };
};
