const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const turnDisplay = document.querySelector("#turn-display");

function updateBoard() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].textContent = gameBoard[i];
	}
}

function checkWinner() {
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let combo of winningCombos) {
		const [a, b, c] = combo;
		if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
			return gameBoard[a];
		}
	}

	if (gameBoard.every((cell) => cell !== "")) {
		return "tie";
	}

	return null;
}

function handleClick(event) {
	const cell = event.target;
	const index = parseInt(cell.getAttribute("id"));

	// Verifica se a célula já está preenchida
	if (gameBoard[index]) {
		return;
	}

	// Atualiza o tabuleiro do jogo
	gameBoard[index] = currentPlayer;
	updateBoard();

	// Verifica se houve um vencedor ou empate
	const winner = checkWinner();
	if (winner) {
		// Mostra a mensagem de fim de jogo
		if (winner === "tie") {
			turnDisplay.textContent = "Empate!";
		} else {
			turnDisplay.textContent = `${winner} venceu!`;
		}

		// Desabilita o clique nas células
		for (let cell of cells) {
			cell.removeEventListener("click", handleClick);
		}
	} else {
		// Alterna o jogador atual
		currentPlayer = currentPlayer === player1 ? player2 : player1;
		turnDisplay.textContent = `É a vez de ${currentPlayer}`;
	}
}

// Adiciona o manipulador de eventos de clique em cada célula
for (let cell of cells) {
	cell.addEventListener("click", handleClick);
}

// Mostra o jogador inicial
turnDisplay.textContent = `É a vez de ${currentPlayer}`;

