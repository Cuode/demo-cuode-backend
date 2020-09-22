"use strict";

var _this = void 0;

/**
 * This is a demo Project to prepare for the real Cuode project!
 * Author: remadisson
 * Created in, at: Bocholt, Germany - Mon, 20.07.2020
 */

/**
 * IMPORTS
 */
var color = require("chalk");

var database = require("./db");

var questions = require("./input/questions");

var readline = require('readline');

var random = require('./random');

var messages = [color.blueBright("> Use 'help' to get Information for usage.")];
var rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout
});
/**
 * Initiates the Input for the Console.
 */

var send = false;

module.exports.init = function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!send) {
            console.log(messages[0]);
            send = true;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            rl.question("> ", function _callee(input) {
              var raw, command, args;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      //Splitting input into categories, to work with
                      raw = input.toString().toLowerCase().trim().split(" ");
                      command = raw[0];
                      args = [];

                      for (i = 1; i < raw.length; i++) {
                        args.push(raw[i]);
                      } //Handling the input


                      _context.next = 6;
                      return regeneratorRuntime.awrap(InputCycle(command.toString().toLowerCase(), args));

                    case 6:
                      resolve();

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }).then(function (callback) {
            _this.init();
          }));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //Defines the commands


var commands = ["user", "data", "clear", "help"];
/**
 * Handles the Input, to perform certain actions.
 * @param {*} command
 * @param {*} args
 */

function InputCycle(command, args) {
  var first, newuser, email, user, count, callback, two, id, _user, _email, _user2, _two, three, _id, _user3, _email2, _user4, _first, data, newquote, properties, defaultTranslation, Quote, newTranslation, _id2, removeTranslation, _quote, translations, _count, quote, _id3, _quote2, update;

  return regeneratorRuntime.async(function InputCycle$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!commands.includes(command.toString().toLowerCase().trim())) {
            _context3.next = 226;
            break;
          }

          if (!(args.length == 0)) {
            _context3.next = 5;
            break;
          }

          //Checking if commmand equals to "clear"
          if (command == "clear") {
            //Clearing console
            console.clear(); //Sending help message

            console.log(messages[0]);
          } else {
            // If args == 0 && command != "clear" but in the array, it should send help message
            sendHelp(command);
          } //Checking for arguments length


          _context3.next = 224;
          break;

        case 5:
          if (!(args.length > 0 && args.length <= 4)) {
            _context3.next = 223;
            break;
          }

          if (!(command == "user")) {
            _context3.next = 106;
            break;
          }

          first = args[0];

          if (!(first == "add")) {
            _context3.next = 26;
            break;
          }

          if (!(args.length == 1)) {
            _context3.next = 23;
            break;
          }

          console.log(color.blue("> Adding new User to Database, please follow instructions:"));
          _context3.next = 13;
          return regeneratorRuntime.awrap(questions.user.insertUser());

        case 13:
          newuser = _context3.sent;
          _context3.next = 16;
          return regeneratorRuntime.awrap(database.user.getUserByEmail(newuser.email).then(function (callback) {
            return callback != null;
          }));

        case 16:
          if (!_context3.sent) {
            _context3.next = 19;
            break;
          }

          console.log(color.red("> This Email-Address is already in use! (" + newuser.email + ")"));
          return _context3.abrupt("return", false);

        case 19:
          _context3.next = 21;
          return regeneratorRuntime.awrap(database.user.addUser(database.user.User(newuser.name, newuser.email)).then(function (callback) {
            console.log(color.green("> ".concat(callback.name, " is now part of the Database!")));
            console.log(color.cyan(">> Email: ") + callback.email);
            console.log(color.cyan(">> ID: ") + callback.id);
            console.log(" ");
          }));

        case 21:
          _context3.next = 24;
          break;

        case 23:
          sendHelp(command);

        case 24:
          _context3.next = 104;
          break;

        case 26:
          if (!(first == "remove")) {
            _context3.next = 44;
            break;
          }

          if (!(args.length == 1)) {
            _context3.next = 41;
            break;
          }

          _context3.next = 30;
          return regeneratorRuntime.awrap(questions.user.removeUser());

        case 30:
          email = _context3.sent;
          _context3.next = 33;
          return regeneratorRuntime.awrap(database.user.getUserByEmail(email));

        case 33:
          user = _context3.sent;

          if (!(user == null)) {
            _context3.next = 37;
            break;
          }

          console.log(color.red("> This Email-Address (".concat(email, ") is not linked to an account!")));
          return _context3.abrupt("return", false);

        case 37:
          _context3.next = 39;
          return regeneratorRuntime.awrap(database.user.deleteUser(user.id).then(function (callback) {
            console.log(color.yellow("> ".concat(user.name, " has been deleted!")));
            console.log(color.green("> ".concat(user.email, " is now available!")));
          })["catch"](function (err) {
            console.log(err);
          }));

        case 39:
          _context3.next = 42;
          break;

        case 41:
          sendHelp(command);

        case 42:
          _context3.next = 104;
          break;

        case 44:
          if (!(first == "list")) {
            _context3.next = 56;
            break;
          }

          if (!(args.length == 1)) {
            _context3.next = 53;
            break;
          }

          count = 0;
          callback = database.user.listUsers();
          console.log(" ");
          _context3.next = 51;
          return regeneratorRuntime.awrap(callback.each(function (user, _ref) {
            var close = _ref.close,
                pause = _ref.pause,
                resume = _ref.resume;
            count++;
            console.log(color.cyanBright(">> ") + count);
            console.log(color.cyanBright("> >> Name: ") + user.name + " (".concat(user.email, ")"));
            console.log(color.cyanBright("> >> ID: ") + user.id);
            console.log(" ");
          })["catch"](function (err) {
            console.log(err);
          }).then(function () {
            console.log(color.green(">> There are " + count + " Members in your database!"));
          }));

        case 51:
          _context3.next = 54;
          break;

        case 53:
          sendHelp(command);

        case 54:
          _context3.next = 104;
          break;

        case 56:
          if (!(first == "-info")) {
            _context3.next = 103;
            break;
          }

          if (!(args.length == 3)) {
            _context3.next = 78;
            break;
          }

          two = args[1];

          if (!(two == "--id")) {
            _context3.next = 67;
            break;
          }

          id = args[2];
          _context3.next = 63;
          return regeneratorRuntime.awrap(database.user.getUserByID(id));

        case 63:
          _user = _context3.sent;
          printUser(_user);
          _context3.next = 76;
          break;

        case 67:
          if (!(two == "--email")) {
            _context3.next = 75;
            break;
          }

          _email = args[2];
          _context3.next = 71;
          return regeneratorRuntime.awrap(database.user.getUserByEmail(_email));

        case 71:
          _user2 = _context3.sent;
          printUser(_user2);
          _context3.next = 76;
          break;

        case 75:
          sendHelp(command);

        case 76:
          _context3.next = 101;
          break;

        case 78:
          if (!(args.length == 4)) {
            _context3.next = 100;
            break;
          }

          _two = args[1];
          three = args[2];

          if (!(_two == "--id" && three == "--auth")) {
            _context3.next = 89;
            break;
          }

          _id = args[3];
          _context3.next = 85;
          return regeneratorRuntime.awrap(database.user.getUserByID(_id));

        case 85:
          _user3 = _context3.sent;
          printUserAuth(_user3);
          _context3.next = 98;
          break;

        case 89:
          if (!(_two == "--email" && three == "--auth")) {
            _context3.next = 97;
            break;
          }

          _email2 = args[3];
          _context3.next = 93;
          return regeneratorRuntime.awrap(database.user.getUserByEmail(_email2));

        case 93:
          _user4 = _context3.sent;
          printUserAuth(_user4);
          _context3.next = 98;
          break;

        case 97:
          sendHelp(command);

        case 98:
          _context3.next = 101;
          break;

        case 100:
          sendHelp(command);

        case 101:
          _context3.next = 104;
          break;

        case 103:
          sendHelp(command);

        case 104:
          _context3.next = 221;
          break;

        case 106:
          if (!(command == "data")) {
            _context3.next = 220;
            break;
          }

          _first = args[0];

          if (!(_first == "test")) {
            _context3.next = 115;
            break;
          }

          _context3.next = 111;
          return regeneratorRuntime.awrap(questions.quotes.removeQuote());

        case 111:
          data = _context3.sent;
          console.log(data);
          _context3.next = 218;
          break;

        case 115:
          if (!(_first == "quote")) {
            _context3.next = 217;
            break;
          }

          if (!(args.length >= 2 && args.length <= 3)) {
            _context3.next = 214;
            break;
          }

          _context3.t0 = args[1];
          _context3.next = _context3.t0 === "add" ? 120 : _context3.t0 === "addtrans" ? 135 : _context3.t0 === "remove" ? 148 : _context3.t0 === "remtrans" ? 161 : _context3.t0 === "list" ? 178 : _context3.t0 === "info" ? 186 : _context3.t0 === "update" ? 206 : 211;
          break;

        case 120:
          if (args.length != 2) sendHelp(command);
          console.log(color.blue('> Adding new Quote to the Database!'));
          _context3.next = 124;
          return regeneratorRuntime.awrap(questions.quotes.addQuote());

        case 124:
          newquote = _context3.sent;
          properties = database.quotes.quoteProperties(newquote.defaultLanguage, newquote.categories, newquote.origin, newquote.context);
          defaultTranslation = database.quotes.quoteTranslation(newquote.defaultLanguage, newquote.quote);
          Quote = database.quotes.Quote(random.toHash(defaultTranslation[Object.keys(defaultTranslation)]), newquote.author, properties, defaultTranslation);
          _context3.next = 130;
          return regeneratorRuntime.awrap(database.quotes.getQuoteByID(Quote.id).then(function (callback) {
            if (callback != null) {
              console.log(color.red('> An Quote with the same ID already Exists! \n') + color.yellow('> Please check of they are the same: '));
              console.log(color.cyan('> ID: ') + callback.id);
              console.log(color.cyan('> Quote: ') + callback.translations[callback.properties.defaultLanguage]);
              console.log(color.green('> If they are not the same, please contact an Admin!'));
              return true;
            } else {
              return false;
            }
          }));

        case 130:
          if (!_context3.sent) {
            _context3.next = 132;
            break;
          }

          return _context3.abrupt("return", false);

        case 132:
          _context3.next = 134;
          return regeneratorRuntime.awrap(database.quotes.addQuote(Quote).then(function (callback) {
            console.log(color.cyanBright("> The entry ".concat(callback.id, " has been added.")));
            console.log(color.cyan(">> Quote: ") + callback.translations[callback.properties.defaultLanguage]);
            console.log(color.cyan(">> Author: ") + callback.author);
          }));

        case 134:
          return _context3.abrupt("break", 212);

        case 135:
          if (args.length != 2) sendHelp(command);
          console.log(color.blue("> Adding new Language to a existing Quote!"));
          _context3.next = 139;
          return regeneratorRuntime.awrap(questions.quotes.addTranslation());

        case 139:
          newTranslation = _context3.sent;
          _context3.next = 142;
          return regeneratorRuntime.awrap(database.quotes.getQuoteByID(newTranslation.id).then(function (callback) {
            return callback == null;
          }));

        case 142:
          if (!_context3.sent) {
            _context3.next = 145;
            break;
          }

          console.log('> No Quote with that ID could be found!');
          return _context3.abrupt("return", false);

        case 145:
          _context3.next = 147;
          return regeneratorRuntime.awrap(database.quotes.addLanguage(newTranslation.id, database.quotes.quoteTranslation(newTranslation.language, newTranslation.quote)).then(function (callback) {
            console.log(color.cyanBright("> ID: ") + callback.id);
            console.log(color.cyanBright('> Quote in ' + newTranslation.language + ': ') + newTranslation.quote);
            console.log(color.cyanBright('> The Translation ') + newTranslation.language + color.cyanBright(" has successfully been added!"));
          }));

        case 147:
          return _context3.abrupt("break", 212);

        case 148:
          if (args.length != 2) sendHelp(command);
          _context3.next = 151;
          return regeneratorRuntime.awrap(questions.quotes.removeQuote());

        case 151:
          _id2 = _context3.sent;
          _context3.next = 154;
          return regeneratorRuntime.awrap(database.quotes.getQuoteByID(_id2));

        case 154:
          _context3.t1 = _context3.sent;

          if (!(_context3.t1 == null)) {
            _context3.next = 158;
            break;
          }

          console.log(color.red("> There is no Entry with the ID: ") + _id2);
          return _context3.abrupt("return", false);

        case 158:
          _context3.next = 160;
          return regeneratorRuntime.awrap(database.quotes.deleteQuote(_id2).then(function (callback) {
            console.log(color.green('> The Entry with the ID ' + color.white(_id2) + " has been successfully deleted!"));
          })["catch"](function (err) {
            console.log(err);
          }));

        case 160:
          return _context3.abrupt("break", 212);

        case 161:
          if (args.length != 2) sendHelp(command);
          _context3.next = 164;
          return regeneratorRuntime.awrap(questions.quotes.removeTranslation());

        case 164:
          removeTranslation = _context3.sent;
          _context3.next = 167;
          return regeneratorRuntime.awrap(database.quotes.getQuoteByID(removeTranslation.id));

        case 167:
          _quote = _context3.sent;

          if (_quote == null) {
            console.log(color.red('> There is no Quote with this ID!'));
          }

          _context3.next = 171;
          return regeneratorRuntime.awrap(database.quotes.getLanguages(removeTranslation.id));

        case 171:
          translations = _context3.sent;

          if (translations.includes(removeTranslation.language)) {
            _context3.next = 175;
            break;
          }

          console.log(color.red('> This Quote does not have this Translation (' + removeTranslation.language + ')'));
          return _context3.abrupt("return", false);

        case 175:
          _context3.next = 177;
          return regeneratorRuntime.awrap(database.quotes.removeLanguage(removeTranslation.id, removeTranslation.language).then(function (callback) {
            console.log(color.green('> The Translation (' + removeTranslation.language + ") has successfully been removed from " + removeTranslation.id + ' (' + _quote.translations[_quote.properties.defaultLanguage] + ")"));
          }));

        case 177:
          return _context3.abrupt("break", 212);

        case 178:
          _count = 0;
          _context3.next = 181;
          return regeneratorRuntime.awrap(database.quotes.getQuotes(200));

        case 181:
          quote = _context3.sent;

          for (i = 0; i < quote.length; i++) {
            _count++;
            console.log(" ");
            console.log(color.cyanBright("> ") + _count + color.cyanBright(" - ID: ") + quote[i].id);
            console.log(color.cyanBright(">> Quote: ") + quote[i].translations[quote[i].properties.defaultLanguage] + color.cyanBright(" | Author: ") + quote[i].author + color.cyanBright(" | Translations: ") + (Object.keys(quote[i].translations).length < 5 ? Object.keys(quote[i].translations).join(', ') : Object.keys(quote[i].translations).length)); //console.log(color.cyanBright(">> Author: ") + (quote[i].author != null ? quote[i].author : "Unkown"));
            //console.log(color.cyanBright('>> Categories: ') + (quote[i].properties.categories.length > 0 ? quote[i].properties.categories.join(', ').toUpperCase() : []));
            //console.log(color.cyanBright(">> Default Language: ") + quote[i].properties.defaultLanguage);
            //console.log(color.cyanBright(">> Translations: ") + Object.keys(quote[i].translations).join(', '));
          }

          ;
          console.log(color.green("\n> There are currently " + _count + " Quotes in your Database!"));
          return _context3.abrupt("break", 212);

        case 186:
          if (args.length != 2) sendHelp(command);
          _context3.next = 189;
          return regeneratorRuntime.awrap(questions.quotes.askForID());

        case 189:
          _id3 = _context3.sent;
          _context3.next = 192;
          return regeneratorRuntime.awrap(database.quotes.getQuoteByID(_id3).then(function (callback) {
            return callback;
          }));

        case 192:
          _quote2 = _context3.sent;

          if (!(_quote2 == null)) {
            _context3.next = 196;
            break;
          }

          console.log(color.red("> There is no Quote with the ID: ") + _id3);
          return _context3.abrupt("return", false);

        case 196:
          console.log(" ");
          console.log(color.cyanBright("> ID: ") + _quote2.id);
          console.log(color.cyanBright(">> Quote: ") + _quote2.translations[_quote2.properties.defaultLanguage]);
          console.log(color.cyanBright(">> Author: ") + (_quote2.author != null ? _quote2.author : "Unkown"));
          console.log(color.cyanBright('>> Categories: ') + (_quote2.properties.categories.length > 0 ? _quote2.properties.categories.join(', ').toUpperCase() : []));
          console.log(color.cyanBright(">> Default Language: ") + _quote2.properties.defaultLanguage);
          console.log(color.cyanBright(">> Translations: ") + Object.keys(_quote2.translations).join(', '));
          Object.keys(_quote2.translations).forEach(function (callback) {
            if (callback != _quote2.properties.defaultLanguage) {
              console.log(color.green(' > ' + callback + ": ") + _quote2.translations[callback]);
            }
          });
          console.log(" ");
          return _context3.abrupt("break", 212);

        case 206:
          if (args.length != 2) sendHelp(command);
          _context3.next = 209;
          return regeneratorRuntime.awrap(questions.quotes.update());

        case 209:
          update = _context3.sent;
          return _context3.abrupt("break", 212);

        case 211:
          sendHelp(command);

        case 212:
          _context3.next = 215;
          break;

        case 214:
          sendHelp(command);

        case 215:
          _context3.next = 218;
          break;

        case 217:
          sendHelp(command);

        case 218:
          _context3.next = 221;
          break;

        case 220:
          if (command == "help") {
            sendHelp(command);
          }

        case 221:
          _context3.next = 224;
          break;

        case 223:
          //Send help as backup
          sendHelp(command);

        case 224:
          _context3.next = 227;
          break;

        case 226:
          //Sending 'help' message in case the command is not in the array
          console.log(messages[0]);

        case 227:
          return _context3.abrupt("return", true);

        case 228:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function sendHelp(command) {
  console.log(color.yellow("> Help: "));

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

function printUser(user) {
  console.log(" ");
  console.log(color.cyan("> Info of: ") + user.name);
  console.log(color.green(">> CreatedAt: ") + user.createdAt);
  console.log(color.green(">> ID: ") + user.id);
  console.log(color.green(">> Email: ") + user.email);
  console.log(color.cyan("> Processed: "));
  console.log(color.green(">> Quotes: ") + (user.processed.quotes.length > 0 ? user.processed.quotes : "[]"));
  console.log(color.green(">> Sentences: ") + (user.processed.sentences.length > 0 ? user.processed.sentences : "[]"));
  console.log(color.green(">> FirstNames: ") + (user.processed.firstnames.length > 0 ? user.processed.firstnames : "[]"));
  console.log(color.green(">> LastNames: ") + (user.processed.lastnames.length > 0 ? user.processed.lastnames : "[]"));
  console.log(" ");
}

function printUserAuth(user) {
  console.log(" ");
  console.log(color.cyan("> Info of: ") + user.name);
  console.log(color.green(">> Auth: ") + user.authentication);
  console.log(color.green(">> CreatedAt: ") + user.createdAt);
  console.log(color.green(">> ID: ") + user.id);
  console.log(color.green(">> Email: ") + user.email);
  console.log(" ");
}