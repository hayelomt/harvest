import React from 'react';
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import './productssearch.scss';

export default function ProductsSearch() {
  return (
    <div className="products-search">
      <InputGroup className="header-input">
        <Input className="input-primary" placeholder="Search products ... " />
        <InputGroupAddon addonType="append">
          <Button className="btn-primary">Search</Button>
        </InputGroupAddon>
      </InputGroup>
      <br />
      <h1 className="title-header-1">Products</h1>
      <hr />
    </div>
  );
}
