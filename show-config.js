#!/usr/bin/env node

const config = require('./config');

config.show().catch((err) => {
    console.log(err);
});
