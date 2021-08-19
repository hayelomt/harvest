import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCartItems, removeAll } from '../../store/actions/cartAction';
import CartComponent from '../../components/cart/CartComponent';

class CartPageContainer extends Component {
  componentDidMount() {
    // console.log('component did moutn:', this.props);
    const { fetchCartItemsAction } = this.props;
    fetchCartItemsAction();
    // console.log('fetching finished');
  }

  //   componentDidUpdate() {
  //     // console.log('component did moutn:', this.props);
  //     const { fetchCartItemsAction } = this.props;
  //     fetchCartItemsAction();
  //     // console.log('fetching finished');
  //   }

  render() {
    const { cartItems, isLoading, isEmpty, removeAllAction } = this.props;
    // console.log('sdfadsfdata is ', data);
    return (
      <React.Fragment>
        <CartComponent
          cartItems={cartItems}
          isLoading={isLoading}
          isEmpty={isEmpty}
          onClick={removeAllAction}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  // console.log('mapstatetoprops', store.provider);
  return {
    isLoading: store.cart.cartItems.isLoading,
    isEmpty: store.cart.cartItems.isEmpty,
    cartItems: store.cart.cartItems.items
  };
};

CartPageContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cartItems: PropTypes.array.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  isLoading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  fetchCartItemsAction: PropTypes.func.isRequired,
  removeAllAction: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchCartItemsAction: fetchCartItems, removeAllAction: removeAll }
)(CartPageContainer);
