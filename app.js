require('dotenv').config();

require('mongoose').connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`).then(
    () => { console.log('Successfully connected to database'); },
    error => { console.error('Fail to connect to database:', error); process.exit(1); }
);

const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

app.use(require('koa-bodyparser')({
    enableTypes: ['json'],
}));
app.use(cors({
    credentials: true,
}));

const router = require('./api/router');
app.use(router.routes());
app.use(router.allowedMethods());


module.exports = app;
