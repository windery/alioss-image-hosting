#!/usr/bin/env node

const fspm = require('fs').promises;

let createFolderIfNotExists = async (folder) => {
    try {
        await fspm.access(folder);
    } catch (err) {
        console.log(`folder ${folder} not exists`);
        await fspm.mkdir(folder);
    }
};

let getFormatedDate = () => {

    Date.prototype.toFormatString = function () {
        let years = this.getFullYear();
        let months = this.getMonth() + 1; 
        let days = this.getDate();
        let hours = this.getHours();
        let minutes = this.getMinutes();
        let seconds = this.getSeconds();

        return [
                  [years, months, days].join('_'),   
                  [hours, minutes, seconds].join('_')
        ].join('_');
    };

    return new Date().toFormatString();
}

module.exports = {
    createFolderIfNotExists: createFolderIfNotExists,
    getFormatedDate: getFormatedDate
}