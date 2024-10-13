import { PopulationRepository } from './components/population-repository';
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
const populationRepository = new PopulationRepository();

function liveGeneration(world: World, drawer: Drawer) {
	const evolvePopulation = world.evolve();
	drawer.render(world.agents);
	populationRepository.save(evolvePopulation);
	input.max = populationRepository.iterator.toString();
	input.value = populationRepository.iterator.toString();
	value.textContent = populationRepository.iterator.toString();
}

let stateGame: 'paused' | 'starting' | 'stop' = 'paused';

function gameLoop() {
	if(stateGame !== 'starting'){
		return;
	}
	liveGeneration(world, drawer);
	setTimeout(() => window.requestAnimationFrame(gameLoop), 100);
};




const startBtn =  document.getElementById('startBtn');
startBtn?.addEventListener('click', () => {
	stateGame = 'starting';
	gameLoop();
});

const stopBtn =  document.getElementById('stopBtn');
stopBtn?.addEventListener('click', () => {
	stateGame = 'stop';
});

const input =  document.getElementById('slider') as HTMLInputElement;
const value = document.getElementById("value");

input?.addEventListener("change", (event) => {
	stateGame = 'stop';
	const populationCount = event.target ? event.target?.valueAsNumber : 0;
	
	const currentPopulation = populationRepository.extract(populationCount);
	if(currentPopulation){
		drawer.render(Array.from(currentPopulation.values()));
	}
	if(value){
	  value.textContent = populationCount;
	}
});