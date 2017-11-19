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

  // Slack does not permit array parameters to be passed in normally -- you must
  // convert them into strings.
  //SEND ACTION.ACTION[0].SELECTED_OPTION[0].VALUE;
  var request = require('request');
  request.post(api.forglory.net/newMatch, {json: true, body: input}, function(err, res, body) {
      if (!err && res.statusCode === 200) {
          funcTwo(body, function(err, output) {
              console.log(err, output);
          });
      }
  });  
  return callback(null, result);
    
};
