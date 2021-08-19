import React from 'react';
import { Media, Alert, Container } from 'reactstrap';
import { PropTypes } from 'prop-types';
import AddToCartContainer from '../../container/cart/AddToCartContainer';

function ProductDetail({ product }) {
  let Display;
  if (product.data.product && product.isLoading === false) {
    const {
      name,
      imageurl,
      category,
      quantity,
      price,
      uploader,
      description,
      _id
    } = product.data.product;
    Display = (
      <Container>
        <Media>
          <Media left href="#">
            <Media object src={imageurl} alt="Generic placeholder image" />
          </Media>
          <Media body>
            <Media heading>{name}</Media>
            <li>
              category:
              {category}
            </li>
            <li>
              price(birr):
              {price}
            </li>
            <li>
              description:
              {description}
            </li>
          </Media>
        </Media>
        <AddToCartContainer
          name={name}
          price={price}
          totalQuantity={quantity}
          id={_id}
        />
      </Container>
    );
  } else {
    Display = <Alert color="info">Product Loading</Alert>;
  }
  return <div>{Display}</div>;
}

ProductDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired
};

export default ProductDetail;
