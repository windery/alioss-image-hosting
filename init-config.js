#!/usr/bin/env node

const config = require('./config');

config.init().catch((err) => {
    console.log(err);
});
