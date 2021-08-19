import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpComponent from '../../components/auth/signUp/SignUpComponent';
import { signup } from '../../store/actions/authActions';

class SignUpContainer extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  handleSubmit = userData => {
    const { signupAction } = this.props;
    signupAction(userData);
    console.log('after signup');
  };

  render() {
    const { isLoading, errors } = this.props;
    return (
      <React.Fragment>
        <SignUpComponent
          onSubmit={this.handleSubmit}
          isLoading={isLoading}
          errors={errors}
        />
      </React.Fragment>
    );
  }
}

SignUpContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  signupAction: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  isLoading: store.auth.signup.isLoading,
  errors: store.auth.signup.errors
});

export default connect(
  mapStateToProps,
  { signupAction: signup }
)(SignUpContainer);
