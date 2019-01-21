#!/usr/bin/env node

const OSS = require('ali-oss');

var client = async () => {
    var config = require('./config');
    var cf = await config.get();
    var osscf = cf.oss;
    return new OSS(osscf);
};

var upload = async (filePath) => {
    var c = await client();
    var filename = filePath.substring(filePath.lastIndexOf('/') + 1);
    var putRes = await c.put(filename, filePath);
    console.log('upload success');
    var config = require('./config');
    var cf = await config.get();
    var osscf = cf.oss;
    var fileUrl = `https://${osscf.bucket}.${osscf.region}.aliyuncs.com/${filename}`;
    if (cf.output === 'url') {
        return fileUrl;
    } else {
        var markdown = `![](${fileUrl})`;
        return markdown;
    } 
};

module.exports = {
    client: client,
    upload: upload
}

