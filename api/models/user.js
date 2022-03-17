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


userSchema.query.filter = function (ctx) {
    if (typeof ctx.query.name !== 'undefined') {
        // here RegExp used as an alternative to SQL LIKE operator
        this.where('name').equals(new RegExp(`.*${ctx.query.name}.*`, 'i'));
    }

    if (typeof ctx.query.surname !== 'undefined') {
        this.where('surname').equals(new RegExp(`.*${ctx.query.surname}.*`, 'i'));
    }

    if (typeof ctx.query.type !== 'undefined') {
        this.where('type').equals(ctx.query.type);
    }


    if (typeof ctx.query.registeredAfter !== 'undefined') {
        this.gte('createdAt', ctx.query.registeredAfter);
    }

    if (typeof ctx.query.registeredBefore !== 'undefined') {
        this.lt('createdAt', ctx.query.ctx.query.registeredBefore);
    }

    return this;
};


module.exports = mongoose.model('User', userSchema);
