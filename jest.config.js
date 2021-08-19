module.exports = {
  rootDir: './src/test',
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  }
};
