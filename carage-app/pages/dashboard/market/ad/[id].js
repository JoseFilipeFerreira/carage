import Head from "next/head";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import GlobalStyle from "../../../../styles/globals";
import { Container } from "../../../../components/dashboard/container";
import { Main } from "../../../../components/market/ad/main";
import { Navbar } from "../../../../components/dashboard/navbar";

const axios = require("axios");
const cookie = require("cookie");

export default function Home({ user, ad, car }) {
  const router = useRouter();
  const { id } = router.query;
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
        <Main ad={ad} car={car}/>
      </Container>
    );
  } else
    return (
      <ErrorPage statusCode={404} title="You don't have access to this page" />
    );
}

Home.getInitialProps = async ({ req, reduxStore, query }) => {
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

  const result = await axios.get("http://localhost:8000/user/", config).then(
    (response) => {
      return { user: response.data };
    },
    (error) => {
      console.log(error);
    }
  );

  const ad = await axios.post("http://localhost:8000/ad/", query.id).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

  const car = await axios.post("http://localhost:8000/car/", ad.car.vin).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );
  

  if (result) {
    result.ad = ad;
    result.ad.favorite = query.favorite;
    result.car = car;
    return result;
  } else return { user: null, ad: null };
};
