import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
  Card
} from 'reactstrap';

import './logincomponent.scss';

function LoginComponent({ onSubmit, errors, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password,
      keepLoggedIn
    };
    onSubmit(userData);
  };

  return (
    <Card className="login-component">
      <Container>
        <div className="login">
          <h1 className="text-center">Harvest</h1>
          <h4 className="text-center">THE GOTO AGRI ECOMMERCE PLATFORM</h4>
          <div className="loginCard">
            <br />
            <Form onSubmit={handleSubmit}>
              {errors.message && <Alert color="danger">{errors.message}</Alert>}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  autoFocus
                  className="borderless"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  invalid={!!errors.message}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordField">Password</Label>
                <Input
                  className="borderless"
                  type="password"
                  id="passwordField"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  invalid={!!errors.message}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={() => {
                      setKeepLoggedIn(!keepLoggedIn);
                    }}
                  />
                  {'  '}
                  Keep me signed in.
                </Label>
              </FormGroup>
              <br />
              {!isLoading ? (
                <Button className="button" size="lg" block>
                  Login
                </Button>
              ) : (
                <Button className="button" disabled size="lg" block>
                  Submitting...
                </Button>
              )}
              <br />
              <span>
                New to Harvest?
                <a href="/signup">Create an account</a>
              </span>
            </Form>
          </div>
        </div>
      </Container>
    </Card>
  );
}
LoginComponent.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LoginComponent;
