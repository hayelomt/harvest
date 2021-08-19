const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const nextApp = require('next');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');

require('dotenv').config({ path: './.env' });

const errorHandler = require('./api/controllers/errorController');
const authMiddleware = require('./api/middleware/authMiddleware.js');
const AppError = require('./utils/AppError');
const apiRoutes = require('./api/routes');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = nextApp({ dev });
const handle = app.getRequestHandler();
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected successfully'));

app
  .prepare()
  .then(() => {
    const server = express();

    //// Copnfigure Global middleware
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // Sanitize against NoSql injection
    server.use(mongoSanitize());
    // Sanitize against script injection(xss attack)
    server.use(xssClean());

    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(fileUpload());

    server.use(cors());

    if (process.env.NODE_ENV !== 'production') {
      // server.use(morgan('dev'));
    }

    server.use(authMiddleware.setAuthorizationHeader);

    // Register api route handler
    server.use('/api', apiRoutes);

    // Register next js route handling
    server.get('*', (req, res) => handle(req, res));

    // Handle 404 errors
    server.use((req, res, next) => {
      next(new AppError('Page Not Found', 404));
    });

    server.use(errorHandler);

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`==> Running on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
