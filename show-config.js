#!/usr/bin/env node --no-warnings

const config = require('./lib/config');

config.show().catch((err) => {
    console.log(err);
});
