const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: '🗒️ Help menu',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setColor('DarkRed')
        .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4cb.png')
        .setTitle('Help Menu')
        .setDescription(`> You can find all the commands here.\n> In total there are **\`8\`** commands.\nThe source code for this bot is available on [GitHub](https://github.com/BlobDeveloper/discord-giveaways-bot).`)
        .addFields([
            { name: 'ℹ️ Info', value: '**[2]** `help`, `ping`' },
            { name: '🎉 Giveaways', value: '**[6]** `giveaway start`, `giveaway pause`, `giveaway unpause`, `giveaway end`, `giveaway reroll`, `giveaway delete`'}
        ]);
        
        return interaction.reply({ embeds: [embed]})
    }
}
