function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
    rollDice: function (args, callback) {
        var diceNumber = args[1];
        var diceType = args[2];

        var diceDifficulty = 6;
        if (args.length > 3 && args[4] !== undefined) {
            diceDifficulty = args[4];
        }

        var rolls = [];
        var sucesses = [];
        var criticals = [];
        var fails = [];
        var botches = [];

        for (var i = 0; i < diceNumber; i++) {
            var currentRoll = randomInt(1, diceType);
            rolls.push(currentRoll);

            if (currentRoll == 1) {
                botches.push(currentRoll);
            }

            if (currentRoll < diceDifficulty) {
                fails.push(currentRoll);
                continue;
            }

            sucesses.push(currentRoll);

            if (currentRoll == diceType) {
                criticals.push(currentRoll);
            }
        }

        var rollResult = {
            "rolls": rolls,
            "sucess": (sucesses.length - botches.length) > 0,
            "botch": sucesses.length == 0 && botches.length > 0,
            "sucesses": sucesses,
            "fails": fails,
            "botches": botches,
            "difficulty": diceDifficulty
        };

        callback(rollResult);
    }
}
