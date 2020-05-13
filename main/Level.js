import Vec from '../utils/Vec.js'
import levelChars from '../utils/levelChars.js'

class Level {
	constructor(plan) {
		let rows = plan.trim().split("\n").map(l => [...l]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.startActors = [];

		// 根据地图建立坐标系概念，左上角为(0,0)
		this.rows = rows.map((row, y) => {
			return row.map((ch, x) => {
				let type = levelChars[ch];
				if (typeof type === 'string') return type;
				this.startActors.push(
					type.create(new Vec(x, y), ch)
				);
				return 'empty';
			});
		});
	}
}
// pos跟size是指定矩形的属性
// 该方法旨在指定位置的矩形跟其他类型元素的碰撞检测
Level.prototype.touches = function(pos, size, type) {
	var xStart = Math.floor(pos.x);
	var xEnd = Math.ceil(pos.x + size.x);
	var yStart = Math.floor(pos.y);
	var yEnd = Math.ceil(pos.y + size.y);

	// 按行遍历
	for (var y = yStart; y < yEnd; y++) {
		for (var x = xStart; x < xEnd; x++) {
			// 是否超出画布边界
			let isOutside = x < 0 || x >= this.width ||
							y < 0 || y >= this.height;
			let here = isOutside ? 'wall' : this.rows[y][x];
			if (here == type) return true;
		}
	}
	return false;
};

export default Level