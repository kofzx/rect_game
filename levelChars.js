const Player = require('./actors/Player.js')
const Coin = require('./actors/Coin.js')
const Lava = require('./actors/Lava.js')

const levelChars = {
	'.': 'empty',
	'#': 'wall',
	'+': 'lava',
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava,
};

module.exports = levelChars;