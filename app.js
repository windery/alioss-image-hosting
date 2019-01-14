#!/usr/bin/env node

// gkm has a bug which will make macos stuck, 
// global shortcut is not available,
// background nodejs app development is paused not

const gkm = require('gkm');
const image = require('./upload');
 
const shortcutKeys = [
    'Left Meta',
    'Left Shift',
    'U'
];
var last3Keys = [];

// on key pressed
// gkm.events.on('key.pressed', async data => {
//     // console.log("event: " , this.event, ", data: ", data);
//     key = data[0];
//     if (last3Keys.length < 3) {  // keys < 3 on startup
//         addKey(key);
//     } else { // replace the oldest key value with the key pressed now
//         updateKey(key);
//     }
//     // console.log('last 3 keys: ', last3Keys);
//     if (matchShortcut()) {
//         console.log("Shortcut matched!", );
//         let filePath = await image.saveImageFromClipboard();
//     } else {
//         // console.log("shortcut not matched");
//     }

// });

let addKey = key => {
    let timestamp = Date.now();
    last3Keys.push({
        key: key,
        time: timestamp
    });
};

let updateKey = key => {
    let expiredIndex = 0;
    for (let i = 1; i < last3Keys.length; i++) {
        if (last3Keys[i].time < last3Keys[expiredIndex].time) {
            expiredIndex = i;
        }
    }
    let timestamp = Date.now();
    last3Keys[expiredIndex] = {
        key: key,
        time: timestamp
    };
};

let matchShortcut = () => {

    // got not enough keys
    if (last3Keys.length !== shortcutKeys.length) {
        return false;
    }

    // if 3 keys are not pressed in 3s, it should not work
    let timeMin = last3Keys[0].time;
    let timeMax = last3Keys[0].time;
    for (let i = 1; i < last3Keys.length; i++) {
        if (last3Keys[i].time < timeMin) {
            timeMin = last3Keys[i].time;
        }
        if (last3Keys[i].time > timeMax) {
            timeMax = last3Keys[i].time;
        }
    }
    if (timeMax - timeMin > 3000) {
        return false;
    }

    // 3 key values do not match shortcut
    for (let i = 0; i < shortcutKeys.length; i++) {
        let found = false;
        for (let j = 0; j < last3Keys.length; j++) {
            if (shortcutKeys[i] === last3Keys[j].key) {
                found = true;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}
 