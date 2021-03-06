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
 * Datafunctions -> To manage the In- and outgoing data.
 */

module.exports.init = function(){
    database.catch(function(err){
            console.log("Database error » \n" + err);
    });
}

module.exports.user = {
    
    /**
     * Returns the UserData if exsists.
     */

    getUserByID: async(id) => {
         return await users.findOne({id: parseInt(id)}).then((callback) => callback);
    },
    
    /**
     * Returns the UserData if exists.
     */

    getUserByEmail: async(email) => {
        return await users.findOne({email: email}).then(callback => callback);
    },

    /**
     * Returns true?false when the action was successful or not. Inserts a new User.
     */

    addUser: async(User) => {
        const pre_user = User;
        
        // Checking for empty input
        if(pre_user.name.toString().toLowerCase().trim() === '' || pre_user.name.toString().toLowerCase() === null || pre_user.name.toString().toLowerCase() === undefined){
            return false;
        }

        if(pre_user.email.toString().toLowerCase().trim() === '' || pre_user.email.toString().toLowerCase() === null || pre_user.email.toString().toLowerCase() === undefined){
            return false;
        }

        // Creating the UserInstance
        const user = {
            id: random.toHash(pre_user.email),
            email: pre_user.email,
            name: pre_user.name,
            authentication: random.token(),
            processed: {
                quotes: [],
                firstnames: [],
                lastnames: [],
                sentences: []
            },
            createdAt: new Date()
        }

        // Inserting the UserInstance into the Database.
        return await users.insert(user).then(callback => {
            return callback;
        });

    },
    
    /**
     * Returns true?false when the action was successful or not. Deletes an exsisting User
     */

    deleteUser: async(userid) => {
        
        //Checking for empty input.
        if(userid.toString().toLowerCase().trim() === '' || userid.toString().toLowerCase().trim() === null || userid.toString().toLowerCase().trim() === undefined){
            return false;
        }

        // Getting the Users data
        const User = await this.user.getUserByID(userid);
        
        // Checking if the Users exists or not.
        if(User === null){
            return false;
        }

        // Deleting the User from the database.
        return await users.remove({id: User.id}).then(callback => {
            return true;
        }).catch(function(err){
            console.log(err);
            return false;
        });

    },
    
    listUsers: (limit) => {
            if(limit == undefined) {
                limit = 100;
            }
        return users.find({}, {limit: limit});
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

    User: (name, email) => {
        return {name: name, email: email};
    }
}

module.exports.quotes = {

    getStats: async() => {
        await quotes.stats().then((stats) => {console.log(stats)});
    },

    countQuote: async(estimate) => {
        if(estimate == undefined || estimate == false){
            return await quotes.count();
        } else if(estimate == true){
            return await quotes.count({}, {estimate: true});
        }
    },

    getQuoteByID: async(id) => {
        return await quotes.findOne({id: parseInt(id)}).then(callback => callback);
    },

    addQuote: async(Quote) => {

        return await quotes.insert(Quote).then(callback => {
            return callback;
        });
    },

    deleteQuote: async(id) => {
        return await quotes.remove({id: parseInt(id)}).then(callback => {
            return true;
        });
    },

    getLanguages: async(id) => {
        return await quotes.findOne({id: parseInt(id)}).then(callback => {
            return Object.keys(callback.translations);
        });
    },

    getQuotes: async(limit) => {
        if(limit == undefined) {
            limit = 100;
        }
        return await quotes.find({}, {limit: limit}).then(callback => callback)
    },

    getQuotesByAuthor: async(limit, author) => {
        return quotes.find({author: author}, {limit: limit}).then(callback => callback);
    },

    getQuotesByDefaultLanguage: async(limit, language) => {
        return quotes.find({defaultLanguage: language}, {limit: limit}).then(callback => callback);
    },

    updateDefaultLanguage: async(id, defaultLanguage) => {
        return await updateProperties(id, defaultLanguage, "defaultLanuage").then(callback => callback);
    },

    updateAuthor: async(id, author) => {
        return await quotes.findOneAndUpdate({id: id}, {$set: {author: author}}).then(callback => callback);
    },

    updateProperties: async(id, value, key) => {
        const quote = await this.getQuoteByID(id);

        if(quote == null){
            return false;
        }

        let properties = quote.properties;
        properties[key] = value;

        return await quotes.findOneAndUpdate({id: id}, {$set: {properties: properties}});

    },

    updateQuoteTranslation: async(id, Translation) => {
        const quote = await this.quotes.getQuoteByID(id);
        if(quote == null){
            return false;
        }

        const translations = quote.translations;
        const languageName = Obeject.keys(Translation);
        translations[Object.keys(languageName)] = Translation[languageName]

        return await quotes.findOneAndUpdate({id: id}, {$set, translations: translations}).then(callback => callback);
    },

    addLanguage: async(id, quoteTranslation) => {
        const quote = await this.quotes.getQuoteByID(id);
        if(quote == null){
            return false;
        }

        const translations = quote.translations;
        const languageName = Object.keys(quoteTranslation);
        translations[languageName] = quoteTranslation[languageName]
        return await quotes.findOneAndUpdate({id: parseInt(id)}, {$set: {translations: translations}}).then(callback => callback);
    },

    removeLanguage: async(id, Translation) => {
        const quote = await this.quotes.getQuoteByID(id);
        if(quote == null){
            return false;
        }

        const translations = quote.translations;
        delete translations[Translation];

        return await quotes.findOneAndUpdate({id: parseInt(id)}, {$set: {translations: translations}}).then(callback => callback);
    },

    Quote: (id, author, properties, translation) => {
        return {id: id, author: author, translations: translation , properties: properties, changes: {}};
    },

    quoteProperties: (defaultLanguage, categories, origin, context) => {
        return {defaultLanguage: defaultLanguage, categories: categories, origin: origin, context: context, createdAt: new Date()};
    }, 
    
    quoteTranslation: (language, quote) => {
        return {[language]: quote};
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