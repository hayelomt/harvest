const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const { expect } = chai;

const Product = require('../../../api/models/ProductModel');
const productController = require('../../../api/controllers/productsController');

chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe('Product Controller Test', () => {
  const sampleUser = {
    _id: '5d9c65e4f4251e32fe36c29e',
    name: 'titan',
    email: 't@g.c',
    profile: {
      address: 'Some address'
    }
  };
  const sampleProducts = [
    {
      name: 'sldkfjs',
      quantirty: 10
    },
    {
      name: 'sssss',
      quantirty: 10
    }
  ];
  const req = {
    user: {
      ...sampleUser
    }
  };
  let res = {};
  let next;
  const sampleError = new Error('Fake stubbed error');

  afterEach(() => {
    sandbox.restore();
  });

  context('Get user uploaded products', () => {
    beforeEach(() => {
      // Spy on res object
      res = {
        json: sandbox.spy()
      };
    });

    it('Should test successfull product returns', async () => {
      next = sandbox.spy();
      const userStub = sandbox.stub(Product, 'find').resolves(sampleProducts);

      await productController.userUploadedProducts(req, res, next);
      expect(next).to.not.be.called;
      expect(userStub).to.be.calledOnce;
      expect(userStub).to.be.calledWith({
        uploader: sampleUser._id
      });
      expect(res.json).to.be.calledOnce;
      expect(res.json).to.be.calledWith({
        status: 'success',
        message: 'Products uploaded',
        data: {
          products: [...sampleProducts]
        }
      });
    });

    it('should reject in case of error', async () => {
      next = sandbox.spy();
      const userStub = sandbox.stub(Product, 'find').rejects(sampleError);

      await productController.userUploadedProducts(req, res, next);
      expect(next).to.be.calledOnce;
      expect(userStub).to.be.calledOnce;
      expect(next).to.be.calledWith(sampleError);
    });
  });
});
