import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import UploadProductCard from './UploadedProductCard';
import './uploadedproducts.scss';

function UploadedProducts({ products, isLoading }) {
  return (
    <React.Fragment>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          {products.length === 0 ? (
            <div>No Products Uploaded yet</div>
          ) : (
            <Container className="uploaded-products" fluid>
              <Row>
                <Col className="sidebar" md="3">
                  Sidebar
                </Col>
                <Col className="card-container" md="9">
                  <Row>
                    {/* <Col xs="4"> */}
                    {products.map(product => (
                      <UploadProductCard
                        key={product._id}
                        className="card-holder"
                        imageUrl={product.imageUrl}
                        name={product.name}
                        quantity={product.quantity}
                      />
                    ))}
                    {/* </Col> */}
                  </Row>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </React.Fragment>
  );
}

UploadedProducts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default UploadedProducts;
