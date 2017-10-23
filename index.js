const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `with dark energy | magic.help`, type: 0 } });
});

let prefix = "magic.";

const pingMessages = [
    "Playing with magic...", "Hiding in the shadows...", "Playing with you..."
]

const predictions = [
    "Very likely", "There's a good chance", "I doubt it", "Reply hazy, try again", "Cannot predict now"
]

client.on('message', msg => {
    if (msg.content.startsWith(prefix + 'ping')) {
        msg.channel.send(`${pingMessages[Math.floor(Math.random() * pingMessages.length)]}`).then(sent => {
            sent.edit(`Pong! (Time Taken: ${sent.createdTimestamp - msg.createdTimestamp}ms)`)
        })
    }

    if (msg.content.startsWith(prefix + '8ball')) {
        let args = msg.content.split(' ').slice(1).join(' ')
        if (!args) {
            return msg.reply("You haven't given me anything to predict!")
        }
        if (!msg.content.endsWith('?')) {
            return msg.reply("You haven't asked me a question!")
        }
        msg.channel.send('Predicting your future...').then(m => {
            m.edit(`🎱 | ${predictions[Math.floor(Math.random() * predictions.length)]}`)
        })
    }

    if (msg.content.startsWith(prefix + 'avatar')) {
        let myAvatar = msg.mentions.users.first()

        if (!myAvatar) {
            const embed = new Discord.RichEmbed()
            .setTitle(`${msg.author.username}'s avatar`)

            .setColor(0x589377)
            .setImage(`${msg.author.avatarURL}`)

            msg.channel.send({embed}) } else {
            const embed = new Discord.RichEmbed()
            .setTitle(`${myAvatar.username}'s avatar`)

            .setColor(0x589377)
            .setImage(`${myAvatar.avatarURL}`)

            msg.channel.send({embed})
            }
    }

    if (msg.content.startsWith(prefix + 'invite')) {
        msg.channel.send({embed: {
            color: 3447003,
            /* author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            }, */
            // title: "Support",
            // url: "http://google.com",
            // description: "MagicBot's support server & bot OAuth URL",
            fields: [{
                name: "Support",
                value: "You can join my support server [here](https://discord.gg/G4u2Vmt)."
              },
              { 
                name: "Invite me!",
                value: "You can invite me [here](https://discordapp.com/oauth2/authorize/?permissions=16392&scope=bot&client_id=371168542084825088)."
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: msg.author.avatarURL,
              text: `Command issued by ${msg.author.tag}`
            }
          }
        });
    }

    if (msg.content.startsWith(prefix + 'say')) {
        if (msg.author.id !== "229552088525438977") return;
        let args = msg.content.split(" ").slice(1).join(" ")
        if (!args) {
            return msg.channel.send("Whoops! No args found.")
        }
        msg.delete();
        msg.channel.send(`${args}`)
    }

    if (msg.content.startsWith(prefix + 'help')) {
        msg.channel.send({embed: {
            color: 3447003,
            /* author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            }, */
            title: "Commands List",
            // url: "http://google.com",
            description: "Commands for MagicBot",
            fields: [{
                name: "Fun",
                value: `magic.ping - Pings the websocket to check if I'm still responding.
                \nmagic.8ball - Predicts your future.
                \nmagic.avatar - Shows the avatar of the user mentioned. If you do not specify a user, it will return your avatar.
                \nmagic.invite - Gives you the invite for the bot's support server & OAuth link for the bot.`
              },
              { 
                name: "Dev",
                value: `magic.eval [code] - Evaluates JavaScript code.
                \nmagic.say [args] - Says anything that is inputted (args).`
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: msg.author.avatarURL,
              text: `Help requested by ${msg.author.tag}`
            }
          }
        });
    }

    if (msg.content.startsWith(prefix + 'eval')) {
        if(msg.author.id !== "229552088525438977") return;
        let evall = msg.content.split(' ')[0];
        let evalstuff = msg.content.split(" ").slice(1).join(" ")
        try {
            const code = msg.content.split(" ").slice(1).join(" ")
            let evaled = eval(code);
      
            if (typeof evaled !== 'string')
              evaled = require('util').inspect(evaled);
      
              const embed = new Discord.RichEmbed()
              .setTitle(`Evaluation:`)
      
              .setColor(0x2ea548)
              .setDescription(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(evaled)}\`\`\``)
      
              msg.channel.send({embed});
          } catch (err) {
            const embed = new Discord.RichEmbed()
            .setTitle(`Evaluation:`)
      
            .setColor(0xaa3331)
            .setDescription(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(err)}\`\`\``)
      
            msg.channel.send({embed});
          }
        }
});

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

client.login('your token here');