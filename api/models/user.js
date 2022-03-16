const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER_TYPE_MENTOR = 'mentor';
const USER_TYPE_MENTEE = 'mentee';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    surname: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
        enum: [USER_TYPE_MENTOR, USER_TYPE_MENTEE],
    },

    position: {
        type: String,
        required: true,
    },

    field: {
        type: Schema.Types.ObjectId,
        ref: 'Field',

        required: true,
    },


    plans: {
        type: String,
        required: true,
    },

    education: {
        type: String,
    },

    experience: {
        type: String,
    },

    about: {
        type: String,
    },

    email: {
        type: String,

        required: true,
        unique: true,

        validate: [v => {
            const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return emailRegExp.test(v);
        }, '{VALUE} is not valid email address'],
    },

    password: {
        type: String,
        required: true,
    },
}, {
    collection: 'users',
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
