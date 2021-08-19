import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Container } from 'reactstrap';
import ProductCard from './ProductCard';
import MultiCarousel from '../MultiCarousel';

import './productcard.scss';

const ProductSection = ({ data, isEmpty, state }) => {
  const { products } = data;
  let contents = 'loading';
  if (isEmpty === false) {
    console.log('state is ', state);
    contents = products.map(item => {
      return (
        <Col xs="6" sm="4" key={item._id}>
          <ProductCard
            img={item.imageurl}
            name={item.name}
            category={item.category}
            description={item.description}
            _id={item._id}
          />
        </Col>
      );
    });
  }

  return (
    <React.Fragment>
      <Container>
        <h2>
          <Link href="/products?category=ALL&index=0">
            <a className="provider-link " href="/products?category=ALL&index=0">
              Products
            </a>
          </Link>
        </h2>
        {contents === 'loading' ? (
          <div>loading</div>
        ) : (
          <MultiCarousel contents={contents} />
        )}
      </Container>
    </React.Fragment>
  );
};

ProductSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object.isRequired
};

export default ProductSection;
