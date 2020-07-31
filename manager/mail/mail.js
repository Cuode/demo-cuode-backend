const nodemailer = require('nodemailer');
const email_credentials = require('./config.js').mail;

/**
 * Sends the mail to the account!
 * @param {*} email 
 */

module.exports.sendmail = async function(email) {

    let account = nodemailer.createTransport({
        host: email_credentials.host,
        port: email_credentials.port,
        secure: email_credentials.secure,
        auth: {
            user: email_credentials.username,
            pass: email_credentials.password
        }
    });

    account.sendMail({
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    }).catch(console.error);

}

/**
 * Prepares the email;
 * @param {*} from Is shown as sender
 * @param {*} to Reciever email adress
 * @param {*} subject The Subject
 * @param {*} plain Plain Text
 * @param {*} html Html, for better look
 */
module.exports.email = function(from, to, subject, plain, html) {
    return {
        from: from,
        to: to,
        subject: subject,
        text: plain,
        html: html
    };
}
