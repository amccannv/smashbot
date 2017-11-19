
const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {string} user The user id of the user that invoked this event (name is usable as well)
* @param {string} channel The channel id the event was executed in (name is usable as well)
* @param {string} text The text contents of the event
* @param {object} event The full Slack event object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', event = {}, botToken = null, callback) => {

  // Only send a response to certain messages
  if (text.match(/play|smash|game/i)) {
    callback(null, {
        text: `Who wants to play with <@${user}>?`,
        attachments: [{
            text: 'Try hitting this endpoint again by clicking the button!',
            fallback: 'Can\'t display attachment',
            callback_id: 'callback_id',
            actions: [
                {
                  name: 'challenger',
                  text: 'I do!',
                  type: 'button',
                  value: user
                }
            ]
        }]
    })
  } else {
    callback(null, {});
  }

};
