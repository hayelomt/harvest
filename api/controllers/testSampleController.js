const CONSTANTS = require('../../lib/constants');

exports.ping = (req, res) => {
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Ping',
    data: {
      user: req.user
    }
  });
};
