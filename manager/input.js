const color = require("chalk");
const database = require("./db");
const questions = require("./input/questions");

const messages = [
  color.blueBright(`> Use 'help' to get Information for usage.`),
];


/**
 * Initiates the Input for the Console.
 */

module.exports.init = function() {
  console.log(messages[0]);
  var stdin = process.openStdin();
  
  stdin.addListener('data', async (input) => {
        input = input.toString();
        var command = input.split(" ")[0];
        var args = input.replace(command, "").toLowerCase().trim().split(" ");
        InputCycle(command.toString().toLowerCase(), args);
    });
};

//Defines the commands
const commands = ["user", "data", "clear"];

/**
 * Handles the Input, to perform certain actions.
 * @param {*} command
 * @param {*} args
 */

async function InputCycle(command, args) {
  if(commands.includes(command)){  
    if (args.length > 0) {
      switch (command.toLowerCase().trim()) {
        case "user":
          let first_argument = args[0].toLowerCase().trim();
          

          /**
           *  ADDING COMMAND
           */

          if (first_argument == "add") {
            if (args.length == 1) {
                const user = await questions.user.insertUser();

                if(await database.user.getUserByEmail(user.email).then(callback => callback != null)){
                  log(`An account with this email (${user.email}) already exists.`);
                  return false;
                }

                return await database.user.addUser(database.user.User(user.name, user.email)).then(callback => {
                  log(`> ${callback.name} is now registered.`);
                  console.log(color.cyanBright(callback));
                  console.log(" ")
                  return true;
                });
            } else {
              sendHelp(command);
            }


            /**
             *  REMOVING COMAND
             */

          } else if (first_argument == "remove") {
            if (args.length == 1) {
                
              const email = (await questions.user.removeUser()).email; 
              const user = await database.user.getUserByEmail(email).then(callback => callback);

              if(user == null){
                  log(`There is no account with that email (${email})`);
                  return false;
                }

                return await database.user.deleteUser(user.id).then(callback => {
                  log(`${email} has been deleted!`);
                  return callback;
                }).catch(function(err){
                  console.log(err);
                })

            } else {
              sendHelp(command);
            }


            /**
             * LISTING ITEMS
             */

          } else if (first_argument == "list") {
            if (args.length == 1) {
              let count = 1;  
              const callback = database.user.listUsers();
              if(callback == null || callback == undefined){
                console.log("There are no users in the datase yet.");
                return false;
              }

              database.user.listUsers().each((user, {close, pause, resume}) => {
                 console.log("> " + count);
                 console.log(`Name: ${user.name}`);
                 console.log(`Email: ${user.email}`);
                 console.log(`ID: ${user.id}`);
                 console.log(" ");
                 count++;
               }).catch(function(err){
                 console.log(err);
               });

            } else {
              sendHelp(command);
            }


            /**
             *  INFO OF CERTAIN DB-ENTRY
             */

          } else if (first_argument == "info") {
            if (args.length == 2) {
                let second_argument = args[1];
                  console.log(second_argument);

            } else {
              sendHelp(command);
            }
          }

          break;
        case "data":
          break;
      }
    } else {
      if(command == "clear"){
        console.clear();
        console.log("Cleared!");
      }
      sendHelp(command);
    }
  } 
}

function sendHelp(command) {
  switch (command.toLowerCase().trim()) {
    case "user":
      log("hurensohn");
      break;
    case "data":
      log("Hurehnsohn 2");
      break;
      default:
        "Fuck you!"
  }
}

function log(str) {
  console.log(`> ` + color.cyan(str));
}
