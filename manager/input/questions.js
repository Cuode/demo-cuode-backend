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

