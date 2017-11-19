const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const message = require('../../utils/message.js');

/**
* example.js
*
*   Basic example action handler. Called in response to an input from an
*     interactive message.
*   All Actions in response to interactive messages use this template, simply
*   create additional files with different names to add actions.
*
*   See https://api.slack.com/docs/message-buttons for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {object} action The full Slack action object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/

module.exports = (user, channel, action = {}, botToken = null, callback) => {

  message(
    botToken,
    action.actions[0].value,
    {
    text: `Hello, <@${user}> has challenged you to a battle!`,
    attachments: [{
      text: 'Pick your fate',
      fallback: 'Can\'t display attachment',
      callback_id: 'callback_id',
      actions: [
        {
          name: 'creategame',
          text: 'I accept!',
          type: 'button',
          value: user
        },
        {
          name: 'reject',
          text: 'Hell nah!',
          type: 'button',
          value: 'no'
        }
      ]
    }]
  }, (err, result) => {
    if (err) {
        return callback(err);
    }
    return callback(null, {});
}
  );

};
