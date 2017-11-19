const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ephemeral = require('../../utils/ephemeral.js');

/**
* /top
*
*   Displays top players. Displays top 10 players by default
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

  ephemeral(
    botToken,
    channel, 
    user,
     {
    response_type: 'ephemeral',
    text: `Here are the current top 10 rankings. Please retype this command with a number if you want that number of top players.`
    }, (err, result) => {
      if (err) {
          return callback(err);
      }
      return callback(null, {});
  }
  )
};
