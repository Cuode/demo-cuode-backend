const inquirer = require('inquirer');

module.exports.user = {
    insertUser: () => {
        const questions = [
            {
                name: "email",
                input: "text",
                mesasge: "Please enter the email, to recieve the credentials:",
                validate: function (value){
                    if(value.length){
                        return true;
                    } else {
                        return "Please enter the email, to recieve the credentials:";
                    }
                }
            },
            {
                name: "name",   
                input: "text",
                message: "Please enter the name, so we can greet the account: ",
                validate: function(value){
                    if(value.length) {
                        return true;
                    } else {
                        return "Please enter the name, so we can greet the account: ";
                    }
                }
            }
        ];
        return inquirer.prompt(questions).then(callback => callback);
    },

    removeUser: () => {
        const questions = [
            {
                name: "email",
                type: "text",
                message: "Please enter the EMAIL of the user, you want to delete: ",
                validate: function(value){
                    if(value.length){
                        return true;
                    } else {
                        return "Please enter the EMAIL of the user, you want to delete: ";
                    }
                }
            }
        ];
        return inquirer.prompt(questions).then(callback => callback);
    },

    getUserByID: () => {
        const questions = [
            {
                name: "id",
                type: "text",
                message: "Please enter the ID of the User you want to get: ",
                validate: function(value){
                    if(value.length){
                        return true;
                    } else {
                        return "Please enter the ID of the User you want to get: ";
                    }
                }
            }
        ]
        return inquirer.prompt(questions);
    },

    getUserByMail: () => {
        const questions = [
            {
                name: "email",
                type: "text",
                message: "Please enter the EMAIL of the User you want to get: ",
                validate: function(value){
                    if(value.length){
                        return true;
                    } else {
                        return "Please enter the EMAIL of the User you want to get: ";
                    }
                }
            }
        ]
        return inquirer.prompt(questions);
    }
} 

