import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUploadedProducts } from '../../store/actions/productActions';
import UploadedProductsComponent from '../../components/products/UploadedProductsComponent';

class ProductUploadContainer extends Component {
  componentDidMount() {
    const { uploads, getUploadedProductsAction } = this.props;

    if (uploads.data.length === 0) {
      getUploadedProductsAction();
    }
  }

  render() {
    const { uploads, isLoading } = this.props;

    return (
      <React.Fragment>
        <UploadedProductsComponent
          products={uploads.data}
          isLoading={isLoading}
        />
      </React.Fragment>
    );
  }
}

ProductUploadContainer.propTypes = {
  getUploadedProductsAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  uploads: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToprops = state => ({
  uploads: state.product.uploads,
  isLoading: state.product.uploads.isLoading
});

export default connect(
  mapStateToprops,
  { getUploadedProductsAction: getUploadedProducts }
)(ProductUploadContainer);
