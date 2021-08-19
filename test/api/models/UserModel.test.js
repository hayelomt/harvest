// const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

const { expect } = chai;
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

const User = require('../../../api/models/UserModel');

describe('UserModel file test', () => {
  afterEach(() => {
    sandbox.restore();
  });

  context('Validation', () => {
    it('Shoud invalidate builtin errors', done => {
      const u = new User({ name: 'a', password: '21' });
      u.validate(function(err) {
        expect(err.errors.name).to.exist;
        expect(err.errors.name.message.includes('minimum allowed length'));
        expect(err.errors.password).to.exist;
        expect(err.errors.password.message.includes('minimum allowed length'));
        done();
      });
    });

    it('Shod invalidate email', done => {
      const u = new User({ email: 'sgs@g' });
      u.validate(err => {
        expect(err.errors.email).to.exist;
        expect(err.errors.email.message).to.equal('Email is not valid');
        done();
      });
    });

    it('Should invalidate password confirm mismatch', done => {
      const u = new User({ password: '1231231', passwordConfirm: '1231233' });
      u.validate(err => {
        expect(err.errors.passwordConfirm).to.exist;
        expect(err.errors.passwordConfirm.message).to.equal(
          'Password confirmation must match password'
        );
        done();
      });
    });

    it('Should invalidate invalid user type', done => {
      const u = new User({ userType: 'some-type' });
      u.validate(err => {
        expect(err.errors.userType).to.exist;
        expect(err.errors.userType.message).to.include('is not a valid enum');
        done();
      });
    });
  });

  context('User model hooks test', () => {
    it('Should test pre save hook');

    it('Should test post save hooks');
  });

  describe('User model virtual methods text', () => {
    context('Password changed', () => {
      it('should test return true', () => {
        const u = new User({ passwordChangedAt: new Date('2010-05-01') });
        const stampDate = new Date('2010-04-01');
        expect(u.passwordChanged(parseInt(stampDate.getTime() / 1000, 10))).to
          .be.true;
      });

      it('should test return false', () => {
        const u = new User({ passwordChangedAt: new Date('2010-04-01') });
        const stampDate = new Date('2010-05-01');
        expect(u.passwordChanged(parseInt(stampDate.getTime() / 1000, 10))).to
          .be.false;
      });
    });

    context('Correct password', () => {
      it('should return true', async () => {
        sandbox.stub(bcrypt, 'compare').resolves(true);
        const u = new User();
        const cor = await u.correctPassword('a', 'a');
        expect(cor).to.be.true;
        sandbox.restore();
      });

      it('should return false', async () => {
        sandbox.stub(bcrypt, 'compare').resolves(false);
        const u = new User();
        const cor = await u.correctPassword('a', 'b');
        expect(cor).to.be.false;
        sandbox.restore();
      });
    });
  });
});
