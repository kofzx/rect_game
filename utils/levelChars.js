import Player from '../actors/Player.js'
import Coin from '../actors/Coin.js'
import Lava from '../actors/Lava.js'
import Monster from '../actors/Monster.js'

const levelChars = {
	'.': 'empty',
	'#': 'wall',
	'+': 'lava',
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava,
	'M': Monster
};

export default levelChars