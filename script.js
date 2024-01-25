const colors = [...document.querySelectorAll('.genius div')].reverse();
const genius = document.querySelector('.genius');

const startGame = document.querySelector('#startGame');
const myScore = document.querySelector('.score > span');
const myScore2 = document.querySelector('.score2 > span');
const myRecord = document.querySelector('.recorde > span');
const myPoints = document.querySelector('.points');

const windowGameOver = document.querySelector('.game-over');
const btnRestart = document.querySelector('#restart');

const windowNextLevel = document.querySelector('.next-level');
const btnImReady = document.querySelector('#imReady');

const lightDark = document.querySelector('.dark_mode');

let order = [];
let clickedOrder = [];
let score = 0;
let record = 0;
let cookie = '';
let cookieValue = getCookieValue("cookieRecord") || 0;
let startGenius = false;

const date = new Date();
date.setTime(date.getTime() + (1*24*60*60*1000));
var expires = `expires= ${date.toUTCString()}`;

// Valor de um cookie
function getCookieValue(cookieName) {
	const cookieMatch = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
	return cookieMatch ? parseInt(cookieMatch[2]) : null;
}

window.addEventListener('load', () => {
	myRecord.innerHTML = cookieValue;
});

lightDark.onclick = () => {
	document.body.classList.toggle('dark_theme');
	document.body.classList.toggle('light_theme');
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
		nextLevel();
	}
}

//funcao para o clique do usuário
let handleClick = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
	return colors[color];
}

//funcao para proximo level do jogo
let nextLevel = () => {
	if(!startGenius) {
		shuffleOrder();
		startGenius = true;
	} else {
		btnImReady.disabled = false;
		windowNextLevel.classList.remove('disabled');
	}
}

//funcao para game over
let gameOver = () => {
	myScore2.innerHTML = score;

	btnRestart.disabled = false;
	windowGameOver.classList.remove('disabled');

	order = [];
	clickedOrder = [];
}

//funcao inicia jogo
let playGame = () => {
	score = 0;
	startGenius = false;
	myScore.innerHTML = score;
	genius.classList.remove('disabled');
	myPoints.classList.remove('disabled');
	nextLevel();
}

//eventos de clique para as cores
colors.forEach((color, index) => color.addEventListener('click', () => handleClick(index)));

//inicia o jogo
startGame.addEventListener('click', () => {
	setTimeout(() => {
		playGame();
		startGame.disabled = true;
	},500);
});

btnRestart.addEventListener('click', () => {
	setTimeout(() => {
		windowGameOver.classList.add('disabled');
		windowNextLevel.classList.add('disabled');
		btnRestart.disabled = true;
		playGame();
	}, 500);
});

btnImReady.addEventListener('click', () => {
	score++;
	record = Math.max(score, record);

	if (record > cookieValue) {
		cookieValue = record;
		document.cookie = `cookieRecord=${cookieValue}; ${expires}; path=/;`;
}

	setTimeout(() => {
		windowNextLevel.classList.add('disabled');
		btnImReady.disabled = true;
		shuffleOrder();
	}, 500);
	
	myScore.innerHTML = score;
	myRecord.innerHTML = cookieValue;
});