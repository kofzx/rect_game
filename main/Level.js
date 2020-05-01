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

export default Level