require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../api/config');

const Field = require('../api/models/field');

const run = async () => {
    try {
        await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);

        await Field.insertMany([{name: 'programming'}, {name: 'medicine'}, {name: 'psychology'}]);

        process.exit(0);
    } catch (error) {
        console.log(error.name, ':', error.message);
        process.exit(1);
    }
};

void run();
