import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
        <Provider store={reduxStore}>
          <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Carage</title>

        <link rel="manifest" href="/manifest.json" />
        {/* <link rel="apple-touch-icon" href="/apple-icon.png"></link> */}
        <meta name="theme-color" content="#317EFB" />
      </Head>
          <Component {...pageProps} />
        </Provider>
    )
  }
}

export default withReduxStore(MyApp)