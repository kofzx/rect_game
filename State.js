class State {
	constructor(level, actors, status) {
		this.level = level;
		this.actors = actors;
		this.status = status;
	}
	static start(level) {
		return new State(level, level.startActions, 'playing');
	}
	get player() {
		return this.actions.find(a => a.type === 'player');
	}
}