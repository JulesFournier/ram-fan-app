import * as dotenv from 'dotenv'
dotenv.config()

module.exports = () => {
    if (process.env.MY_ENVIRONMENT === 'production') {
        return {
            name: process.env.APP_NAME,
            version: '1.0.0',
        };
    } else {
        return {
            name: process.env.APP_NAME,
            version: '1.0.0',
        };
    }
};
