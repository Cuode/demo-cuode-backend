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
const random = require('./random');

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

module.exports.init = async() => {
  
  if(!send){
    console.log(messages[0]);
    send = true;
  } 
  await new Promise((resolve, reject) => {
    rl.question("> ", async(input) => {
        
      //Splitting input into categories, to work with
      var raw = input.toString().toLowerCase().trim().split(" ");
      var command = raw[0];
      var args = [];
        for(i = 1; i  < raw.length; i++){
          args.push(raw[i]);
        }

      //Handling the input
      await InputCycle(command.toString().toLowerCase(), args);
      resolve();
    });  
  }).then(callback => {
    this.init();
  });
      
};

//Defines the commands
const commands = ["user", "data", "clear", "help"];

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
      if(command == "user"){
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
              
              console.log(" ");
              await callback.each((user, {close, pause, resume}) => {
                count++;
                console.log(color.cyanBright(">> ") + count);
                console.log(color.cyanBright("> >> Name: ") + user.name + ` (${user.email})`);
                console.log(color.cyanBright("> >> ID: ") + user.id);
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

      } else if(command == "data"){
          let first = args[0];
          if(first == "test"){
            const data = await questions.quotes.removeQuote();
            
            console.log(data);

          } else if(first == "quote"){
            if(args.length >= 2 && args.length <= 3){
              switch(args[1]){
               
              // EVERYTHING WITH ADD
               case "add":
                 if(args.length != 2) sendHelp(command);

                  console.log(color.blue('> Adding new Quote to the Database!'));
                  const newquote = await questions.quotes.addQuote();
                  const properties = database.quotes.quoteProperties(newquote.defaultLanguage, newquote.categories, newquote.origin, newquote.context);
                  const defaultTranslation = database.quotes.quoteTranslation(newquote.defaultLanguage, newquote.quote);
                  const Quote = database.quotes.Quote(random.toHash(defaultTranslation[Object.keys(defaultTranslation)]), newquote.author, properties, defaultTranslation);

                  if(await database.quotes.getQuoteByID(Quote.id).then(callback => {
                    if(callback != null){
                      console.log(color.red('> An Quote with the same ID already Exists! \n') + color.yellow('> Please check of they are the same: '));
                      console.log(color.cyan('> ID: ') + callback.id);
                      console.log(color.cyan('> Quote: ') + callback.translations[callback.properties.defaultLanguage]);
                      console.log(color.green('> If they are not the same, please contact an Admin!'));
                      return true;
                    } else {
                      return false;
                    }
                  })){
                    return false;
                  }

                  await database.quotes.addQuote(Quote).then(callback => {
                    console.log(color.cyanBright(`> The entry ${callback.id} has been added.`));
                    console.log(color.cyan(`>> Quote: `) + callback.translations[callback.properties.defaultLanguage]);
                    console.log(color.cyan(`>> Author: `) + callback.author);
                  });
                  break;

                case "addtrans":
                  if(args.length != 2) sendHelp(command);

                  console.log(color.blue("> Adding new Language to a existing Quote!"));
                  const newTranslation = await questions.quotes.addTranslation();

                  if(await database.quotes.getQuoteByID(newTranslation.id).then(callback => callback == null)){
                    console.log('> No Quote with that ID could be found!');
                    return false;
                  }


                   await database.quotes.addLanguage(newTranslation.id, database.quotes.quoteTranslation(newTranslation.language, newTranslation.quote)).then(callback => { 
                     console.log(color.cyanBright("> ID: ") + callback.id);
                     console.log(color.cyanBright('> Quote in ' + newTranslation.language + ': ') + newTranslation.quote);
                     console.log(color.cyanBright('> The Translation ') + newTranslation.language + color.cyanBright(" has successfully been added!"));
                  });
                
                  break;

                  //EVERYTHING WITH REMOVE
                  case "remove":
                      if(args.length != 2) sendHelp(command);

                      let id = await questions.quotes.removeQuote();
                      if(await database.quotes.getQuoteByID(id) == null){
                        console.log(color.red("> There is no Entry with the ID: ") + id);
                        return false;
                      }
                      await database.quotes.deleteQuote(id).then((callback) => {
                          console.log(color.green('> The Entry with the ID ' + color.white(id) + " has been successfully deleted!"));
                      }).catch(function(err){
                        console.log(err);
                      });
                  break;

                case "remtrans": {
                      if(args.length != 2) sendHelp(command);
                      
                      const removeTranslation = await questions.quotes.removeTranslation();
                      const quote = await database.quotes.getQuoteByID(removeTranslation.id);

                      if(quote == null){
                        console.log(color.red('> There is no Quote with this ID!'));
                      }

                      const translations = await database.quotes.getLanguages(removeTranslation.id);

                      if(!translations.includes(removeTranslation.language)){
                        console.log(color.red('> This Quote does not have this Translation (' + removeTranslation.language + ')'))
                        return false;
                      }

                      await database.quotes.removeLanguage(removeTranslation.id, removeTranslation.language).then(callback => {
                        console.log(color.green('> The Translation (' + removeTranslation.language + ") has successfully been removed from " + removeTranslation.id + ' (' + quote.translations[quote.properties.defaultLanguage] + ")"));
                      })
                    }
                  break;

                  //EVERYTHING WITH LIST
                  case "list":
                    let count = 0;
                    const quote = await database.quotes.getQuotes(200);
                    for(i = 0; i < quote.length; i++){
                      count++;

                      console.log(" ");
                      console.log(color.cyanBright("> ") + count + color.cyanBright(" - ID: ") + quote[i].id);
                      console.log(color.cyanBright(">> Quote: ") + quote[i].translations[quote[i].properties.defaultLanguage] + color.cyanBright(" | Author: ") + 
                        quote[i].author + color.cyanBright(" | Translations: ") + 
                        (Object.keys(quote[i].translations).length < 5 ? Object.keys(quote[i].translations).join(', ') : Object.keys(quote[i].translations).length));
                      //console.log(color.cyanBright(">> Author: ") + (quote[i].author != null ? quote[i].author : "Unkown"));
                      //console.log(color.cyanBright('>> Categories: ') + (quote[i].properties.categories.length > 0 ? quote[i].properties.categories.join(', ').toUpperCase() : []));
                      //console.log(color.cyanBright(">> Default Language: ") + quote[i].properties.defaultLanguage);
                      //console.log(color.cyanBright(">> Translations: ") + Object.keys(quote[i].translations).join(', '));
                    };
                    console.log(color.green("\n> There are currently " + count + " Quotes in your Database!"));
                    break;

                  case "info": {
                    if(args.length != 2) sendHelp(command);

                    let id = await questions.quotes.askForID();
                    const quote = await database.quotes.getQuoteByID(id).then(callback => callback);

                    if(quote == null){
                      console.log(color.red("> There is no Quote with the ID: ") + id);
                      return false;
                    }
                    console.log(" ");
                    console.log(color.cyanBright("> ID: ") + quote.id);
                    console.log(color.cyanBright(">> Quote: ") + quote.translations[quote.properties.defaultLanguage]);
                    console.log(color.cyanBright(">> Author: ") + (quote.author != null ? quote.author : "Unkown"));
                    console.log(color.cyanBright('>> Categories: ') + (quote.properties.categories.length > 0 ? quote.properties.categories.join(', ').toUpperCase() : []));
                    console.log(color.cyanBright(">> Default Language: ") + quote.properties.defaultLanguage);
                    console.log(color.cyanBright(">> Translations: ") + Object.keys(quote.translations).join(', '));
                    Object.keys(quote.translations).forEach(callback => {
                        if(callback != quote.properties.defaultLanguage){
                          console.log(color.green(' > ' + callback + ": ") + quote.translations[callback]);
                        }
                    })
                    console.log(" ");
                    break;
                  }

                  case "update":
                    if(args.length != 2) sendHelp(command);
                    
                    let update = await questions.quotes.update();

                    break;
                  default:
                    sendHelp(command);
                }
              } else {
                sendHelp(command);
              }
          } else {
            sendHelp(command);
          }

      } else if(command == "help"){
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
      console.log(color.yellow(">> Data: add/remove/list/ quote/first/last/sentence [addLanguage/removeLanguage"));
      return true;
      default:
        console.log(color.yellow(">> User: add/remove/list/[-info] [--email/--id]"));
        console.log(color.yellow(">> Data: add/remove/list/info quote/first/last/sentence"));
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
