import Head from "next/head";
import { connect } from "react-redux";
import { Provider, useDispatch } from "react-redux";
import ErrorPage from "next/error";

import GlobalStyle from "../styles/globals";
import { Container } from "../components/dashboard/container";
import { Navbar } from "../components/dashboard/navbar";
import { Main } from "../components/dashboard/main";

const axios = require("axios");
const cookie = require("cookie");


function Home({ user }) {

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
          <Navbar focused="dashboard" />
          <Main user={user} />
        </Container>
    );
  } else return <ErrorPage statusCode={404} title="You don't have access to this page" />;
}

Home.getInitialProps = async ({req, reduxStore}) => {
  if (req) {
    try {
      reduxStore.dispatch({ type: "user/storeToken", token: cookie.parse(req.headers.cookie).jwt })
    } catch {}
  }
  const state = reduxStore.getState()
  let config = {
    headers: {
      "Content-Type": "application/json",
      jwt: state.user.token,
    },
  };
  console.log(config)
  const result = await axios.get("http://localhost:8000/user/", config).then(
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

export default connect(
)(Home);