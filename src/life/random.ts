import { AgentPosition, Population, createAgent } from "./agent";

interface RangeOption {
	start?: number;
	end?: number;
}

export function populateRandom(rows: number = 0, columns: number = 0, randomCoefficient: number = 0.5): Population {
	const population: Population = new Map<string, AgentPosition>();

	range({end: columns}).forEach((_, i) => {
		range({end: rows}).forEach((_, j) => {
			if (Math.random() <= randomCoefficient) return;
			population.set(`${i}:${j}`,createAgent(i, j));
		});
	});

	return population;
}

const range = (option: RangeOption): number[] => {
	const { end = 0, start = 0} = option;
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}