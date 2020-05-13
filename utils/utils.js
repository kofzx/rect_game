import Level from '../main/Level.js'
import State from '../main/State.js'

function elt(name, attrs, ...children) {
	let dom = document.createElement(name);
	for (let attr of Object.keys(attrs)) {
		dom.setAttribute(attr, attrs[attr]);
	}
	for (let child of children) {
		dom.appendChild(child);
	}
	return dom;
}
// 碰撞检测简单实现（边界测试）
function overlap(actor1, actor2) {
	console.log(actor1.pos, actor2.pos);
	return actor1.pos.x + actor1.size.x > actor2.pos.x &&
		   actor1.pos.x < actor2.pos.x + actor2.size.x &&
		   actor1.pos.y + actor1.size.y > actor2.pos.y &&
		   actor1.pos.y < actor2.pos.y + actor2.size.y;
}
function trackKeys(keys) {
	let down = Object.create(null);
	function track(event) {
		if (keys.includes(event.key)) {
			down[event.key] = event.type == 'keydown';
			event.preventDefault();
		}
	}
	window.addEventListener('keydown', track);
	window.addEventListener('keyup', track);
	return down;
}
// addEventListener to window
const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

function runAnimation(frameFunc) {
	let lastTime = null;
	function frame(time) {
		if (lastTime != null) {
			// 取最小值，并将毫秒转换为秒（magic is that / 1000）
			let timeStep = Math.min(time - lastTime, 100) / 1000;
			if (frameFunc(timeStep) === false) return;
		}
		lastTime = time;
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}
function runLevel(level, Display) {
	let display = new Display(document.body, level);
	let state = State.start(level);
	let ending = 1;
	return new Promise(resolve => {
		runAnimation(time => {
			state = state.update(time, arrowKeys);
			display.syncState(state);
			if (state.status === 'playing') {
				return true;
			} else if (ending > 0) {
				ending -= time;
				return true;
			} else {
				display.clear();
				resolve(state.status);
				return false;
			}
		})
	})
}
async function runGame(plans, Display) {
	for (let level = 0; level < plans.length;) {
		let status = await runLevel(new Level(plans[level]), Display);
		if (status == 'won') level++;
	}
	console.log(`You've won!`);
}

export {
	elt,
	overlap,
	trackKeys,
	runAnimation,
	runLevel,
	runGame
};