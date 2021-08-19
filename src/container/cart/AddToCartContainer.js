import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart } from '../../store/actions/cartAction';
import AddToCart from '../../components/cart/AddToCart';

class AddToCartContainer extends Component {
  //   componentDidMount() {
  //     // console.log('component did moutn:', this.props);
  //     const { addToCartAction } = this.props;
  //     addToCartAction();
  //     // console.log('fetching finished');
  //   }

  render() {
    const {
      isAdding,
      addToCartAction,
      name,
      price,
      image,
      location,
      totalQuantity,
      itemId,
      id
    } = this.props;
    // console.log('sdfadsfdata is ', data);
    // console.log('key in addtocartcontainer', itemId);
    return (
      <React.Fragment>
        <AddToCart
          addToCart={addToCartAction}
          isAdding={isAdding}
          name={name}
          totalQuantity={totalQuantity}
          price={price}
          image={image}
          location={location}
          itemId={itemId}
          id={id}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  //   console.log('mapstatetoprops', store.cart.cartItems.items.length);

  return {
    isAdding: store.cart.isAdding,
    itemId: store.cart.cartItems.items.length
  };
};

AddToCartContainer.defaultProps = {
  image: 'default.png'
};

AddToCartContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isAdding: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  addToCartAction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  { addToCartAction: addToCart }
)(AddToCartContainer);
