const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ephemeral = require('../../utils/ephemeral.js');
const message = require('../../utils/message.js');


/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
    userTemp = user;
    var res = text.split(" ", 3);
    res[0] = res[0].substring(1)
    user = {display_name: res[0]};
    ephemeral(
      botToken,
      channel,
      user,
      {
        type: 'ephemeral',
        //text: `Wow looks like ` + res[0] + ` won ` + res[2] ` to ` + res[1] + `, is this correct?`,
        text: `Wow looks like the results are ${text}, is this correct?`,
        attachments: [{
            fallback: "If you could read this message, you'd be choosing something fun to do right now.",
            color: "#3AA3E3",
            attachment_type: "default",
            callback_id: "opponent_selection",
            actions: [
                {
                    name: 'confirm',
                    text: "Confirm",
                    type: "button",
                    value: res
                },
                {
                    name: 'reject',
                    text: "Contest",
                    type: "button",
                    value: userTemp
                }
            ]
        }]
      }, (err, result) => {
          if (err) {
              return callback(err);
          }
          return callback(null, {});
      }
  ) 
};