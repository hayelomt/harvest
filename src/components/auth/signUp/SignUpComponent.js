import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Container,
  Col,
  Row,
  FormFeedback
} from 'reactstrap';
import './signupcomponent.scss';

function SignUpComponent({ onSubmit, isLoading, errors }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userType, setUserType] = useState('BUYER');

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      passwordConfirm,
      userType
    };
    onSubmit(userData);
  };

  return (
    <React.Fragment>
      <Container className="signup-component">
        <Card>
          <Row>
            <Col sm="4" className="harvest-container">
              <h2>Harvest</h2>
            </Col>
            <Col sm="8" className="form-container">
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>

                  <Input
                    autoFocus
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    invalid={!!errors.name}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    invalid={!!errors.email}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    invalid={!!errors.password}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="passwordConfirm">Confirm Password</Label>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    invalid={!!errors.passwordConfirm}
                  />
                  <FormFeedback>{errors.passwordConfirm}</FormFeedback>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked={userType === 'BUYER'}
                      onChange={() => setUserType('BUYER')}
                      invalid={!!errors.userType}
                    />
                    <FormFeedback>{errors.userType}</FormFeedback>
                    Buyer
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked={userType === 'SELLER'}
                      onChange={() => setUserType('SELLER')}
                    />
                    Seller
                  </Label>
                </FormGroup>
                {isLoading ? (
                  <Button disabled>Submitting</Button>
                ) : (
                  <Button>Submit</Button>
                )}
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </React.Fragment>
  );
}

SignUpComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignUpComponent;
