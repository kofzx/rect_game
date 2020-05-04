import Vec from '../utils/Vec.js'
import State from '../main/State.js'

class Coin {
	constructor(pos, basePos, wobble) {
		this.pos = pos;
		this.basePos = basePos;
		this.wobble = wobble;
	}
	get type() {
		return 'coin';
	}
	static create(pos) {
		let basePos = pos.plus(new Vec(0.2, 0.1));
		// 避免所有硬币同步上下运动，每个硬币的起始阶段被随机分配。
		// Math.sin的波的相位为2PI，我们将Math.random返回的值乘以该数字，以使硬币在波动上具有随机起始位置。
		return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
	}
}
Coin.prototype.collide = function(state) {
	let filtered = state.actors.filter(a => a !== this);
	let status = state.status;
	if (!filtered.some(a => a.type === 'coin')) status = 'won';
	return new State(state.level, filtered, status);
};
Coin.prototype.size = new Vec(0.6, 0.6);

export default Coin;