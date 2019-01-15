const withPlugins = require('next-compose-plugins');
const typescript = require('@zeit/next-typescript');
const sass = require('@zeit/next-sass');

module.exports = withPlugins([
    [sass],
    typescript
]);
