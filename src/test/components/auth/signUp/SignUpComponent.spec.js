import React from 'react';
import { shallow } from 'enzyme';
import SignUpComponent from '../../../../components/auth/signUp/SignUpComponent';

const props = {
  isLoading: false,
  errors: {},
  onSubmit: () => {}
};

describe('SignUp Component', () => {
  let signUp;

  describe('Default behaviour', () => {
    beforeEach(() => {
      signUp = shallow(<SignUpComponent {...props} />);
    });

    // it('should match snapshot', () => {
    //   expect(signUp.html()).toMatchSnapshot();
    // });

    it('should render sidebar', () => {
      expect(signUp.find('h2').text()).toEqual('Harvest');
    });

    it('should mount form', () => {
      expect(signUp.find('Form').exists()).toBe(true);
    });

    it('should mount 6 Form Groups', () => {
      expect(signUp.find('FormGroup').length).toEqual(6);
    });

    it('should render button Submit message', () => {
      expect(signUp.find('Button').props().children).toEqual('Submit');
    });

    it('should have harvest-container class', () => {
      expect(
        signUp
          .find('Col')
          .at(0)
          .props().className
      ).toEqual('harvest-container');
    });

    it('should have form-container class', () => {
      expect(
        signUp
          .find('Col')
          .at(1)
          .props().className
      ).toEqual('form-container');
    });

    it('should mount Name form field', () => {
      expect(
        signUp
          .find('Label')
          .at(0)
          .props().children
      ).toEqual('Name');

      expect(
        signUp
          .find('FormFeedback')
          .at(0)
          .props().children
      ).toBeUndefined();

      expect(
        signUp
          .find('Input')
          .at(0)
          .props()
      ).toEqual({
        autoFocus: true,
        type: 'text',
        name: 'name',
        id: 'name',
        value: '',
        onChange: expect.any(Function),
        invalid: false
      });
    });

    describe('and should render input elements withour error', () => {
      it('should mount Email form field', () => {
        expect(
          signUp
            .find('Label')
            .at(1)
            .props().children
        ).toEqual('Email');

        expect(
          signUp
            .find('FormFeedback')
            .at(1)
            .props().children
        ).toBeUndefined();

        expect(
          signUp
            .find('Input')
            .at(1)
            .props()
        ).toEqual({
          type: 'email',
          name: 'email',
          id: 'email',
          value: '',
          onChange: expect.any(Function),
          invalid: false
        });
      });

      it('should mount Password form field', () => {
        expect(
          signUp
            .find('Label')
            .at(2)
            .props().children
        ).toEqual('Password');

        expect(
          signUp
            .find('FormFeedback')
            .at(2)
            .props().children
        ).toBeUndefined();

        expect(
          signUp
            .find('Input')
            .at(2)
            .props()
        ).toEqual({
          type: 'password',
          name: 'password',
          id: 'password',
          value: '',
          onChange: expect.any(Function),
          invalid: false
        });
      });

      it('should mount Password confirm form field', () => {
        expect(
          signUp
            .find('Label')
            .at(3)
            .props().children
        ).toEqual('Confirm Password');

        expect(
          signUp
            .find('FormFeedback')
            .at(3)
            .props().children
        ).toBeUndefined();

        expect(
          signUp
            .find('Input')
            .at(3)
            .props()
        ).toEqual({
          type: 'password',
          name: 'passwordConfirm',
          id: 'passwordConfirm',
          value: '',
          onChange: expect.any(Function),
          invalid: false
        });
      });

      it('should mount buyer radio field', () => {
        expect(
          signUp
            .find('Label')
            .at(4)
            .props().children
        ).toContain('Buyer');

        expect(
          signUp
            .find('FormFeedback')
            .at(4)
            .props().children
        ).toBeUndefined();

        expect(
          signUp
            .find('Input')
            .at(4)
            .props()
        ).toEqual({
          type: 'radio',
          name: 'radio1',
          checked: true,
          onChange: expect.any(Function),
          invalid: false
        });
      });

      it('should mount seller radio field', () => {
        expect(
          signUp
            .find('Label')
            .at(5)
            .props().children
        ).toContain('Seller');

        expect(
          signUp
            .find('Input')
            .at(5)
            .props()
        ).toEqual({
          type: 'radio',
          name: 'radio1',
          checked: false,
          onChange: expect.any(Function)
        });
      });
    });
  });

  describe('and should react to prop changes', () => {
    const newProps = {
      isLoading: true,
      errors: {
        name: 'Name Error',
        email: 'Email Error',
        password: 'Password error',
        passwordConfirm: 'Pass confirm error',
        userType: 'Invalid user type'
      },
      onSubmit: () => jest.fn()
    };

    beforeEach(() => {
      signUp = shallow(<SignUpComponent {...newProps} />);
    });

    it('Should render button as submitting', () => {
      expect(signUp.find('Button').props().disabled).toBe(true);
      expect(signUp.find('Button').props().children).toEqual('Submitting');
    });

    it('Should render errors upon error', () => {
      expect(
        signUp
          .find('FormFeedback')
          .at(0)
          .props().children
      ).toEqual(newProps.errors.name);

      expect(
        signUp
          .find('FormFeedback')
          .at(1)
          .props().children
      ).toEqual(newProps.errors.email);

      expect(
        signUp
          .find('FormFeedback')
          .at(2)
          .props().children
      ).toEqual(newProps.errors.password);

      expect(
        signUp
          .find('FormFeedback')
          .at(3)
          .props().children
      ).toEqual(newProps.errors.passwordConfirm);

      expect(
        signUp
          .find('FormFeedback')
          .at(4)
          .props().children
      ).toEqual(newProps.errors.userType);
    });
  });

  describe('Should submit form', () => {
    const submitProps = {
      isLoading: false,
      errors: {}
    };
    const onSubmit = jest.fn();

    const sampleInput = [
      'Name Field',
      'Email Field',
      'Password field',
      'Password Confirm field'
    ];

    beforeEach(() => {
      signUp = shallow(
        <SignUpComponent {...submitProps} onSubmit={onSubmit} />
      );

      for (let i = 0; i < sampleInput.length; i++) {
        signUp
          .find('Input')
          .at(i)
          .simulate('change', {
            target: { value: sampleInput[i] }
          });
      }

      signUp
        .find('Input')
        .at(5)
        .simulate('change');
    });

    it('Should update name field', () => {
      expect(
        signUp
          .find('Input')
          .at(0)
          .props().value
      ).toEqual(sampleInput[0]);
    });

    it('Should update email field', () => {
      expect(
        signUp
          .find('Input')
          .at(1)
          .props().value
      ).toEqual(sampleInput[1]);
    });

    it('Should update password field', () => {
      expect(
        signUp
          .find('Input')
          .at(2)
          .props().value
      ).toEqual(sampleInput[2]);
    });

    it('Should update password confirm field field', () => {
      expect(
        signUp
          .find('Input')
          .at(3)
          .props().value
      ).toEqual(sampleInput[3]);
    });

    it('should uncheck buyer', () => {
      expect(
        signUp
          .find('Input')
          .at(4)
          .props().checked
      ).toBe(false);
    });

    it('should check seller', () => {
      expect(
        signUp
          .find('Input')
          .at(5)
          .props().checked
      ).toBe(true);
    });

    it('Should submit form values', () => {
      const sampleEvent = {
        preventDefault: jest.fn()
      };
      signUp.find('Form').simulate('submit', sampleEvent);
      expect(sampleEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        name: sampleInput[0],
        email: sampleInput[1],
        password: sampleInput[2],
        passwordConfirm: sampleInput[3],
        userType: 'SELLER'
      });
    });
  });
});
