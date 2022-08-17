module.exports = {
    app : {
        // Discord Bot Token from https://discord.com/developers/
        token: 'XXX',
        // Discord Bot Status
        playing: 'giveaways 🎉',
        // Database URL from https://mongodb.com/
        mongodb: 'XXX',
    },

    giveawayManager : {
        // Role ID which will be able to create giveaways
        giveawaysManagerRole: 'XXX',
        // When a giveaway is created the bot pings everyone (true or false)
        everyoneMention: false,
        // You can choose a custom reaction
        reaction: '🎉'
    },

    messages: {
        giveaway: '🎉 **Giveaway**',
        giveawayEnded: '🎉 **Giveaway Ended**',
        title: 'Prize: {this.prize}',
        drawing: 'The giveaway ends in: {timestamp}',
        dropMessage: 'Be the first, and react to 🎉!',
        inviteToParticipate: 'React with 🎉 to enter the giveaway!',
        winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
        embedFooter: '{this.winnerCount} winner(s)',
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: 'Hosted by: {this.hostedBy}',
        winners: 'Winner(s):',
        endedAt: 'Ended at',
        paused: '⚠️ **This giveaway is paused!**',
        infiniteDurationText: '`NEVER`',
        congrat: 'New winner(s): {winners}! Congratulations, your prize is **{this.prize}**!',
        error: 'Reroll cancelled, no valid participations.'
    }
}