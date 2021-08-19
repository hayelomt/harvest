import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProviders } from '../../store/actions/providerActions';
import SellerSection from '../../components/homepage/sellerSection/SellerSection';

class ProviderSectionContainer extends Component {
  componentDidMount() {
    // console.log('component did moutn:', this.props);
    const { fetchProvidersAction } = this.props;
    fetchProvidersAction();
    // console.log('fetching finished');
  }

  render() {
    const { data, isLoading } = this.props;
    // console.log('sdfadsfdata is ', data);
    return (
      <React.Fragment>
        <SellerSection data={data} isLoading={isLoading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  // console.log('mapstatetoprops', store.provider);
  return {
    isLoading: store.provider.isLoading,
    data: store.provider.data
  };
};

ProviderSectionContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  isLoading: PropTypes.bool.isRequired,
  fetchProvidersAction: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchProvidersAction: fetchProviders }
)(ProviderSectionContainer);
