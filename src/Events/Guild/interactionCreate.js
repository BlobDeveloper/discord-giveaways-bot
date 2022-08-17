const { Client, ChatInputCommandInteraction } = require("discord.js");
require('colors');

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ content: '❌ | Error! Please contact Developers!', ephemeral: true }) && client.commands.delete(interaction.commandName);

            if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					return interaction.reply({ content: `❌ | You need \`${command.permissions}\` permissions to execute this command!`, ephemeral: true })
				}
			}
            
            if(command.giveawayManagerOnly) {
                const role = interaction.member.roles.cache.get(client.config.giveawayManager.giveawaysManagerRole);
                if(!role) return interaction.reply({ content: '❌ | You must have a giveaway manager role to run this command!', ephemeral: true });
            }

            try {
                command.execute(interaction, client);
            } catch (e) {
                return console.log(`${e}`.red);
            } finally {
                console.log(`[LOG]`.yellow + ` Command ${interaction.commandName} has been executed by ${interaction.user.tag}`);
            }
        }
    }
}