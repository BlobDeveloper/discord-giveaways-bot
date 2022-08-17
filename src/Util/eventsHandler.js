const { readdirSync } = require('fs');
require('colors');

module.exports = (client) => {
    readdirSync('./src/Events/').forEach(async (dir) => {
        const events = readdirSync(`./src/Events/${dir}`).filter(file => file.endsWith('.js'));
    
        for(const file of events) {
            const event = require(`${__dirname}/../Events/${dir}/${file}`);
            if(event.name) {
                console.log(`[EVENTS]`.blue + ` Event ${file.split(".")[0]} loaded!`);
            
                client.on(event.name, (...args) => event.execute(...args, client))
                delete require.cache[require.resolve(`${__dirname}/../Events/${dir}/${file}`)];
            } else {
                console.log(`[EVENTS]`.red + ` Failed to load event: ${file.split('.')[0]}!`);
                continue;
            }
        }
    });
}