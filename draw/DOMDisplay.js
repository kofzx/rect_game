const { elt } = require('../utils/utils.js')

const scale = 20;

function drawGrid(level) {
	return elt('table', {
		class: 'background',
		style: `width: ${level.width * scale}px;`
	}, ...level.rows.map(row => 
		elt('tr', { style: `height: ${scale}px` }, ...row.map(type => 
			elt('td', { class: type })
		))
	))
}
function drawActors(actors) {
	return elt('div', {}, ...actors.map(actor => {
		let rect = elt('div', { class: `actor ${actor.type}` });
		
		rect.style.width = `${actor.size.x * scale}px`;
		rect.style.height = `${actor.size.y * scale}px`;
		rect.style.left = `${actor.pos.x * scale}px`;
		rect.style.top = `${actor.pos.y * scale}px`;

		return rect;
	}));
}
class DOMDisplay {
	constructor(parent, level) {
		this.dom = elt('div', { class: 'game' }, drawGrid(level));
		this.actorLayer = null;
		parent.appendChild(this.dom);
	}
	clear() {
		this.dom.remove();
	}
}