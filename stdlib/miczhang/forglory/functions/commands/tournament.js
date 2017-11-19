const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ephemeral = require('../../utils/ephemeral.js');


/**
* /tournament
*
*   Starts a tournament with three types of ways to close the registration
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
  var displayTxt = "Want to compete?";
  var fall = "If you could read this message, you'd be choosing something fun to do right now";
  var color = "#3AA3E3";
  var buttonTxt = "I'm in!";
  var type = "button";
  var atType = "default";
  var callbackID = "game_selection";
  var nameButton = "competitiors";
  var value = "value";
  ephemeral(
    botToken,
    channel,
    user,
    {
      type: 'ephemeral',
      text: `Hello, <@${user}>. Let's make a tournament! Your registration is now live. To close it, please type '/closereg'`
    }, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        text: displayTxt,
        attachments: [{
        fallback: fall,
        color: color,
        attachment_type: atType,
        callback_id: callbackID,
        actions:[
          {
            name: nameButton,
            text: buttonTxt,
            type: type,
            value: value
          }
        ]
      }]
      });
    }
  )
};
