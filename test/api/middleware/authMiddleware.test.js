const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const rewire = require('rewire');
const jwt = require('jsonwebtoken');

const authMiddleware = rewire('../../../api/middleware/authMiddleware');
const User = require('../../../api/models/UserModel');

class AppRewireNew {
  constructor(msg, status, data = null) {
    this.msg = msg;
    this.status = status;
    this.data = data;
  }
}

authMiddleware.__set__({
  AppError: AppRewireNew
});

chai.use(sinonChai);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('Auth middleware', () => {
  let req = {};
  let res;
  let nxt;
  let err;

  afterEach(() => {
    sandbox.restore();
  });

  context('authorize function', () => {
    beforeEach(() => {
      sandbox.restore();
      nxt = sandbox.spy();
      req = {
        user: {
          userType: 'BUYER'
        }
      };
    });

    it('should not authorize', () => {
      err = new AppRewireNew(
        'You are not authorized to perfom this action',
        403
      );

      authMiddleware.requireRole('SELLER')(req, res, nxt);
      expect(nxt).to.be.calledOnce;
      expect(nxt).to.be.calledWith(err);
    });

    it('should authorize', () => {
      authMiddleware.requireRole('BUYER')(req, res, nxt);
      expect(nxt).to.be.calledOnce;
      expect(nxt).to.be.calledWith();
    });
  });

  context('protect function', () => {
    beforeEach(() => {
      sandbox.restore();
      nxt = sandbox.spy();
    });

    it('should throw error when token not provided', async () => {
      err = new AppRewireNew('You are not logged in', 401, {
        message: 'token_not_provided'
      });
      req = {
        headers: {}
      };
      await authMiddleware.protect(req, res, nxt);
      expect(nxt).to.be.calledOnce;
      expect(nxt).to.be.calledWith(err);
    });

    it('should throw error when token doesnt start with Bearer', async () => {
      err = new AppRewireNew('You are not logged in', 401, {
        message: 'token_not_provided'
      });
      req = {
        headers: {
          authorization: 'slkdfjsld fslkdfj'
        }
      };

      await authMiddleware.protect(req, res, nxt);
      expect(nxt).to.be.calledOnce;
      expect(nxt).to.be.calledWith(err);
    });

    describe('and valid token', () => {
      beforeEach(() => {
        req = {
          headers: {
            authorization: 'Bearer some_token'
          }
        };
      });

      it('should reject invalid token', async () => {
        err = new AppRewireNew('You are not logged in', 401, {
          message: 'token_not_valid'
        });
        sandbox.stub(jwt, 'verify').yields(err);

        await authMiddleware.protect(req, res, nxt);
        expect(nxt).to.be.calledOnce;
        expect(nxt).to.be.calledWith(err);
      });

      describe('and valid parsing', () => {
        beforeEach(() => {
          sandbox.stub(jwt, 'verify').yields(null, {
            id: 1,
            iat: 1231412312
          });
        });

        it('should reject if user find rejects', async () => {
          err = new AppRewireNew('User not found', 401);
          sandbox.stub(User, 'findById').rejects(err);

          await authMiddleware.protect(req, res, nxt);
          expect(nxt).to.be.calledOnce;
          expect(nxt).to.be.calledWith(err);
        });

        it('should reject if user is not found', async () => {
          err = new AppRewireNew('User has been removed.', 401);
          sandbox.stub(User, 'findById').resolves(null);

          await authMiddleware.protect(req, res, nxt);
          expect(nxt).to.be.calledOnce;
          expect(nxt).to.be.calledWith(err);
        });

        describe('and user found', () => {
          it('should reject by saying password changed', async () => {
            sandbox.stub(User, 'findById').resolves({
              _id: 124123,
              name: 'asdf',
              passwordChanged: sinon.stub().returns(true)
            });

            err = new AppRewireNew(
              'Passowrd has been changed. Please login again',
              401
            );

            await authMiddleware.protect(req, res, nxt);
            expect(nxt).to.be.calledOnce;
            expect(nxt).to.be.calledWith(err);
          });

          it('should authenticate user', async () => {
            const sampleUser = {
              _id: 124123,
              name: 'asdf',
              passwordChanged: sinon.stub().returns(false)
            };
            sandbox.stub(User, 'findById').resolves(sampleUser);

            await authMiddleware.protect(req, res, nxt);
            expect(nxt).to.be.calledOnce;
            expect(nxt).to.be.calledWith();
            expect(req.user).to.deep.equal(sampleUser);
          });
        });
      });
    });
  });
});
