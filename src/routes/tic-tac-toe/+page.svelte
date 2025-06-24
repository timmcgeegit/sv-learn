<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";

let positions = $state([
	null,null,null,null,null,null,null,null,null
]);
  let showWinnerDialog = $state(false);
let currentPlayer = $state('X');

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row  
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // other diagonal
]

function makeMove(currentValue) {
	if (checkWinner()){
		  showWinnerDialog = false;
		  setTimeout(() => { triggerWinner(); }, 10);
		return currentValue;
	} else {
		if (currentValue === null) {
			let markToPlace = currentPlayer;  
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			return markToPlace; 
		} else {
			return currentValue; 
		}
	}
  }

  function triggerWinner() {
	  showWinnerDialog = true;
  }
function resetGame() {
	positions = [null,null,null,null,null,null,null,null,null];
	currentPlayer = 'X';
}
function checkWinner() {
	for (let combo of winningCombos) {
		const [a, b, c] = combo;
		if (positions[a] && positions[a] === positions[b] && positions[a] === positions[c]){
			return positions[a]; 
		}
	}
	return null;
}
  $effect(() => {
	  if (winner) {
		  showWinnerDialog = true;
	  }
  });
let winner = $derived(checkWinner());
</script>
<main class="mt-5">
<h1 class="text-5xl font-bold text-center">Tic Tac Toe</h1>
{#if winner}<Dialog.Root open={showWinnerDialog}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title class="text-5xl text-center">{winner} Wins!</Dialog.Title>
      <Dialog.Description class="flex justify-center">
	<button class="newgame" onclick={resetGame}>New Game</button>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>{/if}
<section>
	<h3 class="text-2xl text-center mt-4">{currentPlayer}'s Turn</h3>
	<div class=" mt-2 mr-auto ml-auto max-w-[500px] grid grid-cols-3 grid-rows-3 auto-rows-fr gap-0">
		{#each positions as position, i}
			<div class="border border-gray-300 min-h-50 flex items-center justify-center text-center p-4"><button class="board" onclick={() => {positions[i] = makeMove(positions[i])}}>{positions[i]} </button>

			</div>
		{/each}
	</div>
</section>
	</main>

<style>
button.board {
	min-height: 150px;
	min-width: 150px;
	font-size: 80px;
	padding: 20px;
}
.newgame {
	padding: 10px;
	background: green;
	margin-top: 15px;
	color: white;
	font-size: 16px;
	
}
</style>
