const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "!"

client.login('token');

client.on('guildMemberAdd', member =>{
    member.guild.channels.get('550808681403514883').send('**Bievenue**' + member.user + 'nous sommes une communauté de jeux');

});

/*kick*/
client.on ('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBER')) return message.channel.send("Vous n'avez pas la permisions d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur !")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur car elle est administrateur")
        if (!member.kickable) return message.channel.send("Je ne peut pas kick cet utilisateur")
        member.kick()
        message.channel.send(member.user.username + ' a été exlu :white_check_mark:')
    }
});

/*ban*/
client.on ('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
        if (!message.member.hasPermission('BAN_MEMBER')) return message.channel.send("Vous n'avez pas la permisions d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur !")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas ban cet utilisateur car elle est administrateur")
        if (!member.bannable) return message.channel.send("Je ne peut pas bannir cet utilisateur")
        message.guild.ban(member, {days: 7})
        message.channel.send(member.user.username + ' a été banni car il ne respectait pas les régles :white_check_mark:')
    }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
});

/*warn*/

