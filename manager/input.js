/**
 * This is a demo Project to prepare for the real Cuode project!
 * Author: remadisson
 * Created in, at: Bocholt, Germany - Mon, 20.07.2020
 */

/**
 * IMPORTS
 */

const color = require("chalk");
const database = require("./db");
const questions = require("./input/questions");
const readline = require('readline');

const messages = [
  color.blueBright(`> Use 'help' to get Information for usage.`),
];

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout
});

/**
 * Initiates the Input for the Console.
 */

let send = false;

module.exports.init = function() {
  if(!send){
    console.log(messages[0]);
    send = true;
  } 
     rl.question("> ", async(input) => {
        
          //Splitting input into categories, to work with
          var raw = input.toString().toLowerCase().trim().split(" ");
          var command = raw[0];
          var args = [];
            for(i = 1; i  < raw.length; i++){
              args.push(raw[i]);
            }

          //Checking for empty object to prevent errors
          if(args == undefined || args == null){
            args = [];
          }

          //Handling the input
          await InputCycle(command.toString().toLowerCase(), args).then((callback) => {
            this.init()
          });
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
  
  // Checking if command is available
  if(commands.includes(command.toString().toLowerCase().trim())){
    
    //Checking for args.length
    if(args.length == 0){
      
      //Checking if commmand equals to "clear"
      if(command == "clear"){
        
        //Clearing console
        console.clear();
        
        //Sending help message
        console.log(messages[0]);
      
      } else {
        // If args == 0 && command != "clear" but in the array, it should send help message
        sendHelp(command);
      }

      //Checking for arguments length
    } else if(args.length > 0 && args.length <= 4){
      let first = args[0];
      
      if(first == "add"){
          if(args.length == 1){
            console.log(color.blue("> Adding new User to Database, please follow instructions:"));            
            const newuser = await questions.user.insertUser();

            if(await database.user.getUserByEmail(newuser.email).then(callback => callback != null)){
                console.log(color.red("> This Email-Address is already in use! (" + newuser.email + ")"));
                return false;
            } 
  
            await database.user.addUser(database.user.User(newuser.name, newuser.email)).then(callback => {
                console.log(color.green(`> ${callback.name} is now part of the Database!`));
                console.log(color.cyan(">> Email: ") + callback.email);
                console.log(color.cyan(">> ID: ") + callback.id);
                console.log(" ");
            });

          } else {
            sendHelp(command);
          }


        } else if(first == "remove"){
              if(args.length == 1){
                const email = await questions.user.removeUser();
                const user = await database.user.getUserByEmail(email);

                if(user == null){
                  console.log(color.red(`> This Email-Address (${email}) is not linked to an account!`));
                  return false;
                }

                await database.user.deleteUser(user.id).then(callback => {
                  console.log(color.yellow(`> ${user.name} has been deleted!`));
                  console.log(color.green(`> ${user.email} is now available!`));
                }).catch(function(err){
                  console.log(err);
                })

              } else {
                sendHelp(command);
              }


        } else if(first == "list"){
            if(args.length == 1){
              let count = 0;
              const callback = database.user.listUsers();

              if(callback == null || callback == undefined){
                console.log("Currently there are no users.");
                return false;
              }
              
              console.log(" ");
              await callback.each((user, {close, pause, resume}) => {
                count++;
                console.log(color.cyanBright(">> " + count));
                console.log(color.cyanBright("> >> Name: " + user.name + ` (${user.email})`));
                console.log(color.cyanBright("> >> ID: " + user.id));
                console.log(" ");
                
              }).catch(function(err){
                console.log(err);
              }).then(() => {
                console.log(color.green(">> There are " + count + " Members in your database!"));
              });

            } else {
              sendHelp(command);
            }

        } else if(first == "-info"){
          if(args.length == 3){
              let two = args[1];
              if(two == "--id"){
                
                  let id = args[2];
                  const user = await database.user.getUserByID(id);
                  printUser(user);

                } else if(two == "--email"){
                  
                  let email = args[2];
                  let user = await database.user.getUserByEmail(email);
                  printUser(user);

                } else {
                  sendHelp(command);
                }

              } else if(args.length == 4){
                let two = args[1];
                let three = args[2];
                  if(two == "--id" && three == "--auth"){
                    
                    let id = args[3];
                    const user = await database.user.getUserByID(id);
                    printUserAuth(user);

                  } else if(two == "--email" && three == "--auth"){
                    
                    let email = args[3];
                    let user = await database.user.getUserByEmail(email);
                    printUserAuth(user);
                    
                  } else {
                    sendHelp(command);
                  }

            } else {
              sendHelp(command);
            }
        } else {
          sendHelp(command);
        }


    } else {
      
      //Send help as backup
      sendHelp(command);
    }

  } else {
    
    //Sending 'help' message in case the command is not in the array
    console.log(messages[0]);

  }

  return true;
}

function sendHelp(command) {
  console.log(color.yellow("> Help: "))
  switch (command.toLowerCase().trim()) {
    case "user":
      console.log(color.yellow(">> User: add/remove/list/[-info] [--email/--id]"));
      return true;
    case "data":
      console.log("Hurehnsohn 2");
      return true;
      default:
        console.log("Fuck you!");
        return true;
  }
}

function printUser(user){
                  console.log(" ");
                  console.log(color.cyan("> Info of: ") + user.name);
                  console.log(color.green(">> CreatedAt: ") + user.createdAt);
                  console.log(color.green(">> ID: ") + user.id);
                  console.log(color.green(">> Email: ") + user.email);
                  console.log(color.cyan("> Processed: "));
                  console.log(
                    color.green(">> Quotes: ") +
                      (user.processed.quotes.length > 0
                        ? user.processed.quotes
                        : "[]")
                  );
                  console.log(
                    color.green(">> Sentences: ") +
                      (user.processed.sentences.length > 0
                        ? user.processed.sentences
                        : "[]")
                  );
                  console.log(
                    color.green(">> FirstNames: ") +
                      (user.processed.firstnames.length > 0
                        ? user.processed.firstnames
                        : "[]")
                  );
                  console.log(
                    color.green(">> LastNames: ") +
                      (user.processed.lastnames.length > 0
                        ? user.processed.lastnames
                        : "[]")
                  );
                  console.log(" ");

}

function printUserAuth(user){
  console.log(" ");
  console.log(color.cyan("> Info of: ") + user.name);
  console.log(color.green(">> Auth: ") + user.authentication);
  console.log(color.green(">> CreatedAt: ") + user.createdAt);
  console.log(color.green(">> ID: ") + user.id);
  console.log(color.green(">> Email: ") + user.email);
  console.log(" ");
}
