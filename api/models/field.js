const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    collection: 'fields',
    timestamps: true,
});

module.exports = mongoose.model('Field', fieldSchema);
