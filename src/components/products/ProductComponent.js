import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import './productcomponent.scss';
import ProductsSidebar from './ProductsSidebar';
import ProductsSearch from './ProductsSearch';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

// eslint-disable-next-line no-unused-vars
function ProductComponent({ category, index, products, isDetailed, product }) {
  return (
    <div className="product-component">
      <Row>
        <ProductsSidebar category={category} />
        <Col xs="10" className="content">
          <ProductsSearch />
          {isDetailed ? (
            <ProductDetail product={product} />
          ) : (
            <ProductList
              className="products"
              products={products}
              category={category}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
ProductComponent.propTypes = {
  isDetailed: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.object.isRequired
};

export default ProductComponent;
