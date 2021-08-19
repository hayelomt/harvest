import React from 'react';
import { makeRedirect } from './withAuthentication';

const withAuthorization = role => WrappedComponent => {
  const withAuthorizationRequiredWrapper = props => {
    return <WrappedComponent {...props} />;
  };

  withAuthorizationRequiredWrapper.getInitialProps = async ctx => {
    console.log('With authorization', role);
    if (
      !ctx.store.getState().auth.user ||
      ctx.store.getState().auth.user.userType !== role
    ) {
      console.log('NOT Authorized[HOC]');
      makeRedirect(ctx, '/', false);
      return {};
    }

    let pageProps = {};
    if (typeof WrappedComponent.getInitialProps === 'function') {
      pageProps = await WrappedComponent.getInitialProps.call(
        WrappedComponent,
        ctx
      );
    }

    return { ...pageProps };
  };

  return withAuthorizationRequiredWrapper;
};

export default withAuthorization;
