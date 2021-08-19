import React from 'react';
import { shallow } from 'enzyme';
import UploadedProductsComponent from '../../../components/products/UploadedProductsComponent';

const props = {
  products: [
    {
      _id: 'sldfkjsdlfjk',
      imageUrl: '/static/assets/default.png',
      name: 'Some Name',
      quantity: 100
    },
    {
      _id: 'sdflkajlfi',
      imageUrl: '/static/assets/default.png',
      name: 'Another Name',
      quantity: 200
    }
  ]
};

describe('UploadProductComponents', () => {
  let product;

  beforeEach(() => {
    product = shallow(
      <UploadedProductsComponent {...props} isLoading={false} />
    );
  });

  it('should render Card as parent', () => {
    expect(product.find('UploadProductCard').exists()).toBe(true);
    expect(product.find('UploadProductCard').length).toBe(
      props.products.length
    );
    expect(
      product
        .find('UploadProductCard')
        .at(0)
        .props().name
    ).toBe(props.products[0].name);
  });
});
