const catchAsync = require('../../utils/catchAsync');

exports.store = catchAsync(async (req, res, next) => {
  // Not a gud create (doesnt sanitize)
  // upload element

  // console.log('handling upload request', req);
  if (req.files === null) {
    res.status(400).json({ message: 'no file uploaded' });
    return;
  }

  const { file } = req.files;

  if (file.mimetype.split('/')[0] !== 'image') {
    res.status(400).json({ message: 'Please upload image files only' });
    return;
  }

  // console.log(file);
  // console.log('file path ', `static/uploads/${file.name}`);
  file.mv(`static/uploads/${file.name}`, err => {
    if (err) {
      // console.log(err);
      return res.status(500).send(err);
    }
    console.log('upload successful');

    res.json({
      message: 'upload successful',
      filen: file.name,
      filepath: `/static/uploads/${file.name}`
    });
  });
});
