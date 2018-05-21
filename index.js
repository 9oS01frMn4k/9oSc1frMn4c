const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const swearWords = ["fuck", "shit", "בן זונה", "תתאבד", "זונה", "זין", "קוקסינל", "בולבול", "הומו", "ז ו נ ה", "סקס"];

bot.on("ready", async () => {
  console.log(`Bot is Online!`);
bot.user.setActivity(`-help | created by NiceGames`, {type: "PLAYING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`-help | created by NiceGames`, {type: "PLAYING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(
        `-help | created by NiceGames`, {type: "PLAYING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', '👋🏻welcome👋🏻');
  if (!channel) return;
  channel.send(`ברוך הבא לשרת המשוגע, ${member}`);
});

//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', '👋🏻welcome👋🏻');
  if (!channel) return;
  channel.send(`${member}, ברח מהשרת המשוגע`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @user break the rules
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(".kick [@user] [reason]");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("User", `${kUser}`)
    .addField("Staff", `<@${message.author.id}>`)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel) return message.channel.send("Can't find channel called `mod-log`");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }
  if (cmd === `${prefix}help`){
  message.reply('פקודות משוגעות בפרטי! :mailbox_with_mail:');

  message.author.send(`${prefix}severinfo - info about server\n\
${prefix}botinfo - info about the bot
${prefix}report - report someone for breaking the server rules
       --Staff commands--
${prefix}warn - warn a user by command
${prefix}kick - kick a user by command
${prefix}ban - ban a user by command
${prefix}mute - mute a user by command
${prefix}unmute - unmute a user by command`);
  }

if( swearWords.some(word => message.content.includes(word)) ) {
     message.delete();
  message.reply("אני לא אוהב קללות! :angry:");
  //Or just do message.delete();
}

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(".ban [@user] [reason]");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**User**", `${bUser}`)
    .addField("**Staff**", `<@${message.author.id}>`)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "log");
    if(!incidentchannel) return message.channel.send("Can't find channel called `log`");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}report`){

    //!report @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(".report [@user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "log");
    if(!reportschannel) return message.channel.send("Can't find channel called `log`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}warn`){

    //!warn @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(".warn [@user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#1b8fbd")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "😡warning😡");
    if(!reportschannel) return message.channel.send("Can't find channel called `😡warning😡`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  if (cmd === `${prefix}say`){
  // makes the bot say something and delete the message. As an example, it's open to anyone to use.
  // To get the "message" itself we join the `args` back into a string with spaces:
  const sayMessage = args.join(" ");
  // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  message.delete().catch(O_o=>{});
  // And we get the bot to say the thing:
  message.channel.send(sayMessage);
}
  if (cmd === `${prefix}vote`){
  		message.delete()
   let question = args.slice(0).join(" ");

   if (args.length === 0)
   return message.reply('Invalid Format: .vote <Question>')

   const embed = new Discord.RichEmbed()
   .setTitle("A Vote Has Been Started!")
   .setColor("#5599ff")
     .setDescription(`${question}`)
     .setFooter(`Vote Started By: ${message.author.username}`, `${message.author.avatarURL}`)
   const pollTopic = await message.channel.send({embed});
   await pollTopic.react(`👍`);
   await pollTopic.react(`👎`);
   const filter = (reaction) => reaction.emoji.name === 'ג…';
   const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
   collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
   collector.on('end', collected => console.log(`Collected ${collected.size} items`));
 }
  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if (cmd === `${prefix}unmute`) { // creates the command unmute
      if (!message.member.roles.some(r=>["Moderator"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
      var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
      if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
      unmutedmember.removeRole(mutedrole) //if reason, kick
          .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
      message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
  }
  if(cmd === `${prefix}mute`){

   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("לא לא חבר, אתה לא יכול לתת מיוט");
   if(args[0] == "help"){
     message.reply("Usage: .mute <user> <1s/m/h/d> <reason>");
     return;
   }
   let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!tomute) return message.reply("Couldn't find user.");
   if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
   let reason = args.slice(2).join(" ");
   if(!reason) return message.reply("Please supply a reason.");

   let muterole = message.guild.roles.find(`name`, "Muted");
   //start of create role
   if(!muterole){
     try{
       muterole = await message.guild.createRole({
         name: "Muted",
         color: "#000000",
         permissions:[]
       })
       message.guild.channels.forEach(async (channel, id) => {
         await channel.overwritePermissions(muterole, {
           SEND_MESSAGES: false,
           ADD_REACTIONS: false
         });
       });
     }catch(e){
       console.log(e.stack);
     }
   }
   //end of create role
   let mutetime = args[1];
   if(!mutetime) return message.reply("You didn't specify a time!");

   message.delete().catch(O_o=>{});

   try{
     await tomute.send(`Hi! You've been muted for ${mutetime}. Sorry!`)
   }catch(e){
     message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
   }

   let muteembed = new Discord.RichEmbed()
   .setDescription(`Mute`)
   .setColor(color.orange)
   .addField("User", tomute)
   .addField("Staff", `${message.author}`)
   .addField("Length", mutetime)
   .addField("Reason", reason);

   let incidentschannel = message.guild.channels.find(`name`, "log");
   if(!incidentschannel) return message.reply("Cannot find channel called `log`");
   incidentschannel.send(muteembed);

   await(tomute.addRole(muterole.id));

   setTimeout(function(){
     tomute.removeRole(muterole.id);
     message.channel.send(`<@${tomute.id}> has been unmuted!`);
   }, ms(mutetime));
 }
 if (cmd === `${prefix}moveall`){
   let isAdmin = message.member.roles.filterArray(role => {return role.name === 'Owner' || role.name === 'Move-all-er';}).length;
   if (isAdmin === 0){
     return;
   }
   if (message.content.indexOf(".moveall") > -1) {
     channelGetName = message.content.slice(9, 9999);
     findChannel = bot.channels.find('name', channelGetName);
     if (message.content.indexOf("-mute") > -1) {
       MoveMuteUsers(findChannel);
     } else{
       MoveUsers(findChannel);
     }
   }
 }
 });

 function MoveUsers(findChannel){
   bot.channels.findAll('type', 'voice').forEach(channelInfo => {
     if (channelInfo.name.indexOf("AFK") > -1 ){
       console.log("afk");
     } else {
       channelInfo.members.array().forEach(memberNumber => {
         memberNumber.setVoiceChannel(findChannel);
         console.log('moving');
         });
     }
 });
 }

 function MoveMuteUsers(findChannel){
   bot.channels.findAll('type', 'voice').forEach(channelInfo => {
     if (channelInfo.name.indexOf("AFK") > -1 ){
       console.log("afk");
     } else {
       channelInfo.members.array().forEach(memberNumber => {
         memberNumber.setVoiceChannel(findChannel);
         memberNumber.setMute(true, 'moveall');
         console.log('moving');
         });
     }
 });
 }


 // * Move from specific channels.
 // * ignore specific users.


 
bot.login(process.env.BOT_TOKEN);
