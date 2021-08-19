import React, { useState } from 'react';
import { Container, Row, Col, Label, Input, Button } from 'reactstrap';
import { PropTypes } from 'prop-types';
import CartItemContainer from '../../container/cart/CartItemContainer';

const AddToCart = ({
  addToCart,
  name,
  price,
  totalQuantity,
  location,
  image,
  itemId,
  id
}) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityErr, setQuantityErr] = useState(true);
  const onChange = e => {
    if (isNaN(parseFloat(e.target.value))) {
      setQuantityErr(true);
      setQuantity(0);
    } else {
      setQuantityErr(false);
      setQuantity(parseFloat(e.target.value));
    }
  };
  const handleOnClick = () => {
    const cartItem = (
      <CartItemContainer
        name={name}
        quantity={quantity}
        totalQuantity={totalQuantity}
        price={price}
        image={image}
        location={location}
        itemId={itemId}
        id={id}
      />
    );
    addToCart(cartItem);
  };
  return (
    <React.Fragment>
      <div className="add-to-cart-content">
        <Container>
          <Row>
            <Col>
              <Label>Quantity: </Label>
            </Col>
            <Col>
              <Input
                name="quantity"
                type="number"
                id="quantity"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={onChange}
              />
              <p>{quantityErr ? 'Quantity is required' : null}</p>
            </Col>
          </Row>
          <Row>
            <Button disabled={quantityErr === true} onClick={handleOnClick}>
              Add to Cart
            </Button>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddToCart.defaultProps = {
  image: 'default.png'
};

AddToCart.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default AddToCart;
