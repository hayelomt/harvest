import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './jumbotron.scss';

const JumbotronComponent = () => (
  <React.Fragment>
    <div>
      <Jumbotron className="jumbo">
        <h1 className="display-3">Harvest</h1>
        <p className="lead">Your Goto Agri E-commerce Platform</p>
        <hr className="my-2" />
        <p>Buy and sell agricultural products with ease.</p>
        <p className="lead">
          <Button color="success">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  </React.Fragment>
);

export default JumbotronComponent;
