import { Population,AgentPosition, countAliveAround, neighborsOf, createAgent, makeKeyPosition} from "./agent";
import { populateRandom } from "./random";

export interface EvolvePopulation {
    [key: string]: AgentPosition;
}

export interface CheckedAgentPosition {
    [key: string]: boolean;
}

export class World {
    population: Population;
    columns: number = 0;
    rows: number = 0;

	constructor(rows: number, columns: number, population: Population = populateRandom(rows, columns)) {
		this.rows = rows;
		this.columns = columns;
		this.population = population;
	}

    get agents() {
        return Object.values(this.population);
    }

    evolve = () => {
        const evolved: EvolvePopulation = {};
        const checked: CheckedAgentPosition = {};
    
        this.agents.forEach((agent) => {
            const alive = countAliveAround(agent, this.population);
    
            if (alive === 2 || alive === 3) {
                evolved[makeKeyPosition(agent)] = agent;
            }
    
            // TODO: Проверить соседей…

            neighborsOf(agent).forEach((neighbor) => {
                
                const positionKey = makeKeyPosition(neighbor);
        
                if (checked[positionKey]) return;
                checked[positionKey] = true;
        
                if (countAliveAround(neighbor, this.population) !== 3) return;
                evolved[positionKey] = createAgent(neighbor.x, neighbor.y);
            });
        });

        this.population = evolved;
        
	};
}