#!/usr/bin/env node
'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const OSS = require('ali-oss');

const fspm = fs.promises;

const homeDir = require('os').homedir();
let configDir = homeDir + "/.alioss-image-hosting";
let tempDir = configDir + "/temp";
let configFile = configDir + "/alioss-image-hosting.json";

let getConfig = async () => {
    let content = await fspm.readFile(configFile);
    return JSON.parse(content);
}

let showConfig = async () => {
    await checkConfig();
    let content = await fspm.readFile(configFile, 'utf8');
    console.log(content);
};

let initConfig = async () => {
    let config = {};
    let ossQuestions = [
        {
            type: 'input',
            name: 'accessKeyId',
            message: 'Input aliyun oss AccessKeyId:'
        },
        {
            type: 'input',
            name: 'accessKeySecret',
            message: 'Input aliyun oss AccessKeySecret:'
        },
        {
            type: 'list',
            name: 'region',
            message: 'Choose a region: ',
            choices: require('./alioss-region')
        }
    ];
    let ossAnswer = await inquirer.prompt(ossQuestions);
    let oss = new OSS(ossAnswer);
    let bucketsRet = await oss.listBuckets();
    let buckets = bucketsRet.buckets;
    let bucketNames = [];
    buckets.forEach((bucket) => {
        bucketNames.push(bucket.name);
    });

    let bucketQuestions = [
        {
            type: 'list',
            name: 'bucket',
            message: 'Choose a bucket to save images: ',
            choices: bucketNames
        }
    ];
    let bucketAnswer = await inquirer.prompt(bucketQuestions);
    let otherQuestions =  [
        {
            type: 'list',
            name: 'output',
            message: 'Choose image url output format: ',
            choices: [
                'url', 
                'markdown'
            ]
        }
    ];
    let otherAnswer = await inquirer.prompt(otherQuestions);

    let ossConfig = Object.assign({}, ossAnswer, bucketAnswer);
    config.oss = ossConfig;
    config.temp = tempDir;
    config.output = otherAnswer.output;
    let ansJson = JSON.stringify(config, null, 4);
    await saveConfig(ansJson);
    console.log(`config saved: \n${ansJson}`);
    
};

let checkConfig = async () => {
    await fspm.stat(configFile);
};

let saveConfig = async (config) => {
    try {
        await fspm.stat(configDir);
    } catch (err) {
        await fspm.mkdir(configDir, {recursive: true});
    }
    await fspm.writeFile(configFile, config);
};

module.exports = {
    get: getConfig,
    show: showConfig,
    init: initConfig,
    check: checkConfig
}