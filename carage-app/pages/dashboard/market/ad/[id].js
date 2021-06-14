import Head from "next/head";
import store from "../../../../store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

import GlobalStyle from "../../../../styles/globals";
import { Container } from "../../../../components/dashboard/container";
import { Main } from "../../../../components/market/ad/main"
import { Navbar } from "../../../../components/dashboard/navbar";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
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
        <Navbar focused="market" />
        <Main id={id}/>
      </Container>
    </Provider>
  );
}
