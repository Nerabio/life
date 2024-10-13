import { Population } from "../life/agent";

export class PopulationRepository {

    private populationIteration: Map<number, Population> = new Map();
    private _iterator = 0;

    get iterator(): number {
        return this._iterator;
    }
    
    constructor(){}

    save(population: Population): void {
        this._iterator++;
        this.populationIteration.set(this.iterator, population);
    }

    extract(iterator: number): Population | undefined {
        return this.populationIteration.get(iterator);
    }
}