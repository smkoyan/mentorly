module.exports = {
    jwt: {
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    app: {
        key: process.env.APP_KEY,
        port: process.env.APP_PORT,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
    }
};
