import React from 'react';
import { shallow } from 'enzyme';
import upload from '../../../pages/products/uploads';

describe('Upload page', () => {
  let uploadPage;

  beforeEach(() => {
    uploadPage = shallow(<upload />);
  });

  it('Renders Layout', () => {
    // expect(uploadPage.type()).toBe('Layout');
  });
});
