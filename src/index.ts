import { Drawer } from './dom/drawer';
import { World } from './life/world';

// const population = {
// 	'5:4': { x: 5, y: 4 },
// 	'6:4': { x: 6, y: 4 },
// 	'7:4': { x: 7, y: 4 },
// };

// const world = new World(5, 5, population);


// world.evolve();
// console.log(world.population);
// // {1:0: {x: 1, y: 0}, 1:2: {x: 1, y: 2}, 1:1: {x: 1, y: 1}}

// world.evolve();
// console.log(world.population);
// // {0:1: {x: 0, y: 1}, 2:1: {x: 2, y: 1}, 1:1: {x: 1, y: 1}}

// neighborsOf({ x: 1, y: 1}).forEach((agent) => {
// console.log(`${agent.x}:${agent.y}`,isAlive(agent, population));
// });

const drawer = new Drawer(15);
const world = new World(50, 50);

function liveGeneration() {
	drawer.reset();
	world.evolve();
	drawer.drawGrid();
	drawer.drawWorld(world);
}

(function gameLoop() {
	liveGeneration();
	setTimeout(() => window.requestAnimationFrame(gameLoop), 200);
})();


