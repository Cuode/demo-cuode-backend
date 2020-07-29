const readline = require("readline");
const chalk = require("chalk");
const inputclass = require('../input');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});


module.exports.user = {
  insertUser: async () => {
    let user = {};
    await new Promise((resolve, reject) => {
      rl.question(chalk.yellow(">> Please enter the email: "), (callback) => {
            user.email = callback;
            resolve();
      });
    });

    await new Promise((resolve, reject) => {
      rl.question(chalk.yellow(">> Please enter the name: "), (callback) => {
        user.name = callback;
        resolve();
      });
    });

    return user;
  },

  removeUser: async () => {
    let email = undefined;

    await new Promise((resolve, reject) => {
      rl.question(
        chalk.yellow(
          ">> Please enter the email of the account you want to delete: "
        ),
        (callback) => {
          email = callback;
          resolve();
        }
      );
    });

    return email;
  },
};

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

module.exports.quotes = {
    askForID: async() => {
        let id = undefined;

        await new Promise((resolve, reject) => {
            rl.question(chalk.blue('> Please enter the ID of the Quote: '), input => {
                input = input.toString().toLowerCase().trim();
                
                if(input && input != ''){
                    id = input;
                }

                resolve();
            })
        });

        return id;
    },
  
   addQuote: async () => {
    let Quote = {};

    // Asking for Quote
    await new Promise((resolve, reject) => {
      rl.question(chalk.blueBright(">> Please enter the Quote: "), (input) => {
        if (input && input.toString().toLowerCase().trim() != "") {
          Quote.quote = input.toString().trim();
          resolve();
        } else {
          Quote = false;
          rejcet();
        }
      });
    });

    // Asking for the Language
    const language = async () =>
      await new Promise((resolve, reject) => {
        rl.question(
          chalk.blueBright(
            ">> Please enter the default Language (in english, like: english, german, spanish, dutch): "
          ),
          async (input) => {
            if (
              input &&
              input.toString().toLowerCase().trim() != "" &&
              languages.includes(input.toString().toLowerCase().trim())
            ) {
              Quote.defaultLanguage = input.toString().toLowerCase().trim();
              resolve();
            } else {
              console.log(
                chalk.red(
                  ">> ERROR << - There went something wrong with your input, please try again!"
                )
              );
              await language();
              resolve();
            }
          }
        );
      });

    await language();

    // Asking for origin

    if (
      await this.confirm(
        chalk.blueBright(
          ">> Do you know any origin of the Quote? \n> Type y(es) to confirm. Other answers are declined! \n>> "
        )
      )
    ) {
      await new Promise((resolve, reject) => {
        rl.question(
          chalk.blueBright(
            ">> Enter the origin. Either in a Word or a Sentence! \n>> "
          ),
          (input) => {
            if (input && input.toString().toLowerCase().trim() != "") {
              Quote.origin = input
                .toString()
                .toLowerCase()
                .replace(/  +/g, " ")
                .trim();
              resolve();
            } else {
              console.log(chalk.red(">> No Origin found.. \n > Continueing"));
              resolve();
            }
          }
        );
      });
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
      await new Promise((resolve, reject) => {
        rl.question(
          chalk.blueBright(
            ">> Enter the Context. Either in a Word or a Sentence! \n>> "
          ),
          (input) => {
            if (input && input.toString().toLowerCase().trim() != "") {
              Quote.context = input.toString().replace(/  +/g, " ").trim();
              resolve();
            } else {
              console.log(chalk.red(">> No Context found.. \n > Continueing"));
              resolve();
            }
          }
        );
      });
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
      await new Promise((resolve, reject) => {
        rl.question(
          chalk.blueBright(">> Enter the Autor`s full Name. \n>> "),
          (input) => {
            if (input && input.toString().toLowerCase().trim() != "") {
              Quote.author = input.replace(/  +/g, " ").toString().trim();
              resolve();
            } else {
              console.log(chalk.red(">> No Author found.. \n > Continueing"));
              resolve();
            }
          }
        );
      });
    }

    return Quote;
  },


  addTranslation: async() => {
    let translation = {};

        await new Promise((resolve, reject) => {
            rl.question(chalk.yellow('> Please enter the ID of the Quote, you want to update: '), input => {
                if(input && input.toString().toLowerCase().trim() != ''){
                    translation.id = parseInt(input);
                } else {
                    translation = false;
                }
                resolve();
            });
        });

        const language = async() => await new Promise((resolve, reject) =>{
            rl.question(chalk.yellow('> Please enter the Language from the Translation: '), async(input) => {
                if(input && input.toString().toLowerCase().trim() != '' && languages.includes(input.toString().toLowerCase().trim())){
                    translation.language = input.toString().toLowerCase();
                    resolve();
                } else {
                    console.log(chalk.red(">> ERROR << - There happend an Error with your input!"));
                    await language();
                    resolve();
                }
                
            });
        });
        await language();

        await new Promise((resolve, reject) => {
            rl.question(chalk.yellow('> Please enter the Quote-Translation: '), input => {
                if(input && input.toString().toLowerCase().trim() != ''){
                    translation.quote = input;
                } else {
                    translation = false;
                }

                resolve();
            });
        })

        return translation;
  },

  removeQuote: async () => {
    let id = undefined;

    await new Promise((resolve, reject) => {
      rl.question(
        chalk.blueBright(">> Enter the ID of the Quote you want to delete: "),
        (input) => {
          if (input && input.toString().toLowerCase().trim() != "") {
            id = parseInt(input);
            resolve();
          } else {
            reject();
          }
        }
      );
    });

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

        await new Promise((resolve, reject) => {
            rl.question(chalk.yellow('> Please enter the ID of the Quote: '), input => {
                if(input && input.toString().toLowerCase().trim() != ''){
                    translation.id = input.toString().toLowerCase().trim();
                } else {
                    translation = false;
                }
                resolve();
            });
        });

        const language = async() => await new Promise((resolve, reject) =>{
            rl.question(chalk.yellow('> Please enter the Language from the Translation: '), async(input) => {
                if(input && input.toString().toLowerCase().trim() != '' && languages.includes(input.toString().toLowerCase().trim())){
                    translation.language = input.toString().toLowerCase();
                    resolve();
                } else {
                    console.log(chalk.red(">> ERROR << - There happend an Error with your input!"));
                    await language();
                    resolve();
                }
                
            });
        });
        await language();

        return translation;
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
