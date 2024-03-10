import { Population, createAgent } from "./agent";

export function populateRandom(rows: number = 0, columns: number = 0): Population {
	const population: Population = {};

	range(0,columns).forEach((_, i) => {
		range(0, rows).forEach((_, j) => {
			if (Math.random() <= 0.5) return;
			population[`${i}:${j}`] = createAgent(i, j);
		});
	});

	return population;
}

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}