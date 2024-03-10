export interface AgentPosition {
    x: number;
    y: number;
}

export interface Population {
    [key: string]: AgentPosition;
}

export function createAgent(x: number, y: number): AgentPosition {
	return { x, y };
}

export function isAlive(agent: AgentPosition, population: Population) {
	return !!population[`${agent.x}:${agent.y}`];
}

export function neighborsOf(agent: AgentPosition): AgentPosition[] {
    const {x, y} = agent;
	return [
		// Соседи сверху:
		{ x: x - 1, y: y - 1 },
		{ x, y: y - 1 },
		{ x: x + 1, y: y - 1 },

		// ...С каждой стороны:
		{ x: x - 1, y },
		{ x: x + 1, y },

		// ...И под указанной клеткой:
		{ x: x - 1, y: y + 1 },
		{ x, y: y + 1 },
		{ x: x + 1, y: y + 1 }
	];
}

export function countAliveAround(agent: AgentPosition, population: Population): number {
	return neighborsOf(agent).reduce((total, agent) => {
		return total + (isAlive(agent, population) ? 1 : 0);
	}, 0);
}

export function makeKeyPosition(agent: AgentPosition): string {
    return `${agent.x}:${agent.y}`;
}