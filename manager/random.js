/**
 * This is a demo Project to prepare for the real Cuode project!
 * Author: remadisson
 * Created in, at: Bocholt, Germany - Mon, 20.07.2020
 */

/**
 * Generates a random token, to authenticate mobile devices.
 * @param {*} length 
 */

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Function that generates a new String on the depence on a give String. (So recreating is possible.)
 * @param {*} str 
 */

function toHash(str){
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
         chr   = str.charCodeAt(i);
         hash  = ((hash << 5) - hash) + chr;
         hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * Exports every method. So when required, we can use it everywhere.
 */

module.exports = {
    token: () => {
        return makeid(24);
    },

    toHash: (str) => {
        return toHash(str);
    }
}