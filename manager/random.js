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
    let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
            hash = hash & hash; // Convert to 32bit integer
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