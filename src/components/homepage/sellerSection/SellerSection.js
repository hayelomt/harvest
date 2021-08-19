import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';
// import SellerCard from './SellerCard';
// import MultiCarousel from '../MultiCarousel';

import './sellercard.scss';

const SellerSection = ({ data, isLoading }) => {
  //fetch content from users and products collection

  // console.log('sellersection:', data, isLoading);
  let providersContent = 'Loading providers';
  if (isLoading === false && data.length !== 0) {
    providersContent = data.map((provider, index) => {
      return (
        <Link key={index} href="/upload">
          <a href="/upload" key={index}>
            {provider}
          </a>
        </Link>
      );
    });
  }

  return (
    <React.Fragment>
      <Container>
        <h2>
          <Link href="/upload">
            <a className="provider-link " href="/upload">
              Providers
            </a>
          </Link>
        </h2>
        {/* <MultiCarousel contents={contents} /> */}
        {isLoading ? 'Loading providers' : providersContent}
      </Container>
    </React.Fragment>
  );
};

SellerSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
  // eslint-disable-next-line react/forbid-prop-types
};

export default SellerSection;
