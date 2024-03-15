import { World } from "../life/world";

export class Drawer {
    canvas!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    kernel: number = 0;
    width: number = 0;
    height: number = 0;
    rows: number = 0;
    columns: number = 0;

	constructor(kernelSize: number) {
		this.canvas = this.getCanvasElement();
		this.context = this.getCanvasRenderingContext2D(this.canvas);
		this.kernel = kernelSize;
		this.width = this.canvas.offsetWidth;
		this.height = this.canvas.offsetHeight;

		// Рассчитываем количество колонок и рядов на поле:
		this.rows = Math.floor(this.height / this.kernel);
		this.columns = Math.floor(this.width / this.kernel);

		// Нормализуем отображение на экранах с высокой плотностью пикселей:
		this.normalizeScale();
	}

    normalizeScale = () => {
		const { devicePixelRatio: pixelRatio } = window;

		if (pixelRatio > 1) {
			this.canvas.width = this.width * pixelRatio;
			this.canvas.height = this.height * pixelRatio;
			this.canvas.style.width = `${this.width}px`;
			this.canvas.style.height = `${this.height}px`;
			this.context.scale(pixelRatio, pixelRatio);
		}
	};

    drawGrid = () => {
		this.context.strokeStyle = 'rgba(0,0,0, 0.3)';

		// Вертикальные линии:
		for (let i = 0; i < this.width; i += this.kernel) {
			this.context.beginPath();
			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.height);
			this.context.stroke();
		}

		// Горизонтальные линии:
		for (let j = 0; j < this.height; j += this.kernel) {
			this.context.beginPath();
			this.context.moveTo(0, j);
			this.context.lineTo(this.width, j);
			this.context.stroke();
		}
	};

    drawWorld = (world: World) => {
		this.context.fillStyle = '#000000';

		world.agents.forEach((agent) => {
			this.context.fillRect(agent.x * this.kernel, agent.y * this.kernel, this.kernel, this.kernel);
		});
	};

    reset = () => {
		this.context.clearRect(0, 0, this.width, this.height);
		this.drawGrid();
	};

	private getCanvasElement = (): HTMLCanvasElement => {
		const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
		if (!canvasElement) {
			throw new Error('Canvas elemen not found');
		}
		return canvasElement;
	}

	private getCanvasRenderingContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D =>{
		const context2D = canvas.getContext('2d');
		if (!context2D || !(context2D instanceof CanvasRenderingContext2D)) {
			throw new Error('Failed to get 2D context');
		}
		return context2D;
	}
}