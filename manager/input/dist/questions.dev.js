"use strict";

var _this = void 0;

var readline = require("readline");

var chalk = require("chalk");

var languages = ["english", "german", "dutch", "chinese", "madarin", "japanese", "korean", "hindi", "arabic", "protuegese", "bengali", "russian", "lahnda", "javanese", "french", "turkish", "swedish", "danish", "finnish", "spanish"];
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
module.exports.user = {
  insertUser: function insertUser() {
    var user;
    return regeneratorRuntime.async(function insertUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {};
            _context.next = 3;
            return regeneratorRuntime.awrap(askQuestion('Please enter the email: ', true, ['@'], "all").then(function (callback) {
              return callback.toLowerCase();
            }));

          case 3:
            user.email = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(askQuestion('Please enter the name: ', false, undefined));

          case 6:
            user.name = _context.sent;
            return _context.abrupt("return", user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  removeUser: function removeUser() {
    return regeneratorRuntime.async(function removeUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(askQuestion("Please enter the email of the account you want to delete: ", true, ['@'], "all").then(function (callback) {
              return callback.toLowerCase();
            }));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
module.exports.quotes = {
  askForID: function askForID() {
    return regeneratorRuntime.async(function askForID$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(askQuestion("Please enter the ID of the Quote: ", false).then(function (callback) {
              return parseInt(callback.toLowerCase());
            }));

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  addQuote: function addQuote() {
    var Quote;
    return regeneratorRuntime.async(function addQuote$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            Quote = {}; // Asking for Quote

            _context4.next = 3;
            return regeneratorRuntime.awrap(askQuestion("Please enter the Quote: ", false));

          case 3:
            Quote.quote = _context4.sent;
            _context4.next = 6;
            return regeneratorRuntime.awrap(askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(function (callback) {
              return callback.toLowerCase();
            }));

          case 6:
            Quote.defaultLanguage = _context4.sent;
            _context4.next = 9;
            return regeneratorRuntime.awrap(_this.confirm(chalk.blueBright(">> Do you know any origin of the Quote? \n> Type y(es) to confirm. Other answers are declined! \n>> ")));

          case 9:
            if (!_context4.sent) {
              _context4.next = 15;
              break;
            }

            _context4.next = 12;
            return regeneratorRuntime.awrap(askQuestion("Enter the origin. Either in a Word or a Sentence! \n>> ", false).then(function (callback) {
              if (callback == false) {
                return [];
              }
            }));

          case 12:
            Quote.origin = _context4.sent;
            _context4.next = 16;
            break;

          case 15:
            Quote.origin = [];

          case 16:
            _context4.next = 18;
            return regeneratorRuntime.awrap(_this.confirm(chalk.blueBright(">> Do you have any categories for the Quote? \n> Type y(es) to confirm. Other answers are declined! \n>> ")));

          case 18:
            if (!_context4.sent) {
              _context4.next = 23;
              break;
            }

            _context4.next = 21;
            return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
              rl.question(chalk.blueBright(">> Enter categories just with a comma in between like: Inpiring, Funny \n>> "), function (input) {
                if (input && input.toString().toLowerCase().trim() != "") {
                  Quote.categories = input.toString().toLowerCase().replace(/, /g, "  ").replace(/,/g, "  ").trim().split("  ");
                  resolve();
                } else {
                  console.log(chalk.red(">> No categories found.. \n > Continueing"));
                  resolve();
                }
              });
            }));

          case 21:
            _context4.next = 24;
            break;

          case 23:
            Quote.categories = [];

          case 24:
            _context4.next = 26;
            return regeneratorRuntime.awrap(_this.confirm(chalk.blueBright(">> Do you know any context belonging to the Quote? \n> Type y(es) to confirm. Any other answer will be declined! \n>> ")));

          case 26:
            if (!_context4.sent) {
              _context4.next = 32;
              break;
            }

            _context4.next = 29;
            return regeneratorRuntime.awrap(askQuestion("Enter the Context. Either in a Word or a Sentence! \n>> ", false));

          case 29:
            Quote.context = _context4.sent;
            _context4.next = 33;
            break;

          case 32:
            Quote.context = [];

          case 33:
            _context4.next = 35;
            return regeneratorRuntime.awrap(_this.confirm(chalk.blueBright(">> Do you know the Author of the Quote? \n> Type y(es) to confirm. Any other answer will be declined. \n>> ")));

          case 35:
            if (!_context4.sent) {
              _context4.next = 39;
              break;
            }

            _context4.next = 38;
            return regeneratorRuntime.awrap(askQuestion(">> Enter the Autor`s full Name. \n>> ", false));

          case 38:
            Quote.author = _context4.sent;

          case 39:
            return _context4.abrupt("return", Quote);

          case 40:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  addTranslation: function addTranslation() {
    var translation;
    return regeneratorRuntime.async(function addTranslation$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            translation = {};
            _context5.next = 3;
            return regeneratorRuntime.awrap(askQuestion("Please enter the ID of the Quote, you want to update: ", false).then(function (callback) {
              return parseInt(callback.toLowerCase());
            }));

          case 3:
            translation.id = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(function (callback) {
              return callback.toLowerCase();
            }));

          case 6:
            translation.language = _context5.sent;
            _context5.next = 9;
            return regeneratorRuntime.awrap(askQuestion("Please enter the Quote-Translation: "));

          case 9:
            translation.quote = _context5.sent;
            return _context5.abrupt("return", translation);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  removeQuote: function removeQuote() {
    var id;
    return regeneratorRuntime.async(function removeQuote$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = undefined;
            _context6.next = 3;
            return regeneratorRuntime.awrap(askQuestion("Enter the ID of the Quote you want to delete: "));

          case 3:
            id = _context6.sent;
            _context6.next = 6;
            return regeneratorRuntime.awrap(_this.confirm(chalk.red(">> Are you sure you want to delete " + id + "?") + chalk.green("\n > Type y(es) to confirm. Any other anwer will be decilined.") + " \n> "));

          case 6:
            if (!_context6.sent) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", id);

          case 10:
            console.log(chalk.red(">> Mission aborted!") + " - " + chalk.green("".concat(id, " has been saved!")));
            return _context6.abrupt("return", false);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  removeTranslation: function removeTranslation() {
    var translation;
    return regeneratorRuntime.async(function removeTranslation$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            translation = {};
            _context7.next = 3;
            return regeneratorRuntime.awrap(askQuestion("Please enter the ID of the Quote: ", false));

          case 3:
            translation.id = _context7.sent;
            _context7.next = 6;
            return regeneratorRuntime.awrap(askQuestion("Please enter the default Language (in english, like: english, german, spanish, dutch): ", true, languages, "one").then(function (callback) {
              return callback.toLowerCase();
            }));

          case 6:
            translation.language = _context7.sent;
            _context7.next = 9;
            return regeneratorRuntime.awrap(_this.confirm(chalk.red(">> Are you sure you want to delete the " + translation.language + " Translation of " + translation.id + "?") + chalk.green("\n > Type y(es) to confirm. Any other anwer will be decilined.") + " \n> "));

          case 9:
            if (!_context7.sent) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt("return", translation);

          case 13:
            console.log(chalk.red(">> Mission aborted!") + " - " + chalk.green("".concat(id, " has been saved!")));
            return _context7.abrupt("return", false);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  update: function update() {
    var update;
    return regeneratorRuntime.async(function update$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            update = {};
            _context8.next = 3;
            return regeneratorRuntime.awrap(askQuestion('Please enter the ID of the Quote: ', false));

          case 3:
            update.id = _context8.sent;
            _context8.next = 6;
            return regeneratorRuntime.awrap(askQuestion('Please enter the type of your update: \n > 1. Quote (Translation)\n > 2. Author (Fullname)\n > 3. Properties (defaultLanguage, Categories, Origin, Context)', true, ['1', '2', '3'], "one").then(function (callback) {
              switch (callback.toLowerCase()) {
                case "1":
                  return "quote";

                case "2":
                  return "author";

                case "3":
                  return "properties";

                default:
                  return "cheater";
              }
            }));

          case 6:
            update.type = _context8.sent;

            if (!(update.type == "properties")) {
              _context8.next = 11;
              break;
            }

            _context8.next = 10;
            return regeneratorRuntime.awrap(askQuestion('You chose Properties, which propertie do you want to edit?\n > 1. defaultLanguage\n > 2. Categories\n > 3. Origin\n > 4. Context', true, ['1', '2', '3', '4'], "one").then(function (callback) {
              switch (callback.toLowerCase()) {
                case "1":
                  return "defaultlanguage";

                case "2":
                  return "categories";

                case "3":
                  return "origin";

                case "4":
                  return "context";
              }
            }));

          case 10:
            update.type = _context8.sent;

          case 11:
            if (!(update.type == "categories")) {
              _context8.next = 15;
              break;
            }

            _context8.next = 14;
            return regeneratorRuntime.awrap(askQuestion('You chose to Edit an Array. Do you want either:\n > 1. To edit all of them\n > 2. Just add\n > 3. Just Delete', true, ['1', '2', '3'], "one").then(function (callback) {
              switch (callback.toLowerCase()) {
                case "1":
                  return "all";

                case "2":
                  return "add";

                case "3":
                  return "remove";
              }
            }));

          case 14:
            update.edit = _context8.sent;

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    });
  }
};

module.exports.confirm = function _callee(question) {
  var sure;
  return regeneratorRuntime.async(function _callee$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          sure = false;
          _context9.next = 3;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            rl.question(question, function (callback) {
              if (callback.toString().toLowerCase().trim() === "yes" || callback.toString().toLowerCase().trim() === "y") {
                sure = true;
              }

              resolve();
            });
          }));

        case 3:
          return _context9.abrupt("return", sure);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};
/**
 * Checks for Characters that have to be in the input of the user.
 * @param {*} target 
 * @param {*} chars 
 */


function includeChars(target, chars, propertie) {
  var call = undefined;

  switch (propertie.toLowerCase()) {
    case "all":
    default:
      call = true;
      chars.forEach(function (callback, index) {
        if (!target.toLowerCase().includes(callback.toLowerCase())) {
          call = false;
        }
      });
      break;

    case "one":
      call = false;
      chars.forEach(function (callback, index) {
        if (target.toLowerCase().includes(callback.toLowerCase())) {
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


function askQuestion(question, repeat, includes, propertie) {
  return regeneratorRuntime.async(function askQuestion$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            rl.question(">> " + chalk.yellow(question), function _callee2(input) {
              return regeneratorRuntime.async(function _callee2$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      input = input.toString().replace(/  +/g, " ").trim();

                      if (!(input && input != '' && includes !== undefined && includes.length > 0 && propertie !== undefined ? includeChars(input, includes, propertie) : true)) {
                        _context10.next = 5;
                        break;
                      }

                      callback = input;
                      _context10.next = 10;
                      break;

                    case 5:
                      if (!(repeat !== undefined && repeat == true)) {
                        _context10.next = 9;
                        break;
                      }

                      console.log(chalk.red(' > Error with your input, please try again!'));
                      _context10.next = 9;
                      return regeneratorRuntime.awrap(askQuestion(question, repeat));

                    case 9:
                      callback = false;

                    case 10:
                      resolve();

                    case 11:
                    case "end":
                      return _context10.stop();
                  }
                }
              });
            });
          }));

        case 2:
          return _context11.abrupt("return", callback);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
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