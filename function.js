const fs = require('fs')
const Discord = require('discord.js');
const config = require('./config.json');
module.exports = {
    authentif(message, code){
        if(message.content == code)
        {
            try{
                message.member.roles.remove(config.role.verif)
                const msgFinish = {
                    "embed": {
                      "title": "AUTHENTIFICATION",
                      "description": `Salut ${message.author.username}, je t'envoie ce message pour te dire que tu as passé le test d'authentification !`,
                      "color": (Math.random()*0xFFFFFF<<0).toString(16),
                      "footer": {
                        "icon_url": message.author.avatarURL(),
                        "text": message.author.username
                      },
                      "thumbnail": {
                        "url": message.guild.iconURL()
                      }
                    }
                  }
                message.member.send(msgFinish)
                console.log(`==>> ${message.author.username} a réussi l'authentification !`)
            }catch{}
        }
        else{
            try{
                const msgError = {
                    "embed": {
                      "title": "AUTHENTIFICATION",
                      "description": `Salut ${message.author.username}, je t'envoie ce message pour te dire que tu n'as pas passé le test d'authentification !`,
                      "color": "#FF0000",
                      "fields": [{
                            "name": "Info",
                            "value": "Il te faut mettre le code de vérification que je te donne !"
                      }],
                      "footer": {
                        "icon_url": message.author.avatarURL(),
                        "text": message.author.username
                      },
                      "thumbnail": {
                        "url": message.guild.iconURL()
                      }
                    }
                  }
                message.member.send(msgError)
                console.log(`==>> ${message.author.username} n'a pas réussi l'authentification !`)
            }catch{}
        }
    },

     RandomCode(){
        var newCode = '';
        for(var idx = 0; idx <= 7; idx++){
            const No = Math.floor(Math.random() * 4 );
            var tmp = 0;
            if(No == 0){
                tmp = Math.floor(Math.random() * (38 - 33) + 33)
            }
            else if(No == 1){
                tmp = Math.floor(Math.random() * (57 - 48) + 48)
            }
            else if(No == 2){
                tmp = Math.floor(Math.random() * (90 - 63) + 63)
            }
            else{
                tmp = Math.floor(Math.random() * (122 - 97) + 97)
            }
            newCode += String.fromCharCode(tmp);
        }
        return newCode;
    },
    newgame({name ,path, content, roleId}, client) {
      console.log('passage')
      if(fs.existsSync(path)) return false
      fs.appendFile(path, content, () => console.log("\x1b[32m",`==> Nouveau fichier de jeu : \x1b[4m ${path} \x1b[32m`, "\x1b[0m"))
      client.games.set(name, {name : name, role : roleId})
      console.log("\x1b[32m", `=> Nouveau jeu ${name} est charger !`, "\x1b[0m");
      return true
      }
}