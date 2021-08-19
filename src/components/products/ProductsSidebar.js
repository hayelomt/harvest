/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { ListGroup, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './productssidebar.scss';

function ProductsSidebar({ category }) {
  return (
    <Col xs="2" className="sidebar">
      <p className="title-header-2">Refine by</p>
      <ListGroup className="list-group">
        <Link href="/products?category=ALL&index=0">
          <li
            className={
              category === 'ALL' ? 'list-group-item active' : 'list-group-item'
            }
          >
            <a>All</a>
          </li>
        </Link>
        <Link href="/products?category=CROP&index=0">
          <li
            className={
              category === 'CROP' ? 'list-group-item active' : 'list-group-item'
            }
          >
            <a>Crops</a>
          </li>
        </Link>
        <Link href="/products?category=CEREAL&index=0">
          <li
            className={
              category === 'CEREAL'
                ? 'list-group-item active'
                : 'list-group-item'
            }
          >
            <a>Cereals</a>
          </li>
        </Link>
        <Link href="/products?category=DAIRY&index=0">
          <li
            className={
              category === 'DAIRY'
                ? 'list-group-item active'
                : 'list-group-item'
            }
          >
            <a>Diary</a>
          </li>
        </Link>
        <Link href="/products?category=FRUIT&index=0">
          <li
            className={
              category === 'FRUIT'
                ? 'list-group-item active'
                : 'list-group-item'
            }
          >
            <a>Fruits</a>
          </li>
        </Link>
        <Link href="/products?category=VEGITABLES&index=0">
          <li
            className={
              category === 'VEGITABLES'
                ? 'list-group-item active'
                : 'list-group-item'
            }
          >
            <a>Vegtables</a>
          </li>
        </Link>
      </ListGroup>
    </Col>
  );
}
ProductsSidebar.propTypes = {
  category: PropTypes.string.isRequired
};

export default ProductsSidebar;
