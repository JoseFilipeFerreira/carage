import Head from "next/head";
import { Provider } from "react-redux";
import ErrorPage from "next/error";

import GlobalStyle from "../../styles/globals";
import { Container } from "../../components/dashboard/container";
import { Navbar } from "../../components/dashboard/navbar";
import { Main } from "../../components/market/main";

const axios = require("axios");
const cookie = require("cookie");

export default function Home({ user, ads, page, brands, query, models }) {
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
        <Main ads={ads} page={page} brands={brands} query={query} models={models}/>
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

  let page = parseInt(query.page) || 0;

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

  let ads;

  console.log(query)

  if (
    query.make ||
    query.model ||
    query.fuel ||
    query.body_type ||
    query.gearbox ||
    query.max_price ||
    query.min_price ||
    query.max_date ||
    query.min_date ||
    query.max_kms ||
    query.min_kms
  ) {
    let max_date = null;
    let min_date = null;
    if (parseInt(query.max_date))
      max_date = `${query.max_date}-12-31`
    if (parseInt(query.min_date))
      min_date = `${query.min_date}-01-01`
    ads = await axios
      .post("http://localhost:8000/ad/search", {
        make: query.make || null,
        model: query.model || null,
        fuel: query.fuel || null,
        max_price: parseInt(query.max_price) || null,
        min_price: parseInt(query.min_price) || null,
        max_kms: parseInt(query.max_kms) || null,
        min_kms: parseInt(query.min_kms) || null,
        max_date,
        min_date,
        page: {
          page: page,
          size: 10,
        },
      })
      .then(
        (response) => {
          page = 0;
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  } else {
    ads = await axios
      .post("http://localhost:8000/ad/all", {
        page: page,
        size: 10,
      })
      .then(
        (response) => {
          page = 0;
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  let models = [];
  if (query.make) {
    models = await axios
      .post("http://localhost:8000/car/model/models", query.make, {
        headers: { "Content-Type": "plain/text" },
      })
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  console.log(models)

  if (!ads) {
    ads = await axios
      .post("http://localhost:8000/ad/all", {
        page: 0,
        size: 10,
      })
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const brands = await axios.get("http://localhost:8000/car/model/make").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

  if (result) {
    result.ads = ads;
    result.page = page;
    result.brands = brands;
    result.query = query;
    result.models = models;
    return result;
  } else return { user: null, ads: null };
};
