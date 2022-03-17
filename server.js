const app = require('./app');
const config = require('./api/config');

app.listen(config.app.port || 3000);
