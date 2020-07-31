const readline = require("readline");
const chalk = require("chalk");

const languages = [
  "english",
  "german",
  "dutch",
  "chinese",
  "madarin",
  "japanese",
  "korean",
  "hindi",
  "arabic",
  "protuegese",
  "bengali",
  "russian",
  "lahnda",
  "javanese",
  "french",
  "turkish",
  "swedish",
  "danish",
  "finnish",
  "spanish"
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});


module.exports.user = {
  insertUser: async () => {
    let user = {};

    user.email = await askQuestion('Please enter the email: ', true, ['@'], "all").then(callback => callback.toLowerCase());
    user.name = await askQuestion('Please enter the name: ', false, undefined);

    return user;
  },

  removeUser: async () => {
    return await askQuestion("Please enter the email of the account you want to delete: ", true, ['@'], "all").then(callback => callback.toLowerCase());
  },
};


module.exports.quotes = {
    askForID: async() => {
        return await askQuestion("Please enter the ID of the Quote: ", false).then(callback => parseInt(callback.toLowerCase()));
    },
  
   addQuote: async () => {
    let Quote = {};

    // Asking for Quote
      Quote.quote = await askQuestion("Please enter the Quote: ", false);

    // Asking for the Language

      Quote.defaultLanguage = await askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(callback => callback.toLowerCase());

    // Asking for origin

    if (await this.confirm(chalk.blueBright(
          ">> Do you know any origin of the Quote? \n> Type y(es) to confirm. Other answers are declined! \n>> "
        )
      )
    ) {
      Quote.origin = await askQuestion("Enter the origin. Either in a Word or a Sentence! \n>> ", false).then(callback => { if(callback == false){ return []} });
    } else {
      Quote.origin = [];
    }

    // Asking for Categories
    if (
      await this.confirm(
        chalk.blueBright(
          ">> Do you have any categories for the Quote? \n> Type y(es) to confirm. Other answers are declined! \n>> "
        )
      )
    ) {
      await new Promise((resolve, reject) => {
        rl.question(
          chalk.blueBright(
            ">> Enter categories just with a comma in between like: Inpiring, Funny \n>> "
          ),
          (input) => {
            if (input && input.toString().toLowerCase().trim() != "") {
              Quote.categories = input
                .toString()
                .toLowerCase()
                .replace(/, /g, "  ")
                .replace(/,/g, "  ")
                .trim()
                .split("  ");
              resolve();
            } else {
              console.log(
                chalk.red(">> No categories found.. \n > Continueing")
              );
              resolve();
            }
          }
        );
      });
    } else {
      Quote.categories = [];
    }

    // Asking for Context

    if (
      await this.confirm(
        chalk.blueBright(
          ">> Do you know any context belonging to the Quote? \n> Type y(es) to confirm. Any other answer will be declined! \n>> "
        )
      )
    ) {
      Quote.context = await askQuestion("Enter the Context. Either in a Word or a Sentence! \n>> ", false);
    } else {
      Quote.context = [];
    }

    //Asking for Author
    if (
      await this.confirm(
        chalk.blueBright(
          ">> Do you know the Author of the Quote? \n> Type y(es) to confirm. Any other answer will be declined. \n>> "
        )
      )
    ) {
      Quote.author = await askQuestion(">> Enter the Autor`s full Name. \n>> ", false);
    }

    return Quote;
  },


  addTranslation: async() => {
    let translation = {};

        translation.id = await askQuestion("Please enter the ID of the Quote, you want to update: ", false).then(callback => parseInt(callback.toLowerCase()));

        translation.language = await askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(callback => callback.toLowerCase());

        translation.quote = await askQuestion("Please enter the Quote-Translation: ");

        return translation;
  },

  removeQuote: async () => {
    let id = undefined;

    id = await askQuestion("Enter the ID of the Quote you want to delete: ");

    if (
      await this.confirm(
        chalk.red(">> Are you sure you want to delete " + id + "?") +
          chalk.green(
            "\n > Type y(es) to confirm. Any other anwer will be decilined."
          ) +
          " \n> "
      )
    ) {
      return id;
    } else {
      console.log(
        chalk.red(">> Mission aborted!") +
          " - " +
          chalk.green(`${id} has been saved!`)
      );
      return false;
    }
  },

  removeTranslation: async() =>{
    let translation = {};

        translation.id = await askQuestion("Please enter the ID of the Quote: ", false);
        translation.language = await askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(callback => callback.toLowerCase());

        if (
          await this.confirm(
            chalk.red(">> Are you sure you want to delete the " + translation.language + " Translation of " + translation.id + "?") +
              chalk.green(
                "\n > Type y(es) to confirm. Any other anwer will be decilined."
              ) +
              " \n> "
          )
        ) {
          return translation;
        } else {
          console.log(
            chalk.red(">> Mission aborted!") +
              " - " +
              chalk.green(`${id} has been saved!`)
          );
          return false;
        }
  },
};

module.exports.confirm = async (question) => {
  let sure = false;
  await new Promise((resolve, reject) => {
    rl.question(question, (callback) => {
      if (
        callback.toString().toLowerCase().trim() === "yes" ||
        callback.toString().toLowerCase().trim() === "y"
      ) {
        sure = true;
      }
      resolve();
    });
  });

  return sure;
};



/**
 * Checks for Characters that have to be in the input of the user.
 * @param {*} target 
 * @param {*} chars 
 */
function includeChars(target, chars, propertie){
  let call = undefined;
  switch(propertie.toLowerCase()){  
    
    case "all":
    default:

    call = true;

    chars.forEach((callback, index) => {
      if(!target.toLowerCase().includes(callback.toLowerCase())){
        call = false;
      }
    });
    break;
    

    case "one":

    call = false;

      chars.forEach((callback, index) => {
        if(target.toLowerCase().includes(callback.toLowerCase())){
          call = true;
        }
      });

    break;
  }
    return call;
}

/**
 * Asks the question and returns the Input.
 * @param {*} question 
 * @param {*} repeat 
 * @param {*} includes 
 */
async function askQuestion(question, repeat, includes, propertie){
  await new Promise((resolve, reject) => {
    rl.question(">> " + chalk.yellow(question), async(input) => {
      input = input.toString().replace(/  +/g, " ").trim();
      if(input && input != '' && (includes !== undefined && includes.length > 0 && propertie !== undefined) ? (includeChars(input, includes, propertie)) : true){
        callback = input;
      } else {
        if(repeat !== undefined && repeat == true){
          console.log(chalk.red(' > Error with your input, please try again!'));
          await askQuestion(question, repeat);
        }
        callback = false;
      }

      resolve();

    })
  });
  return callback;
}


/**
 * HOW THE FUCK DO I CANCEL SOMETHING LIKE THIS?! (See entire class lul);
 * @param {String} input 
 */

// module.exports.cancel = async(input) =>{
//     input = input.toString().toLowerCase().trim();
//     if(input === "!c" || input === "!cancel"){
//         inputclass.init();
//         return true;
//     }

//     return false;
// }
