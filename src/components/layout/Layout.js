/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/authActions';
import Header from './Header';
import Footer from './Footer';
import './layout.scss';

class Layout extends React.Component {
  render() {
    const {
      children,
      title,
      isAuthenticated,
      userType,
      logoutAction
    } = this.props;
    return (
      <div className="layout">
        <Head>
          <title>{title}</title>
        </Head>
        <Header
          isAuthenticated={isAuthenticated}
          userType={userType}
          onLogout={logoutAction}
        />
        <div className="content">{children}</div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userType: state.auth.user ? state.auth.user.userType : ''
});

Layout.defaultProps = {
  title: 'Harvest | One stop place for agri products',
  userType: ''
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutAction: PropTypes.func.isRequired,
  userType: PropTypes.string,
  title: PropTypes.string
};

export default connect(
  mapStateToProps,
  { logoutAction: logout }
)(Layout);
