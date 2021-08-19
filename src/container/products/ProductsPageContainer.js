/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductComponent from '../../components/products/ProductComponent';
import {
  getLatestProducts,
  getRefinedProducts,
  getProductDetail
} from '../../store/actions/productActions';

class ProductsPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      stateCategory: 'ALL',
      stateIndex: '0',
      stateIsDetailed: false
    };
  }

  componentDidMount() {
    // console.log('container mounted');
    const { getLatestProductsAction, isDetailed } = this.props;
    if (!isDetailed) getLatestProductsAction(0);
  }

  static getDerivedStateFromProps(
    {
      category,
      index,
      getRefinedProductsAction,
      getLatestProductsAction,
      getProductDetailAction,
      refinedProducts,
      isDetailed,
      _id
    },
    { stateCategory, stateIndex, stateIsDetailed }
  ) {
    if (stateIndex !== index && category === 'ALL' && !isDetailed) {
      getLatestProductsAction(index);
      return {
        stateCategory: category,
        stateIndex: index,
        stateIsDetailed: false
      };
    }
    if (
      (stateCategory !== category || stateIndex !== index) &&
      !refinedProducts.isLoading &&
      !isDetailed
    ) {
      getRefinedProductsAction(category, index);
      return {
        stateCategory: category,
        stateIndex: index,
        stateIsDetailed: false
      };
    }
    if (isDetailed !== stateIsDetailed && isDetailed) {
      console.log('called detail action');
      getProductDetailAction(_id);
      return {
        stateCategory,
        stateIndex,
        stateIsDetailed: true
      };
    }
    return {
      stateCategory,
      stateIndex,
      stateIsDetailed
    };
  }

  render() {
    const { stateCategory, stateIndex } = this.state;
    const { latestProducts, refinedProducts, isDetailed, product } = this.props;
    return (
      <React.Fragment>
        <ProductComponent
          category={stateCategory}
          index={stateIndex}
          products={stateCategory === 'ALL' ? latestProducts : refinedProducts}
          isDetailed={isDetailed}
          product={isDetailed ? product : {}}
        />
      </React.Fragment>
    );
  }
}
ProductsPageContainer.propTypes = {
  isDetailed: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  latestProducts: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  refinedProducts: PropTypes.object.isRequired,
  getRefinedProductsAction: PropTypes.func.isRequired,
  getLatestProductsAction: PropTypes.func.isRequired,
  getProductDetailAction: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  latestProducts: store.product.latestProducts,
  refinedProducts: store.product.refinedProducts,
  product: store.product.product
});
export default connect(
  mapStateToProps,
  {
    getLatestProductsAction: getLatestProducts,
    getRefinedProductsAction: getRefinedProducts,
    getProductDetailAction: getProductDetail
  }
)(ProductsPageContainer);
