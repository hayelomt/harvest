import React from 'react';
import { shallow } from 'enzyme';
import UploadProductCard from '../../../components/products/UploadedProductCard';

const props = {
  imageUrl: '/static/assets/default.png',
  name: 'Some Name',
  quantity: 100
};

describe('UploadProductCard', () => {
  let card;

  beforeEach(() => {
    card = shallow(<UploadProductCard {...props} />);
  });

  it('should render Card as parent', () => {
    expect(card.find('Card').exists()).toBe(true);
  });

  it('should render fields', () => {
    expect(card.find('CardImg').props().src).toEqual(props.imageUrl);
    expect(card.find('CardBody').exists()).toBe(true);
    expect(card.find('CardTitle').props().children).toEqual(props.name);
  });
});
