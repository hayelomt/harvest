const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const { expect } = chai;

const User = require('../../../api/models/UserModel');
const authController = require('../../../api/controllers/authController');

chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe('AuthController Test', () => {
  const sampleUser = {
    name: 'titan',
    email: 't@g.c',
    profile: {
      address: 'Some address'
    }
  };
  const sampleUser2 = {
    name: 'sonnie',
    email: 'son@ldr'
  };
  const req = {
    body: {
      ...sampleUser
    }
  };
  let res = {};
  let next = {};
  const sampleError = new Error('Fake stubbed error');

  afterEach(() => {
    sandbox.restore();
  });

  context('Sign up function test', () => {
    beforeEach(() => {
      // Spy on res object
      res = {
        status: sandbox.stub().returns({
          json: sandbox.spy()
        })
      };
    });

    it('Should test successfull signup with profile', async () => {
      const userStub = sandbox.stub(User, 'create').resolves(sampleUser);
      next = sandbox.spy();

      await authController.signUp(req, res, next);
      expect(userStub).to.be.calledOnce;
      expect(next).to.not.be.called;
      expect(res.status).to.be.calledWith(201);
      expect(res.status(201).json).to.be.calledOnce;
      expect(res.status(201).json).to.be.calledWith({
        status: 'success',
        message: 'Signed up successfully',
        data: {
          user: {
            ...sampleUser
          }
        }
      });
    });

    it('Should test successfull signup without profile', async function() {
      req.body = {
        ...sampleUser2
      };
      const userStub = sandbox.stub(User, 'create').resolves(sampleUser2);
      next = sandbox.spy();

      await authController.signUp(req, res, next);
      expect(userStub).to.be.calledOnce;
      expect(next).to.not.be.called;
      expect(res.status).to.be.calledWith(201);
      expect(res.status(201).json).to.be.calledOnce;
      expect(res.status(201).json).to.be.calledWith({
        status: 'success',
        message: 'Signed up successfully',
        data: {
          user: {
            ...sampleUser2
          }
        }
      });
    });

    it('Shoud test sign up error', async function() {
      const userStub = sandbox.stub(User, 'create').rejects(sampleError);
      next = sandbox.spy();

      await authController.signUp(req, res, next);
      expect(userStub).to.be.calledOnce;
      expect(next).to.be.calledOnce;
      // Ensure next is called with thrown error
      expect(next).to.be.calledWith(sampleError);
    });
  });
});
