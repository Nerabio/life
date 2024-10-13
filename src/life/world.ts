import { Population, countAliveAround, neighborsOf, createAgent, makeKeyPosition, AgentPosition} from "./agent";
import { populateRandom } from "./random";


export class World {
    population: Population;
    columns: number = 0;
    rows: number = 0;

    checked = new Set<string>();
    

	constructor(rows: number, columns: number, population: Population = populateRandom(rows, columns)) {
		this.rows = rows;
		this.columns = columns;
		this.population = population;
	}

    get agents() {
        return Array.from(this.population.values());
    }

    evolve = (): Population => {
        this.checked.clear();
        const evolvedPopulation: Population = new Map<string, AgentPosition>();

        this.agents.forEach((agent) => {
            const alive = countAliveAround(agent, this.population);
    
            if (alive === 2 || alive === 3) {
                evolvedPopulation.set(makeKeyPosition(agent), agent);
            }
    
            // TODO: Проверить соседей…

            neighborsOf(agent).forEach((cell) => {
                
                const positionKey = makeKeyPosition(cell);
        
                if (this.checked.has(positionKey)) return;
                this.checked.add(positionKey);
        
                if (countAliveAround(cell, this.population) !== 3) return;
                evolvedPopulation.set(positionKey, createAgent(cell.x, cell.y));
            });
        });

        this.population = evolvedPopulation;
        return evolvedPopulation;
	};
}