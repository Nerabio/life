import { PopulationRepository } from "../population-repository";

export class ControlPanel {
    private controlPanelElement = document.getElementById("control-panel") as HTMLElement;
    private sliderInputElement = document.getElementById('slider') as HTMLInputElement;
    private displayValue = document.getElementById("value") as HTMLElement;

    constructor(){
        this.initControlPanel();
    }

    initControlPanel = () => {
        this.showControlPanel();
        this.sliderInputElement?.addEventListener("change", this.onChangeInput.bind(this))
    }

    showControlPanel = () => {
        this.controlPanelElement.classList.remove('hide');
    }

    onChangeInput(event: Event): void {        
        const value = event.target ? event.target?.value : 0;
        if(this.displayValue){
            this.displayValue.textContent = value;
        }
    }

    changeIteratorPopulation(iterator: number): void {
        const value = iterator.toString();
        this.sliderInputElement.max = value;
        this.sliderInputElement.value = value;
        
    }    
}

