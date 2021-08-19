/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductSection from '../../components/homepage/productSection/ProductSection';
import { getLatestProducts } from '../../store/actions/productActions';

class ProductSectionContainer extends Component {
  constructor() {
    super();
    this.state = {
      isEmpty: true,
      data: {}
    };
  }

  componentDidMount() {
    const { getLatestProductsAction } = this.props;
    getLatestProductsAction(0);
  }

  static getDerivedStateFromProps({ latestProducts }) {
    if (!latestProducts.isLoading && latestProducts.data.products) {
      return {
        data: latestProducts.data,
        isEmpty: false
      };
    }
    return {
      data: {},
      isEmpty: true
    };
  }

  render() {
    const { data, isEmpty } = this.state;
    console.log('data is ', data);
    return (
      <React.Fragment>
        <ProductSection data={data} isEmpty={isEmpty} state={this.state} />
      </React.Fragment>
    );
  }
}
ProductSectionContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  latestProducts: PropTypes.object.isRequired,
  getLatestProductsAction: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  latestProducts: store.product.latestProducts
});
export default connect(
  mapStateToProps,
  { getLatestProductsAction: getLatestProducts }
)(ProductSectionContainer);
