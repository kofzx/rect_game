import Vec from '../utils/Vec.js'
import State from '../main/State.js'

class Monster {
	constructor(pos, speed) {
		this.pos = pos;
		this.speed = speed;
	}
	get type() {
		return 'monster';
	}
	static create(pos) {
		return new Monster(pos, new Vec(2, 0));
	}
}
Monster.prototype.update = function(time, state) {
	let newPos = this.pos.plus(this.speed.times(time));
	if (!state.level.touches(newPos, this.size, 'wall')) {
		return new Monster(newPos, this.speed);
	}
	// 碰到了墙
	else {
		return new Monster(this.pos, this.speed.times(-1));
	}
}
Monster.prototype.collide = function(state) {
	return new State(state.level, state.actors, 'lost');
}
Monster.prototype.size = new Vec(1.2, 1);

export default Monster;