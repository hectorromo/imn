	// var circle = {
 //      x: random(width),
 //      y: random(height),
 //      r: random(6, 36)
 //    }

 	// var overlapping = false;
  //   for (var j = 0; j < circles.length; j++) {
  //     var other = circles[j];
  //     var d = dist(circle.x, circle.y, other.x, other.y);
  //     if (d < circle.r + other.r) {
  //       overlapping = true;
  //     }
  //   }

module.exports = class Tile {
	constructor(x, y) {
		this.popularity = 40;
		this.artwork = 'https://www.popshopamerica.com/wp-content/uploads/2014/11/Olympic-Ayres-Magic-artwork.jpg';
		this.el = document.createElement('div');

		// this.create();
		this.setPosition();
		this.setStyles();
		this.setImage();
	}

	create() {
		let app = document.getElementById('app');
		app.appendChild(this.el);
	}

	setImage() {
		let img = document.createElement('img');
		img.src = this.artwork;
		this.el.appendChild(img);
	}
	
	setPosition() {
		this.x = Math.round( this.getRandom(0, window.innerHeight) );
		this.y = Math.round( this.getRandom(0, window.innerHeight) );
	}

	setStyles() {
		this.el.className = 'tile';

		this.el.style.width = this.popularity + '%';
		this.el.style.top = this.x + 'px';
		this.el.style.left = this.y + 'px';
		this.el.style.zIndex = 4;
	}


	move() {
		// ellipse(this.x, this.y, this.size, this.size);
		// console.log('sdfds');
	}

	getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}
}