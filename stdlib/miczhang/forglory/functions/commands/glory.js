const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ephemeral = require('../../utils/ephemeral.js');

/**
* /glory
*
*   Basic menu command.
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
       type: ephemeral,
       text: `Hello, <@${user}>. Here are the list of possible commands! \n /challenge \n /report \n /tournament \n /top \n/main \n You can also create a game in any channel by mentioning the words \'smash\', \'play\', or \'game\'`
     }, (err, result) => {
      if (err) {
          return callback(err);
      }
      return callback(null, {});
  })

};
