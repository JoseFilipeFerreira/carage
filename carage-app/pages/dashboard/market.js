import Head from "next/head";
import { Provider } from "react-redux";
import ErrorPage from "next/error";

import GlobalStyle from "../../styles/globals";
import { Container } from "../../components/dashboard/container";
import { Navbar } from "../../components/dashboard/navbar";
import { Main } from "../../components/market/main";

const axios = require("axios");
const cookie = require("cookie");

export default function Home({ user, ads }) {
  if (user) {
    return (
      <Container>
        <GlobalStyle />
        <Head>
          <title>Carage - Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <Navbar focused="market" />
        <Main ads={ads} />
      </Container>
    );
  } else
    return (
      <ErrorPage statusCode={404} title="You don't have access to this page" />
    );
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

  const result = await axios
    .get("http://localhost:8000/user/smol", config)
    .then(
      (response) => {
        return { user: response.data };
      },
      (error) => {
        console.log(error);
      }
    );
  if (result) return result;
  else return { user: null };
};
