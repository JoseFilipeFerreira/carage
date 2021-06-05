import Head from "next/head";
import store from "../../store/store";
import { Provider } from "react-redux";

import GlobalStyle from "../../styles/globals";
import { Container } from "../../components/dashboard/container";
import { Navbar } from "../../components/dashboard/navbar";
import { Main } from "../../components/cars/main";

export default function Home() {
  console.log("Initial state: ", store.getState());
  const unsubscribe = store.subscribe(() =>
    console.log("State after dispatch: ", store.getState())
  );
  return (
    <Provider store={store}>
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
        <Navbar focused="cars"/>
        <Main />
      </Container>
    </Provider>
  );
}
