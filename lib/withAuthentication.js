import React from 'react';
import Router from 'next/router';

/*
 * Utility for redirecting to different routes
 */
export function makeRedirect(ctx, toUrl, deleteToken = true) {
  const { req, res } = ctx;
  const isServer = !!req;
  if (isServer) {
    if (deleteToken) {
      res.clearCookie('token');
    }
    res.writeHead(302, {
      Location: `${toUrl}`
    });
    res.end();
  } else {
    Router.push(`${toUrl}`);
  }
}

/*
 * withAuthorization HOC to implement private pages
 */
const withAuthentication = WrappedComponent => {
  const withLoginRequiredWrapper = props => {
    return <WrappedComponent {...props} />;
  };

  withLoginRequiredWrapper.getInitialProps = async ctx => {
    console.log('With Autentication');
    if (!ctx.store.getState().auth.isAuthenticated) {
      console.log('NOT Authenticated[PRIVATE]');
      makeRedirect(ctx, '/login');
      return {};
    }

    // console.log('Authenticated [PRIVATE]');

    let pageProps = {};
    if (typeof WrappedComponent.getInitialProps === 'function') {
      pageProps = await WrappedComponent.getInitialProps.call(
        WrappedComponent,
        ctx
      );
    }

    return { ...pageProps };
  };

  return withLoginRequiredWrapper;
};

export default withAuthentication;
