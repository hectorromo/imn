// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({9:[function(require,module,exports) {
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
},{}],11:[function(require,module,exports) {
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
},{}],6:[function(require,module,exports) {
"use strict";

var _particle = require("./particle");

var _particle2 = _interopRequireDefault(_particle);

var _tile = require("./tile");

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_PARTICLES = 5;
let particles = [];
let tiles = [];

function init() {
  for (let i = 0; i < MAX_PARTICLES - 1; i++) {
    let p = new _particle2.default();
    particles.push(p);
    p.create();
  }

  for (let i = 0; i < 20; i++) {
    let tile = new _tile2.default();
    tiles.push(tile);
    tile.create();
  }

  // setInterval(() => {
  // 	update();
  // }, 100);
}

function update() {
  for (let i = 0; i < particles.length; i++) {
    // particles[i].move();
  }
}

init();
},{"./particle":9,"./tile":11}],0:[function(require,module,exports) {
var global = (1,eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:56331/');
  ws.onmessage = (e) => {
    var data = JSON.parse(e.data);

    if (data.type === 'update') {
      for (let asset of data.assets) {
        hmrApply(global.require, asset);
      }

      for (let asset of data.assets) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      }
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  let parents = [];
  for (let k in modules) {
    for (let d in modules[k][1]) {
      let dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    let fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  let cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(id => hmrAccept(global.require, id));
}
},{}]},{},[0,6])