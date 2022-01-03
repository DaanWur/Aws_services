const config = require('config');

module.exports = function () {
    if (!config.get('AWS_ACCESS_KEY_ID') || !config.get('AWS_SECRET_ACCESS_KEY') || !config.get('region')) {
        throw new Error('FATAL ERROR: One or more system variables are not defined');

    }
}