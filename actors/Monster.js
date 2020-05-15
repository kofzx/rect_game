import Vec from '../utils/Vec.js'

class Monster {
	constructor(pos, speed) {
		this.pos = pos;
		this.speed = speed;
	}
	get type() {
		return 'monster';
	}
	static create(pos) {
		return new Monster(pos.plus(new Vec(0, -1)));
	}
}
Monster.prototype.update = function(time) {

}
Monster.prototype.collide = function(state) {

}
Monster.prototype.size = new Vec(1.2, 2);

export default Monster;