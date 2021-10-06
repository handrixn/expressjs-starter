'use strict';

module.exports = {
    files: [
        './test/*.test.js',
        './test/unit/**/*.test.js',
        './test/integration/**/*.test.js'
    ],
    environmentVariables: {
        DB_MYSQL_CONNECTION_STRING: 'mysql://user:pass@localhost:3306/testing'
    },
    nodeArguments: [
        '--trace-deprecation',
        '--napi-modules'
    ],
    verbose: true,
    timeout: '2m'
};
