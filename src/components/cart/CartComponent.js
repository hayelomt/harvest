import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import { PropTypes } from 'prop-types';
import AddToCartContainer from '../../container/cart/AddToCartContainer';

const CartComponent = ({ cartItems, isLoading, isEmpty, onClick }) => {
  const [subtotal, setSubtotal] = useState(0);

  let cartcontents = '';
  if (isEmpty === false) {
    cartcontents = cartItems.map((item, index) => {
      return <Row key={index}>{item}</Row>;
    });
    // let sum;
    // // cartItems.forEach(item => (sum += item.props.price * item.props.quantity));
    // console.log(sum);
    // setSubtotal(sum);
  }

  //   console.log(cartcontents);
  const handleRemove = () => {
    onClick();
  };

  return (
    <React.Fragment>
      <div className="cart-content">
        <Container>
          <AddToCartContainer
            name="asdfaf"
            quantity={234}
            totalQuantity={2345}
            price={32}
            location="asdfds"
            id="adf"
          />
          <Row>
            <Col>
              <h2>My Cart</h2>
            </Col>
            <Col>
              {!isEmpty && <Button onClick={handleRemove}>Remove All</Button>}
            </Col>
            <Col>{null}</Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? <h3>Loading...</h3> : null}
              {isEmpty === true ? <h3>Nothing in your cart.</h3> : null}
              {isEmpty === true ? (
                <Button>
                  <Link href="/">
                    <a href="/">Go Shopping</a>
                  </Link>
                </Button>
              ) : null}
              {isEmpty === false && cartcontents}
            </Col>
            {isEmpty === false && (
              <Col>
                <Row>
                  <Row>
                    <Col>
                      <h3>Subtotal</h3>
                    </Col>
                    <Col>
                      <h3>2500</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>Order Discount</h3>
                    </Col>
                    <Col>
                      <h3>200</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>Taxes</h3>
                    </Col>
                    <Col>
                      <h3>400</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h2>Estimated Total</h2>
                    </Col>
                    <Col>
                      <h2>2340</h2>
                    </Col>
                  </Row>
                </Row>
                <hr />
                <Row>
                  <Button>
                    <Link href="/">
                      <a href="/">Procced to Checkout</a>
                    </Link>
                  </Button>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CartComponent.defaultProps = {
  isLoading: false,
  isEmpty: false
};

CartComponent.propTypes = {
  isLoading: PropTypes.bool,
  isEmpty: PropTypes.bool,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
};

export default CartComponent;
