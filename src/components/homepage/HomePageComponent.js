import React from 'react';
import JumbotronComponent from './JumbotronComponent';
// import SellerSection from './sellerSection/SellerSection';
import ProductSectionContainer from '../../container/homepage/ProductSectionContainer';
import ProviderSectionContainer from '../../container/homepage/ProviderSectionContainer';
import './homepage.scss';

const HomePageComponent = () => (
  <React.Fragment>
    <div className="home-page">
      <JumbotronComponent />
      <ProductSectionContainer />
      <ProviderSectionContainer />
    </div>
  </React.Fragment>
);

export default HomePageComponent;
