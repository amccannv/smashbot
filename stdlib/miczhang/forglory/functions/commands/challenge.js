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
* @returns {string}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  ephemeral(
      botToken,
      channel,
      user,
      {
        type: 'ephemeral',
        text: `Who would you like to Smash today?`,
        attachments: [{
            text: "Choose your victim",
            fallback: "If you could read this message, you'd be choosing something fun to do right now.",
            color: "#3AA3E3",
            attachment_type: "default",
            callback_id: "opponent_selection",
            actions: [
                {
                    name: 'challenged',
                    text: "Victim of Choice",
                    type: "select",
                    data_source: "users",
                }
            ]
        }]
      }, (err, result) => {
          if (err) {
              return callback(err);
          }
          return callback(null, "");
      }
  ) 
};