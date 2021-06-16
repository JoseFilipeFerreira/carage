import Head from "next/head";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import GlobalStyle from "../../../styles/globals";
import { Container } from "../../../components/dashboard/container";
import { Main } from "../../../components/car/main";
import { Navbar } from "../../../components/dashboard/navbar";

const axios = require("axios")
const cookie = require("cookie")

export default function Home({ user, car }) {
  const router = useRouter();
  const { id } = router.query;

  console.log(car)
  console.log(user)

  if (car) {
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
        <Navbar focused="cars" />
        <Main car={car} />
      </Container>
    );
  } else
    return (
      <ErrorPage statusCode={404} title="You don't have access to this page" />
    );
}

Home.getInitialProps = async ({ req, reduxStore, query}) => {
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

  const user = await axios.get("http://localhost:8000/user/smol/", config).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

  const result = await axios.post("http://localhost:8000/car/", query.id).then(
    (response) => {
      return { car: response.data };
    },
    (error) => {
      console.log(error);
    }
  );

  result.user = user;
  if (result) return result;
  else return { user: null, car: null };
};
