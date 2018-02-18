const characters = {}

module.exports = {
    get: function (user, callback) {
        callback(characters[key]);
    },
    add: function (user, character) {
        characters[user] = character;
    },
    remove: function (user) {
        characters.remove(user);
    }
}