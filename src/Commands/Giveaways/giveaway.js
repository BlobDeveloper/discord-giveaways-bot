const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, ChannelType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'giveaway',
    description: '⚙ Giveaways system',
    options: [
        {
            name: 'start',
            description: '🎉 Starts a giveaway',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'length', description: 'Enter the length of the giveaway', type: ApplicationCommandOptionType.String, required: true },
                { name: 'prize', description: 'Set a prize to win', type: ApplicationCommandOptionType.String, required: true },
                { name: 'winners', description: 'Enter the number of winners', type: ApplicationCommandOptionType.Number, required: true },
                { name: 'channel', description: 'Specify the channel where to send the giveaway', type: ApplicationCommandOptionType.Channel, channel_types: [ChannelType.GuildText], required: false }
            ]
        },
        {
            name: 'pause',
            description: '⏸️ Pauses the giveaway',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Specify giveaway message id', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'unpause',
            description: '⏯️ Unpauses the giveaway',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Specify giveaway message id', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'end',
            description: '⏹️ Ends the giveaway',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Specify giveaway message id', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'reroll',
            description: '🔃 Selects a new giveaway winner',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Specify giveaway message id', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'delete',
            description: '🚮 Deletes the giveaway',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Specify giveaway message id', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
    ],
    giveawayManagerOnly: true,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        const errorEmbed = new EmbedBuilder().setColor('Red');
        const successEmbed = new EmbedBuilder().setColor('Green');

        if(sub === 'start') {
            const gchannel = interaction.options.getChannel('channel') || interaction.channel;
            const duration = interaction.options.getString('length');
            const winnerCount = interaction.options.getNumber('winners');
            const prize = interaction.options.getString('prize');
            if(isNaN(ms(duration))) {
                errorEmbed.setDescription('❌ | Enter the correct giveaway length format! `1d, 1h, 1m, 1s`'); 
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
            
            return client.giveawaysManager.start(gchannel, {
                duration: ms(duration),
                winnerCount,
                prize,
                messages: client.config.messages
            }).then(async () => {
                if(client.config.giveawayManager.everyoneMention) {
                    const msg = await gchannel.send({ content: '@everyone' });
                    msg.delete();
                }
                successEmbed.setDescription(`✅ | Giveaway started in ${gchannel}!`)
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                console.log(err);
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        const messageid = interaction.options.getString('message-id');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageid);
        if (!giveaway) {
            errorEmbed.setDescription(`❌ | Giveaway with ID ${messageid} was not found in the database!`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if(sub === 'pause') {
            if(giveaway.isPaused) {
                errorEmbed.setDescription('❌ | This giveaway is already paused!')
            }
            await client.giveawaysManager.pause(interaction.options.getString('message-id'), {
                content: client.config.messages.paused,
                infiniteDurationText: client.config.messages.infiniteDurationText
            }).then(() => {
                successEmbed.setDescription('⏸️ | The giveaway has been paused!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'unpause') {
            await client.giveawaysManager.unpause(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('▶️ | The giveaway has been paused!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'end') {
            await client.giveawaysManager.end(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('⏹️ | The giveaway has been stopped!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'reroll') {
            await client.giveawaysManager.reroll(interaction.options.getString('message-id'), {
                messages: {
                    congrat: client.config.messages.congrat,
                    error: client.config.messages.error
                }
            }).then(() => {
                successEmbed.setDescription('🎉 | The giveaway has a new winner!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'delete') {
            await client.giveawaysManager.delete(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('🚮 | The giveaway has been deleted!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`❌ | Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }
    }
}