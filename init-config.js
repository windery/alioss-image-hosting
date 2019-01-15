#!/usr/bin/env node --no-warnings

const config = require('./config');

config.init().catch((err) => {
    console.log(err);
});
