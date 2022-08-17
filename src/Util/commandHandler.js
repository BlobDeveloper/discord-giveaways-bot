const { readdirSync } = require('fs');
require('colors');

module.exports = (client) => {
    CommandsArray = [];

    readdirSync('./src/Commands').forEach(async (dir) => {
        const slashcmnds = readdirSync(`./src/Commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of slashcmnds) {
            const slashcmd = require(`${__dirname}/../Commands/${dir}/${file}`);
            
            if(slashcmd.name && slashcmd.description) {
                CommandsArray.push(slashcmd);
                client.commands.set(slashcmd.name, slashcmd);
                console.log(`[COMMANDS]`.magenta + ` Command ${file.split('.')[0]} loaded!`);
                delete require.cache[require.resolve(`${__dirname}/../Commands/${dir}/${file}`)];
            } else {
                console.log(`[COMMANDS]`.red + ` Failed to load slash command: ${file.split('.')[0]}!`);
                continue;
            }
        }
    });

    client.on('ready', () => {
        client.guilds.cache.get('891557910767874139').commands.set(CommandsArray);
        //client.application.commands.set(CommandsArray);
    });
}