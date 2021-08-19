/* eslint-disable no-extra-boolean-cast */
// // pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import Router from 'next/router';
// eslint-disable-next-line import/no-unresolved
import withRedux from 'next-redux-wrapper';

import makeStore from '../src/store';
import { checkUserAuth } from '../src/store/actions/authActions';
import { makeRedirect } from '../lib/withAuthentication';

// Fix for non loading stylesheet on dev
if (process.env.NODE_ENV !== 'production') {
  Router.events.on('routeChangeComplete', () => {
    const path = '/_next/static/css/styles.chunk.css';
    const chunksSelector = `link[href*="${path}"]`;
    const chunksNodes = document.querySelectorAll(chunksSelector);
    const timestamp = new Date().valueOf();
    chunksNodes[0].href = `${path}?${timestamp}`;
  });
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Check user authentication of user when refreshed or started anew
    if (!!ctx.req && !ctx.store.getState().auth.isAuthenticated) {
      await ctx.store.dispatch(checkUserAuth(ctx.req));
      console.log('AFTER SERVER DISPATCH', ctx.store.getState().some.isLoading);
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if (
      ctx.store.getState().auth.isAuthenticated &&
      (ctx.pathname === '/login' || ctx.pathname === '/signup')
    ) {
      makeRedirect(ctx, '/');
    }

    // console.log(
    //   'Auth',
    //   ctx.store.getState().auth.isAuthenticated,
    //   'Path',
    //   ctx.pathname
    // );

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
