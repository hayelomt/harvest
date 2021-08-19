require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../../api/models/UserModel');
const Product = require('../../api/models/ProductModel');

const DB = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/harvest';

const { users } = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'users.json')).toString()
);
const { products } = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'products.json').toString())
);

const seed = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    const seller = users[0];
    const newUser = await User.create(seller).then();
    const newProducts = [];
    for (let i = 0; i < products.length; i += 1) {
      newProducts.push(
        Product.create({
          ...products[i],
          uploader: newUser._id
        })
      );
    }

    await Promise.all(newProducts);

    const buyer = users[1];
    await User.create(buyer);
  } catch (err) {
    console.error('SEeding error', err);
  }
};

console.log('***Start seeding***');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async con => {
    await seed();
    await con.connection.close();
    console.log('***Finished seeding***');
  })
  .catch(console.error);
