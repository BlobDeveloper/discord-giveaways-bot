const mongoose = require('mongoose');

module.exports = {
    name: 'ready',
    execute (client) {
        client.user.setActivity(client.config.app.playing);
        console.log(`[DISCORD]`.green + ` Client ${client.user.tag} is now online!`);

        mongoose.connect(client.config.app.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log(`[MONGOOSE]`.green + ` Client has successfully connected to the database!`)
        }).catch((err) => {
            console.log(err)
        });  
    }
}