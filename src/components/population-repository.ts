import { Population } from "../life/agent";



type fnCallback = (iterator: number) => number;

export class PopulationRepository {

    private populationIteration: Map<number, Population> = new Map();
    private _iterator = 0;
    private observer: Array<fnCallback> = []

    get iterator(): number {
        return this._iterator;
    }
    
    constructor(){}

    subscribeIterator(fn: fnCallback): void {
        this.observer.push(fn);
    }

    save(population: Population): void {
        this._iterator++;
        this.populationIteration.set(this.iterator, population);
        this.applyCallBack();
    }

    extract(iterator: number): Population | undefined {
        return this.populationIteration.get(iterator);
    }

    private applyCallBack(): void{
        this.observer.forEach((fn) => fn(this.iterator));
    }
}