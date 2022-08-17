require('colors');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials),
});

client.config = require('./config');
client.commands = new Collection();

['commandHandler', 'eventsHandler', 'giveawaysManager', 'giveawaysEventsHandler'].forEach((x) => {
    require(`./Util/${x}`)(client);
});

client.login(client.config.app.token);