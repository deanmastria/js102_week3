// Define hands and handImages as before
const hands = ['rock', 'paper', 'scissors'];
const handImages = {
    rock: '/path/to/rock.png',
    paper: '/path/to/paper.png',
    scissors: '/path/to/scissors.png'
};

// Define players with empty names and initial score
let players = {
    player1: { name: '', hand: '', score: 0 },
    player2: { name: '', getHand: () => hands[Math.floor(Math.random() * hands.length)], score: 0 }
};

// Variables to track tournament state and game outcomes
let tournamentStarted = false;
let game1Outcome = null; // Outcome of game 1 ('player1', 'player2', 'draw')

// Function to enable name input and set player name
function enableNameInput(playerId) {
    const inputField = document.getElementById(playerId);
    const playerButton = document.getElementById(`button-addon1-${playerId}`);
    
    if (inputField.value.trim() !== '') {
        players[playerId].name = inputField.value.trim();
        playerButton.disabled = false;
        inputField.disabled = true;
        playerButton.textContent = players[playerId].name;
        enableStartTournamentButton(); // Check if all players are entered after each input
    } else {
        alert("Please enter a name before enabling the button.");
    }
}

// Function to check if all players have entered names
function allPlayersEntered() {
    return (
        players.player1.name !== '' &&
        players.player2.name !== '' 
    );
}

// Event listeners for player name inputs and Start Tournament button
document.getElementById('player1').addEventListener('input', function() {
    enableNameInput('player1');
});
document.getElementById('player2').addEventListener('input', function() {
    enableNameInput('player2');
});

// Event listener for Start Tournament button
document.querySelector('.btn-outline-primary').addEventListener('click', function() {
    if (allPlayersEntered()) {
        tournamentStarted = true;
        document.querySelector('.btn-outline-primary').disabled = true; // Disable after starting tournament
        document.getElementById('play-game1').disabled = false;
    } else {
        alert("Please enter names for all players before starting the tournament.");
    }
});

// Event listener for Game 1 Play button
document.getElementById('play-game1').addEventListener('click', function() {
    if (tournamentStarted) {
        // Player 1's hand is chosen manually
        const hand1 = players.player1.hand;
        // Player 2's hand is generated randomly
        const hand2 = players.player2.getHand();
        
        // Validate Player 1's hand choice
        if (hand1 && hand2) {
            const result = playRound(players.player1, players.player2);
            updateGameUI('game1', result, players.player1, players.player2);
            game1Outcome = result.winner === 'draw' ? 'draw' : result.winner.name;
            
            // Check if any player has won the tournament (reached 3 wins)
            if (players.player1.score === 3 || players.player2.score === 3) {
                endGame();
            }
        } else {
            alert("Please choose a hand for Player 1.");
        }
    }
});

// Event listener for Player 1's hand choice buttons (rock, paper, scissors)
document.getElementById('rock-btn').addEventListener('click', function() {
    players.player1.hand = 'rock';
    playGameRound();
});
document.getElementById('paper-btn').addEventListener('click', function() {
    players.player1.hand = 'paper';
    playGameRound();
});
document.getElementById('scissors-btn').addEventListener('click', function() {
    players.player1.hand = 'scissors';
    playGameRound();
});

// Function to play a round between two players
function playRound(player1, player2) {
    const hand1 = player1.hand;
    const hand2 = player2.getHand(); // Player 2's hand is still randomly generated
    let winner = null;

    if (hand1 === hand2) {
        winner = 'draw';
    } else if (
        (hand1 === 'rock' && hand2 === 'scissors') ||
        (hand1 === 'paper' && hand2 === 'rock') ||
        (hand1 === 'scissors' && hand2 === 'paper')
    ) {
        winner = player1;
        player1.score++;
    } else {
        winner = player2;
        player2.score++;
    }

    return { hand1, hand2, winner };
}

// Function to update UI after each game round
function updateGameUI(gameId, result, player1, player2) {
    const gameHand = document.getElementById(`${gameId}-hand`);
    const gameResult = document.getElementById(`${gameId}-result`);
    const gameScore = document.getElementById(`${gameId}-score`);

    // Update the hand images
    gameHand.src = handImages[result.hand1];
    gameHand.alt = result.hand1;

    // Update the result text
    if (result.winner === 'draw') {
        gameResult.textContent = "It's a draw!";
    } else {
        gameResult.textContent = `${result.winner.name} wins!`;
    }

    // Update the score text
    gameScore.textContent = `${player1.name}: ${player1.score}, ${player2.name}: ${player2.score}`;
}

// Function to end the tournament after a player reaches 3 wins
function endGame() {
    tournamentStarted = false;
    document.getElementById('play-game1').disabled = true;

    // Determine and display champion
    let champion;
    if (players.player1.score === 3) {
        champion = players.player1.name;
    } else if (players.player2.score === 3) {
        champion = players.player2.name;
    }
    document.getElementById('champion').textContent = `${champion} is the World Champion!`;
}