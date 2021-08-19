import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import LoginComponent from '../../components/auth/login/LoginComponent';
import { login } from '../../store/actions/authActions';

class LoginContainer extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      Router.replace('/');
    }
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      Router.replace('/');
    }
  }

  static getDerivedStateFromProps(props, state) {
    let newState = { ...state };
    if (props.isAuthenticated) {
      newState = {
        ...newState,
        isAuthenticated: props.isAuthenticated
      };
    }

    return newState;
  }

  handleSubmit = userData => {
    const { loginAction } = this.props;
    loginAction(userData);
  };

  render() {
    const { errors, isLoading } = this.props;
    return (
      <React.Fragment>
        <LoginComponent
          onSubmit={this.handleSubmit}
          isLoading={isLoading}
          errors={errors}
        />
      </React.Fragment>
    );
  }
}

LoginContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  errors: store.auth.login.errors,
  isLoading: store.auth.login.isLoading
});

export default connect(
  mapStateToProps,
  { loginAction: login }
)(LoginContainer);
