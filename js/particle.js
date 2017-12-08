module.exports = class Particle {
	constructor(x, y) {
		this.x = Math.round( this.getRandom(0, window.innerHeight) );
		this.y = Math.round( this.getRandom(0, window.innerHeight) );
		this.size = Math.round( this.getRandom(20, 800) );
		this.colors = [
			'rgb(28, 28, 28)',
			'rgb(25, 25, 25)',
			'rgb(20, 20, 20)',
			'rgb(15, 15, 15)'
		]
	}

	create() {
		let wrapper = document.getElementById('background');
		let el = document.createElement('div');
		let color = Math.round( this.getRandom(0, this.colors.length-1) );
		
		el.className = 'circle';


		el.style.backgroundColor = this.colors[color];
		el.style.width = this.size + 'px';
		el.style.height = this.size + 'px';
		el.style.top = this.x + 'px';
		el.style.left = this.y + 'px';
		el.style.zIndex = -1;
		
		wrapper.appendChild(el);
	}

	move() {
		// ellipse(this.x, this.y, this.size, this.size);
		console.log('sdfds');
	}

	getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}
}