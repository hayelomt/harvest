/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import './productcard.scss';
import PropTypes from 'prop-types';

const ProductCard = props => {
  // eslint-disable-next-line react/prop-types
  const { _id, img, name, category, description } = props;
  return (
    <React.Fragment>
      <div>
        <Card className="cardd">
          <CardImg className="card-img" top src={img} alt="Card image cap" />
          <CardBody className="card-body">
            <CardTitle className="card-title"> {name}</CardTitle>
            <CardSubtitle className="card-subtitle">
              {` ( ${category} )`}
            </CardSubtitle>
            <CardText className="card-text">Desc: {description}</CardText>
            <Link href={`/products/item?category=ALL&_id=${_id}`}>
              <Button className="card-btn">See More...</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
export default ProductCard;
