import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart } from '../../store/actions/cartAction';
import CartItem from '../../components/cart/CartItem';

class CartItemContainer extends Component {
  //   componentDidMount() {
  //     // console.log('component did moutn:', this.props);
  //     const { removeFromCartAction } = this.props;
  //     removeFromCartAction();
  //     // console.log('fetching finished');
  //   }

  render() {
    const {
      isRemoving,
      removeFromCartAction,
      name,
      quantity,
      price,
      image,
      location,
      totalQuantity,
      itemId,
      id
    } = this.props;
    // console.log('sdfadsfdata is ', itemId);
    return (
      <React.Fragment>
        <CartItem
          name={name}
          quantity={quantity}
          totalQuantity={totalQuantity}
          price={price}
          image={image}
          location={location}
          isRemoving={isRemoving}
          onClick={removeFromCartAction}
          itemId={itemId}
          id={id}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  // console.log('mapstatetoprops', store.provider);
  return {
    isRemoving: store.cart.isRemoving
  };
};

CartItemContainer.defaultProps = {
  image: 'default.png'
};

CartItemContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isRemoving: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  removeFromCartAction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  { removeFromCartAction: removeFromCart }
)(CartItemContainer);
