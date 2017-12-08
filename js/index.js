import Particle from './particle';
import Tile from './tile';

const MAX_PARTICLES = 5;
let particles = [];
let tiles = [];


function init() {
	for(let i = 0; i < MAX_PARTICLES-1; i++) {
		let p = new Particle();
		particles.push(p);
		p.create();
	}


	for(let i = 0; i < 20; i++) {
		let tile = new Tile();
		tiles.push(tile);
		tile.create();
	}
	
	// setInterval(() => {
	// 	update();
	// }, 100);
}

function update() {	
	for(let i = 0; i < particles.length; i++) {
		// particles[i].move();
	}
}


init();