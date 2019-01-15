#!/usr/bin/env node --no-warnings

const {spawn} = require('child_process');
const config = require('./config');
const myUtil = require('./util');
const alioss = require('./alioss');

let upload = async () => {
    var tmpFilePath = await getTmpFilePath();
    console.log('Save clipboard content as image: ', tmpFilePath);
    let cmd = 'pngpaste';
    console.log(`Execute cmd: ${cmd} ${tmpFilePath}`);
    const pngpaste = spawn('pngpaste', [tmpFilePath]);
    pngpaste.stdout.on('data', data => {
        console.log('stdout: ', data);
    });
    pngpaste.stderr.on('data', err => {
        console.log('stderr: ', err.toString());
    });
    pngpaste.on('error', async err => {
        console.log('error: ', err.toString());
        process.exit(1);
    });
    pngpaste.on('exit', async () => {
        console.log(`upload file ${tmpFilePath} aliyun oss`);
        var fileUrl = await alioss.upload(tmpFilePath);
        await saveToClipboard(fileUrl);
    });
    return tmpFilePath;
};

let getTmpFilePath = async () => {
    var conf = await config.get();
    var tempDir = conf.temp;
    await myUtil.createFolderIfNotExists(tempDir);
    var formatedDate = myUtil.getFormatedDate();
    var tmpFilePath = tempDir + '/' + formatedDate + '.png';
    return tmpFilePath;
};

let saveToClipboard = async data => {
    let pbcopy = spawn('bash', ['-c', `echo "${data}" | pbcopy`]);
    pbcopy.stdout.on('data', data => {
        console.log('pbcopy stdout: ', data.toString());
    });
    pbcopy.stderr.on('data', err => {
        console.log('pbcopy stderr: ', err.toString());
    });
    pbcopy.on('exit', () => {
        console.log('copy image url to clipboard success');
    });
};

upload();
