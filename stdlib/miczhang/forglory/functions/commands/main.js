const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ephemeral = require('../../utils/ephemeral.js');

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
  ephemeral(
      botToken,
      channel,
      user,
      {
        type: 'ephemeral',
        attachments: [{
            text: "Choose your main",
            fallback: "If you could read this message, you'd be choosing something fun to do right now.",
            color: "#3AA3E3",
            attachment_type: "default",
            callback_id: "main_selection",
            actions: [
                {
                    name: "assignMain",
                    text: 'Please select your main',
                    type: 'select',
                    "options": [
                    {
                        "text": "Mario",
                        "value": "Mario"
                    },
                    {
                        "text": "Luigi",
                        "value": "Luigi"
                    },
                    {
                        "text": "Fox",
                        "value": "Fox"
                    },
                    {
                        "text": "Pikachu",
                        "value": "Pikachu"
                    },
                    {
                        "text": "Captain Falcon",
                        "value": "Captain Falcon"
                    },
                    {
                        "text": "Ness",
                        "value": "Ness"
                    },
                    {
                        "text": "Peach",
                        "value": "Peach"
                    },
                    {
                        "text": "Bowser",
                        "value": "Bowser"
                    },
                    {
                        "text": "Jigglypuff",
                        "value": "Jigglypuff"
                    },
                    {
                        "text": "Link",
                        "value": "Link"
                    },
                    {
                        "text": "Donkey Kong",
                        "value": "Donkey Kong"
                     },
                    {
                        "text": "Samus",
                        "value": "Samus"
                    },
                    {
                       "text": "Yoshi",
                       "value": "Yoshi"
                    },
                    {
                        "text": "Kirby",
                        "value": "Kirby"
                    },
                    {
                        "text": "Dr. Mario",
                        "value": "Dr. Mario"
                    },
                    {
                        "text": "Zelda",
                        "value": "Zelda"
                    },
                    {
                        "text": "Sheik",
                        "value": "Sheik"
                    },
                    {
                        "text": "Ganondorf",
                        "value": "Ganondorf"
                    },
                    {
                        "text": "Young Link",
                        "value": "Young Link"
                    },
                    {
                        "text": "Falco",
                        "value": "Falco"
                    },
                    {
                        "text": "Mewtwo",
                        "value": "Mewtwo"
                    },
                    {
                        "text": "Pichu",
                        "value": "Pichu"
                    },
                    {
                        "text": "Ice Climbers",
                        "value": "Ice Climbers"
                    },
                    {
                        "text": "Mr. Game & Watch",
                        "value": "Mr. Game & Watch"
                    },
                    {
                        "text": "Marth",
                        "value": "Marth"
                    },
                    {
                        "text": "Roy",
                        "value": "Roy"
                    },
                    {
                        "text": "None",
                        "value": "none"
                    }
                    ]
                }
            ]
        }]
      }, (err, result) => {
          if (err) {
              return callback(err);
          }
      }
  ) 
};