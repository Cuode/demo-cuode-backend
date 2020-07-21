/**
 * This is a demo Project to prepare for the real Cuode project!
 * Author: remadisson
 * Created in, at: Bocholt, Germany - Mon, 20.07.2020
 */

/*
 * Imports 
 */

const monk = require('monk');
const random = require('./random');

/*
 * Registration for Databases:
 */

const database = monk('localhost/cuode-demo');
const users = database.get('users');
const quotes = database.get('quotes');
const firstnames = database.get('firstnames');
const lastnamse = database.get('lastnames');
const sentences = database.get('sentences');

/*
 * Datafuncttions -> To manage the In- and outgoing data.
 */

module.exports.init = function(){
    database.catch(function(err){
            console.log("Database error » \n" + err);
    });
}

module.exports.user = {
    
    getUserByID: (id) => {
         return users.findOne({id: id}).then(callback => callback);
    },
    
    addUser: (User) => {
        const pre_user = User;
        if(pre_user.id.toString().toLowerCase().trim() === '' || pre_user.id.toString().toLowerCase() === null || pre_user.id.toString().toLowerCase() === undefined){
            return false;
        }

        if(pre_user.name.toString().toLowerCase().trim() === '' || pre_user.name.toString().toLowerCase() === null || pre_user.name.toString().toLowerCase() === undefined){
            return false;
        }

        if(pre_user.email.toString().toLowerCase().trim() === '' || pre_user.email.toString().toLowerCase() === null || pre_user.email.toString().toLowerCase() === undefined){
            return false;
        }

        const user = {
            id: pre_user.id,
            email: pre_user.email,
            name: pre_user.name,
            authentication: random.token(),
            processed: {
                quotes: [],
                firstnames: [],
                lastnames: [],
                sentences: []
            }
        }

        return users.insert(user).then(callback => {
            return callback;
        });

    },
    
    deleteUser: (userid) => {
        if(userid.toString().toLowerCase().trim() === '' || userid.toString().toLowerCase().trim() === null || userid.toString().toLowerCase().trim() === undefined){
            return false;
        }

        const User = getUserByID(userid);
        
        if(User === null){
            return false;
        }

        return users.remove({id: User.id}).then(callback => {
            return true;
        }).catch(function(err){
            console.log(err);
            return false;
        });

    },
    
    listUsers: () => {
        return users.find();
    },

    updateUser: (userid, User) => {
        if(userid.toString().toLowerCase().trim() === '' || userid.toString().toLowerCase().trim() === null || userid.toString().toLowerCase().trim() === undefined){
            return false;
        }
        
        return users.update({id: userid}, {$set, User}).then(callback => {
            return true;
        }).catch(function(err){
            console.log(err);
        });
        
    },

    User: (id, name, email) => {
        return {id: id, name: name, email: email};
    }
}

module.exports.quotes = {

    getQuote: () => {
        //TODO getQuotes
    },

    addQuote: () => {
        //TODO addQuote
    },

    deleteQuote: () => {
        //TODO deleteQuote
    },

    listQuotes: () => {
        //TODO listQuotes
    },

    updateQuote: () => {
        //TODO updateQuotes
    }
}

module.exports.firstnames = {

    getName: () => {

    },

    addName: () => {

    },

    removeName: () => {

    },

    listNames: () => {

    },

    updateName: () => {

    }
}

module.exports.lastnames = {

    getName: () => {

    },

    addName: () => {

    },

    removeName: () => {

    },

    listNames: () => {

    },

    updateName: () => {

    }
}

module.exports.sentences = {

    getSentence: () => {

    },

    addSentence: () => {

    },

    removeSentence: () => {

    },

    listSentences: () => {

    },

    updateSentences: () => {

    }
}