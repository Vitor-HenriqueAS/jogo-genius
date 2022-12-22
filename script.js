let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const genius = document.querySelector('.genius');

const startGame = document.querySelector('#startGame');
const myScore = document.querySelector('.score');
const myScore2 = document.querySelector('.score2');

const windowGameOver = document.querySelector('.game-over');
const btnRestart = document.querySelector('#restart');

const windowNextLevel = document.querySelector('.next-level');
const btnImReady = document.querySelector('#imReady');

const lightDark = document.querySelector('.light-dark');

lightDark.onclick = () => {
	document.body.classList.toggle('dark-theme');
	document.body.classList.toggle('light-theme');
}

//Cria ordem aleatória de Cores
let shuffleOrder = () => {
	let colorOrder = Math.floor(Math.random() * 4);
	order[order.length] = colorOrder;
	clickedOrder = [];

	for(let i in order) {
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i) + 1);
	}
}

//Acende a próxima cor
let lightColor = (element, number) => {
	number = number * 500;

	setTimeout(() => {
		element.classList.add('selected');
	}, number - 250);

	setTimeout(() => {
		element.classList.remove('selected');
	}, number);
}

//checa se os botoes clicados são as mesmas ordem geradas no jogo
let checkOrder = () => {
	for(let i in clickedOrder) {
		if(clickedOrder[i] != order[i]) {
			gameOver();
			break;
		}
	}
	if(clickedOrder.length == order.length) {
		myScore.innerHTML = `Minha Pontuação: ${score}`;

		nextLevel();
	}
}

//funcao para o clique do usuário
let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
	if(color == 0) {
		return green;
	} else if(color == 1) {
		return red;
	} else if(color == 2) {
		return yellow;
	} else if(color == 3) {
		return blue;
	}
}

//funcao para proximo level do jogo
let nextLevel = () => {
	score++;

	if(score == 1) {
		shuffleOrder();
	} else {
		btnImReady.disabled = false;
		windowNextLevel.classList.remove('disabled');
	}
}

//funcao para game over
let gameOver = () => {
	myScore2.innerHTML = `Sua Pontuação foi : ${score}`;

	btnRestart.disabled = false;
	windowGameOver.classList.remove('disabled');

	order = [];
	clickedOrder = [];
}

//funcao inicia jogo
let playGame = () => {
	score = 0;
	myScore.innerHTML = `Minha Pontuação: ${score}`;
	genius.classList.remove('disabled');
	myScore.classList.remove('disabled');
	nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicia o jogo
startGame.onclick = () => {
	setTimeout(() => {
		playGame();
		startGame.disabled = true;
	},500);
}


btnRestart.onclick = () => {
	setTimeout(() => {
		windowGameOver.classList.add('disabled');
		windowNextLevel.classList.add('disabled');
		btnRestart.disabled = true;
		playGame();
	}, 500)
}

btnImReady.onclick = () => {
	setTimeout(() => {
		windowNextLevel.classList.add('disabled');
		btnImReady.disabled = true;
		shuffleOrder();
	}, 500)
}
