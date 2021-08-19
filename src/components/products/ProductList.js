/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Alert, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  // eslint-disable-next-line react/prop-types
  let productsDisplay;
  if (
    products.data !== undefined &&
    Array.isArray(products.data.products) &&
    products.data.products.length > 0
  ) {
    const allProducts = products.data.products.map(product => {
      return (
        <ProductCard
          key={product._id}
          imageurl={product.imageurl}
          name={product.name}
          description={product.description}
          category={product.category}
          _id={product._id}
        />
      );
    });
    productsDisplay = <Row>{allProducts}</Row>;
  } else {
    productsDisplay = (
      <Alert color="secondary">
        Sorry, we currently dont have products that satisfies your needs.
      </Alert>
    );
  }

  return <React.Fragment>{productsDisplay}</React.Fragment>;
};

ProductList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.object.isRequired
};

export default ProductList;
