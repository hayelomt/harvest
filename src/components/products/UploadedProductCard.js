/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from 'reactstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import './uploadedproductcard.scss';

function UploadProductCard({ name, quantity, imageUrl }) {
  return (
    <React.Fragment>
      <Card className="card-holder">
        <CardImg top width="100%" src={imageUrl} alt={name} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{quantity} Kg</CardSubtitle>
          <Row>
            <Col>
              <MdEdit />
              <MdDelete color="primary" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

UploadProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default UploadProductCard;
