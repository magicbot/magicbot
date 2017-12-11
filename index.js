const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const client = new Discord.Client();
const urban = require("urban.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${client.guilds.size} guilds || Prefix is ${prefix}`, {type: "WATCHING"});
});

let prefix = "m|";

const pingMessages = [
    "Playing with magic...", "Hiding in the shadows...", "Playing with you..."
]

const predictions = [
    "Definitely", "Very likely", "There's a good chance", "I doubt it", "Reply hazy, try again", "Cannot predict now"
]

client.on('guildCreate', guild => {
    let logChannel = client.channels.get("382878132526645249")
    logChannel.send({embed: {
        color: 0x01b723,
        /* author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        }, */
        // title: "MagicBot | Information",
        // url: "http://google.com",
        // description: "Info about MagicBot",
        fields: [{
            name: `JOINED ${guild.name}`,
            value: `Guild Owner: ${guild.owner.user.tag}
            \nMembers: ${guild.memberCount} (${guild.members.filter(u => u.user.bot).size} bots and ${guild.members.filter(u => u.user.bot === false).size} users)
            \nChannels: ${guild.channels.size} (${guild.channels.filter(c => c.type === "text").size} text channels and ${guild.channels.filter(c => c.type === "voice").size} voice channels)
            \nGuild Region: ${guild.region}
            \nGuild ID: ${guild.id}
            \nWas Created: ${guild.createdAt.toString().substr(0, 15)}`
          },
        ],
        timestamp: new Date(),
        /* footer: {
          icon_url: msg.author.avatarURL,
          text: `Command issued by ${msg.author.tag}`
        } */
      }
    });
});

client.on('guildDelete', guild => {
    let logChannel = client.channels.get("382878132526645249")
    logChannel.send({embed: {
        color: 0xa01800,
        /* author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        }, */
        // title: "MagicBot | Information",
        // url: "http://google.com",
        // description: "Info about MagicBot",
        fields: [{
            name: `LEFT ${guild.name}`,
            value: `Guild Owner: ${guild.owner.user.tag}
            \nMembers: ${guild.memberCount} (${guild.members.filter(u => u.user.bot).size} bots and ${guild.members.filter(u => u.user.bot === false).size} users)
            \nChannels: ${guild.channels.size} (${guild.channels.filter(c => c.type === "text").size} text channels and ${guild.channels.filter(c => c.type === "voice").size} voice channels)
            \nGuild Region: ${guild.region}
            \nGuild ID: ${guild.id}
            \nWas Created: ${guild.createdAt.toString().substr(0, 15)}`
          },
        ],
        timestamp: new Date(),
        /* footer: {
          icon_url: msg.author.avatarURL,
          text: `Command issued by ${msg.author.tag}`
        } */
      }
    });
});

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
            m.edit(`🎱 **${args}**\n${predictions[Math.floor(Math.random() * predictions.length)]}`)
        })
    }

    if (msg.content.startsWith(prefix + 'avatar')) {
        let myAvatar = msg.mentions.users.first()

        if (!myAvatar) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s avatar`)

            .setColor(0xb2008e)
            .setImage(`${msg.author.avatarURL}`)

            msg.channel.send({embed}) } else {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${myAvatar.username}'s avatar`)

            .setColor(0xb2008e)
            .setImage(`${myAvatar.avatarURL}`)

            msg.channel.send({embed})
            }
    }

    if (msg.content.startsWith(prefix + 'invite')) {
        msg.channel.send({embed: {
            color: 0x00cce8,
            /* author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            }, */
            // title: "Support",
            // url: "http://google.com",
            // description: "MagicBot's support server & bot OAuth URL",
            fields: [{
                name: "Support",
                value: "I currently do not have a support server. You have to either, contact my creator directly, or join my creator's main (non-bot support) discord. The invite can be found [here](https://discord.gg/afXZ5XF). Additionally, you could also go [here](https://discord.gg/QTAHgAe)."
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
        let args = msg.content.split(" ").slice(1).join(" ")
        if (msg.author.id !== "229552088525438977") return;
        if (!args) {
            return msg.channel.send("Whoops! No args found.")
        }
        msg.delete();
        msg.channel.send(`${args}`)
    }   
        
    if (msg.content.startsWith(prefix + 'reverse')) {
        let args = msg.content.split(" ").slice(1).join(" ")
        if (!args) {
            return msg.channel.send("You've borked!\nPlease provide arguments next time.")
        }
        msg.channel.send(`↩️ ${args.split('').reverse().join('')}`)
    }

    if (msg.content.startsWith(prefix + 'info')) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        msg.channel.send({embed: {
            color: 0x00cce8,
            /* author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            }, */
            // title: "MagicBot | Information",
            // url: "http://google.com",
            // description: "Info about MagicBot",
            fields: [{
                name: "Information about MagicBot",
                value: `Node version: ${process.version}
                \nDiscord.js version: v${require('discord.js').version}
                \nServers: ${client.guilds.size}
                \nUsers: ${client.users.size}
                \nOperating System: ${process.platform}
                \nMemory Usage: broken. fixing.
                \nUptime: ${duration}
                \nPrefix: ${prefix}
                \nContributors: Jacob Noah#7368, deadlyfire#8586
                \nBot author: void#4938`
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

    if (msg.content.startsWith(prefix + 'guilds')) {
        msg.channel.send(`I'm currently in ${client.guilds.size} guilds.\n\n${client.guilds.map(g => `${g.name} - ${g.id} - ${g.memberCount} members`).join('\n')}`)
    }

    if (msg.content.startsWith(prefix + 'thot')) {
        let args = msg.content.split(" ").slice(1).join(" ")
        if (!args) {
            return msg.channel.send("where are your arguments, dude?")
        }
        msg.channel.send(`**${args}** is a thot!`)
    }

    if (msg.content.startsWith(prefix + 'clapify')) {
        let args = msg.content.split(" ").slice(1)
        if (!args) {
            return msg.channel.send("You've borked! Args required!") // Error handling isn't working (here) for some reason. Will fix if I get a solution.
        }
        msg.channel.send("👏" + args.join("👏") + "👏");
    }

    if (msg.isMentioned(client.user)) {
        msg.reply(`Prefix is: \`${prefix}\`.`)
    }

    if (msg.content.startsWith(prefix + 'banne')) {
        let args = msg.content.split(" ").slice(1).join(" ")
        if (!args) {
            return msg.channel.send("woah, no args?")
        }
        msg.channel.send(`oshit, **${args}** got BANNEd by **${msg.author.username}**`)
    }

    if (msg.content.startsWith(prefix + 'serverinfo')) {
        var botCount = msg.guild.members.filter(u => u.user.bot).size 
        var userCount = msg.guild.members.filter(u => u.user.bot === false).size 
        const embed = new Discord.MessageEmbed()
        .setTitle(`Information about ${msg.guild.name}`)
        .setColor(0x00cce8)
        .addField(`Owner`, `${msg.guild.owner.user.tag} (${msg.guild.owner.user.id})`)
        .addField(`Guild ID`, `${msg.guild.id}`)
        .addField(`Name Acronym`, `${msg.guild.nameAcronym}`)
        .addField(`Region`, `${msg.guild.region}`)
        .addField(`Channels`, `${msg.guild.channels.filter(c => c.type === "text").size} (${msg.guild.channels.filter(c => c.type === "voice").size} voice channels)`)
        .addField(`Members`, `${msg.guild.memberCount} (${userCount} users and ${botCount} bots)`)
        .addField(`Online Users`, `${msg.guild.members.filter(mem => mem.presence.status === "online").size}`)
        .addField(`Roles`, `${msg.guild.roles.size}`)

        msg.channel.send({embed})
    }

    if (msg.content.startsWith(prefix + 'userinfo')) {
        let infoForUser = msg.mentions.members.first()
        if (!infoForUser) {
            msg.reply("Please provide a valid user mention for me to view.")
        } else { 
            const embed = new Discord.MessageEmbed()
            .setTitle(`Information about ${infoForUser.username}`)
            .setColor(0x00cce8)
            .addField(`Full Username`, `${infoForUser.user.tag}`)
            .addField(`User ID`, `${infoForUser.user.id}`)
            .addField(`Is a bot?`, `${infoForUser.bot}`)
            .addField(`Status`, `${infoForUser.presence.status} (Playing Status: ${infoForUser.presence.activity.name || "None"})`)
            .addField(`Account Created on Discord`, `${infoForUser.createdAt.toString().substr(0, 15)}`)
            .addField(`Roles`, `${infoForUser.roles.map(r => `${r.name}`).join('\n')}`)
            
            msg.channel.send({embed})
        }
    }

    if (msg.content.startsWith(prefix + 'urban')) {
        let args = msg.content.split(" ").slice(1).join(" ");
        if (!args) {
            return msg.reply('Please provide something for me to look up on the Urban Dictionary.');
        }
        urban(args).then((r) => {
            msg.channel.send(`**Definition for ${r.word}**` + "\n" + r.definition).catch(console.error);
         });
    }

    if (msg.content.startsWith(prefix + 'help')) {
        msg.channel.send({embed: {
            color: 0x00cce8,
            /* author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            }, */
            title: "Commands List",
            // url: "http://google.com",
            description: "Commands for MagicBot",
            fields: [{
                name: "Fun `(9)`",
                value: `${prefix}ping - Pings the websocket to check if I'm still responding.
                \n${prefix}8ball - Predicts your future.
                \n${prefix}avatar - Shows the avatar of the user mentioned. If you do not specify a user, it will return your avatar.
                \n${prefix}invite - Gives you the invite for the bot's support server & OAuth link for the bot.
                \n${prefix}reverse - Reverses the inputted arguments.
                \n${prefix}thot - Calls someone a thot.
                \n${prefix}banne - BANNEs a user. (not really.)
                \n${prefix}clapify - The 👏 bot 👏 will 👏 clap 👏 your 👏 arguments 👏.
                \n${prefix}urban - Looks something up on the Urban Dictionary.`
              },
              {
                name: "Utility `(3)`",
                value: `${prefix}info - Shows bot information.
                \n${prefix}guilds - Shows a list of all guilds that the bot is in.
                \n${prefix}serverinfo - Shows info about the server that you're currently in.
                \n${prefix}userinfo - Shows info about the user mentioned.`
              },
              {
                name: "Moderator `(0)`",
                value: `No commands here yet!`
              },
              { 
                name: "Dev `(2)`",
                value: `${prefix}eval [code] - Evaluates JavaScript code.
                \n${prefix}say [args] - Says anything that is inputted (args).`
              },
              {
                name: "WIP Commands `(0)`",
                value: `No commands here yet!`
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
      
              const embed = new Discord.MessageEmbed()
              .setTitle(`Evaluation:`)
      
              .setColor(0x18d600)
              .setDescription(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(evaled)}\`\`\``)
      
              msg.channel.send({embed});
          } catch (err) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Evaluation:`)
      
            .setColor(0xd82e00)
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

client.login('no');
