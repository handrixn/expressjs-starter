'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const contextMiddleware = require('./src/middleware/context');
const requestAtMiddleware = require('./src/middleware/request-timestamp');
const acceptLanguageMiddleware = require('./src/middleware/accept-language');
const notFoundError = require('./src/middleware/not-found-error');

const router = require('./src/router');

const app = express();
const host = process.env.APP_URL;
const port = process.env.APP_PORT;

app.set('trust proxy', 1);

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept-Language', 'Accept', 'Authorization', 'api-key', 'x-forwarded-for'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(contextMiddleware);
app.use(requestAtMiddleware);
app.use(acceptLanguageMiddleware);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./storage'));

app.use('/v1', router);

app.use(notFoundError);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`app running on ${host}:${port}`));
