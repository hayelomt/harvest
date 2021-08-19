import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import './sellercard.scss';

const SellerCard = props => (
  <React.Fragment>
    <div>
      <Card className="cardd">
        <CardImg
          className="card-img"
          top
          src={'/static/assets/' + props.img}
          alt="Card image cap"
        />
        <CardBody className="card-body">
          <CardTitle className="card-title">
            Provider: {props.providerName}
          </CardTitle>
          <CardSubtitle className="card-subtitle">
            Locatiion: {props.location}
          </CardSubtitle>
          <CardText className="card-text">
            Products: {props.products.toString()}
          </CardText>
          <Button className="card-btn">See More...</Button>
        </CardBody>
      </Card>
    </div>
  </React.Fragment>
);

export default SellerCard;
