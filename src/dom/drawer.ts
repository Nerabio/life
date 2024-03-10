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
        const findCanvasElement = document.getElementById('canvas');
        if(findCanvasElement === null){
            return;
        }

		this.canvas = findCanvasElement;

		this.context = this.canvas.getContext('2d');
		const [width, height] = [this.canvas.offsetWidth, this.canvas.offsetHeight];

		// Сохраняем ссылки на контекст и настройки:

		this.kernel = kernelSize;

		this.width = width;
		this.height = height;

		// Рассчитываем количество колонок и рядов на поле:
		this.rows = Math.floor(height / this.kernel);
		this.columns = Math.floor(width / this.kernel);

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
}