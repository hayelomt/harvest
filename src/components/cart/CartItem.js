import React from 'react';
import { Button, Container, Row, Col, Input, Label } from 'reactstrap';
import { PropTypes } from 'prop-types';

const CartItem = ({
  image,
  price,
  name,
  quantity,
  location,
  totalQuantity,
  isRemoving,
  onClick,
  itemId,
  id
}) => {
  const handleRemove = () => {
    // console.log(itemId);
    onClick(id);
  };
  return (
    <React.Fragment key={id}>
      <div className="cart-item-content">
        <Container>
          <Row>
            <Col>
              <img src={`/static/assets/${image}`} alt="product" id="image" />
            </Col>
            <Col>
              <Row>
                <h3 id="name">{name}</h3>
              </Row>
              <Row>
                <p id="location">{`Shipped from ${location}`}</p>
              </Row>
            </Col>
            <Col>
              <Row>
                <h3>In Stock</h3>
              </Row>
              <Row>
                <h3 id="totalQuantity">{totalQuantity}</h3>
              </Row>
            </Col>
            <Col>
              <h3 id="price">{`Price: ${price}`}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={handleRemove} disabled={isRemoving}>
                {isRemoving ? 'Removing' : 'Remove'}
              </Button>
            </Col>
            <Col>
              <Label>Quantity: </Label>
              <Input
                type="number"
                name="quantity"
                value={quantity}
                id="quantity"
                onChange={e => console.log(e.target.value)}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h3>Product Total:</h3>
            </Col>
            <Col>
              <h3 id="total">{(quantity * price).toFixed(3)}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CartItem.defaultProps = {
  image: 'default.png',
  isRemoving: false
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  isRemoving: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default CartItem;
