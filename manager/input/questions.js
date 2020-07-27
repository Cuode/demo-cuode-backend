const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

module.exports.user = {
    insertUser: async() => {
        let user = {};
            await new Promise((resolve, reject) => {
                rl.question(chalk.yellow(">> Please enter the email: "), (callback) =>{
                    user.email = callback;
                    resolve();
                });
            });

            await new Promise((resolve, reject) => {
                rl.question(chalk.yellow(">> Please enter the name: "), callback => {
                    user.name = callback;
                    resolve();
                });
            });

        return user;
    },

    removeUser: async() => {
        let email = undefined;
        
        await new Promise((resolve, reject) => {
            rl.question(chalk.yellow(">> Please enter the email of the account you want to delete: "), (callback) => {
                email = callback;
                resolve();
            });
        });

        return email;

    }
} 

module.exports.quotes = {
    addQuote: async() => {

    },

    removeQuote: async() => {

    },

}

module.exports.confirm = async(question) =>{
    let sure = false;
    await new Promise((resolve, reject) => {
         rl.question('Are you sure, ' + question, (callback) =>{
            if(callback.toString().toLowerCase().trim() === 'yes' || callback.toString().toLowerCase().trim() === 'y'){
                sure = true;
            }
            resolve()
        });
    });

    return sure;
}

