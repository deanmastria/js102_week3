// Define hands and handImages as before
const hands = ['rock', 'paper', 'scissors']; // Possible hand choices
const handImages = { // Hand images for UI
    rock: '/path/to/rock.png',
    paper: '/path/to/paper.png',
    scissors: '/path/to/scissors.png'
};

// Define players with empty names and initial score
let players = {
    player1: { name: '', hand: '', score: 0 },                                                                      // Player 1 details
    player2: { name: '', getHand: () => hands[Math.floor(Math.random() * hands.length)], score: 0 }                 // Player 2 details with random hand generator
};

// Variables to track tournament state and game outcomes
let tournamentStarted = false;                                                                                      // Tournament state
let game1Outcome = null;                                                                                            // Outcome of game 1 ('player1', 'player2', 'draw')

// Function to enable name input and set player name
function enableNameInput(playerId) {
    const inputField = document.getElementById(playerId);                                                           // Input field element
    const playerButton = document.getElementById(`button-addon1-${playerId}`);                                      // Button to enable
    
    if (inputField.value.trim() !== '') {                                                                           // Check if input is not empty
        players[playerId].name = inputField.value.trim();                                                           // Set player name
        playerButton.disabled = false;                                                                              // Enable button
        inputField.disabled = true;                                                                                 // Disable input field
        playerButton.textContent = players[playerId].name;                                                          // Set button text to player name
        enableStartTournamentButton();                                                                              // Check if all players are entered after each input
    } else {
        alert("Please enter a name before enabling the button.");                                                   // Alert if input is empty
    }
}

// Function to check if all players have entered names
function allPlayersEntered() {
    return (
        players.player1.name !== '' &&                                                                              // Check player 1 name
        players.player2.name !== ''                                                                                 // Check player 2 name
    );
}

// Enable start tournament button and apply flashing effect
function enableStartTournamentButton() {
    if (allPlayersEntered()) {                                                                                      // Check if all players entered names
        tournamentStarted = true;                                                                                   // Set tournament state to true
        const startButton = document.querySelector('.btn-outline-primary');                                         // Start button element
        startButton.disabled = false;                                                                               // Enable start button
        startButton.classList.add('flash');                                                                         // Add flashing effect
    }
}

// Event listener for Start Tournament button
document.querySelector('.btn-outline-primary').addEventListener('click', function() {
    if (allPlayersEntered()) {                                                                                      // Check if all players entered names
        tournamentStarted = true;                                                                                   // Set tournament state to true
        const startButton = document.querySelector('.btn-outline-primary');                                         // Start button element
        startButton.disabled = true;                                                                                // Disable after starting tournament
        startButton.classList.remove('flash');                                                                      // Remove flashing effect
        document.getElementById('play-game1').disabled = false;                                                     // Enable Play Game 1 button
    } else {
        alert("Please enter names for all players before starting the tournament.");                                // Alert if not all players entered names
    }
});

// Event listeners for player name inputs and Start Tournament button
document.getElementById('player1').addEventListener('input', function() {
    enableNameInput('player1');                                                                                     // Enable input for player 1
});
document.getElementById('player2').addEventListener('input', function() {
    enableNameInput('player2');                                                                                     // Enable input for player 2
});

// Event listener for Game 1 Play button
document.getElementById('play-game1').addEventListener('click', function() {
    if (tournamentStarted) {                                                                                        // Check if tournament started
        const hand1 = players.player1.hand;                                                                         // Player 1's hand is chosen manually
        const hand2 = players.player2.getHand();                                                                    // Player 2's hand is generated randomly
        
        if (hand1 && hand2) {                                                                                       // Validate Player 1's hand choice
            const result = playRound(players.player1, players.player2);                                             // Play round and get result
            updateGameUI('game1', result, players.player1, players.player2);                                        // Update UI with result
            game1Outcome = result.winner === 'draw' ? 'draw' : result.winner.name;                                  // Set game 1 outcome
            
            if (players.player1.score === 3 || players.player2.score === 3) {                                       // Check if any player has won the tournament (reached 3 wins)
                endGame();                                                                                          // End game if a player wins
            }
        } else {
            alert("Please choose a hand for Player 1.");                                                            // Alert if Player 1's hand is not chosen
        }
    }
});

// Event listener for Player 1's hand choice buttons (rock, paper, scissors)
document.getElementById('rock-btn').addEventListener('click', function() {
    players.player1.hand = 'rock';                                                                                  // Set Player 1's hand to rock
    updateActiveButton('rock-btn');                                                                                 // Update active button highlighting
    playGameRound();                                                                                                // Play game round
});
document.getElementById('paper-btn').addEventListener('click', function() {
    players.player1.hand = 'paper';                                                                                 // Set Player 1's hand to paper
    updateActiveButton('paper-btn');                                                                                // Update active button highlighting
    playGameRound();                                                                                                // Play game round
});
document.getElementById('scissors-btn').addEventListener('click', function() {
    players.player1.hand = 'scissors';                                                                              // Set Player 1's hand to scissors
    updateActiveButton('scissors-btn');                                                                             // Update active button highlighting
    playGameRound();                                                                                                // Play game round
});

// Function to update active button highlighting
function updateActiveButton(buttonId) {
    document.querySelectorAll('.hand-btn').forEach(btn => {                                                         // Remove 'active' class from all buttons
        btn.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');                                                      // Add 'active' class to the clicked button
}

// Function to play a round between two players
function playRound(player1, player2) {
    const hand1 = player1.hand;                                                                                     // Player 1's hand
    const hand2 = player2.getHand();                                                                                // Player 2's hand is still randomly generated
    let winner = null;

    if (hand1 === hand2) {                                                                                          // Check for draw
        winner = 'draw';
    } else if (                                                                                                     // Check if Player 1 wins
        (hand1 === 'rock' && hand2 === 'scissors') ||
        (hand1 === 'paper' && hand2 === 'rock') ||
        (hand1 === 'scissors' && hand2 === 'paper')
    ) {
        winner = player1;
        player1.score++;                                                                                            // Increment Player 1's score
    } else {
        winner = player2;                                                                                                   // Player 2 wins
        player2.score++;                                                                                            // Increment Player 2's score
    }

    return { hand1, hand2, winner };                                                                                // Return round result
}

// Function to update UI after each game round
function updateGameUI(gameId, result, player1, player2) {
    const gameHand = document.getElementById(`${gameId}-hand`);                                                     // Hand image element
    const gameResult = document.getElementById(`${gameId}-result`);                                                 // Result text element
    const gameScore = document.getElementById(`${gameId}-score`);                                                   // Score text element

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
    tournamentStarted = false;                                                                                      // Set tournament state to false
    document.getElementById('play-game1').disabled = true;                                                          // Disable Play Game 1 button

    // Determine and display champion
    let champion;
    if (players.player1.score === 3) {                                                                              // Check if Player 1 wins
        champion = players.player1.name;
    } else if (players.player2.score === 3) {                                                                       // Check if Player 2 wins
        champion = players.player2.name;
    }
    document.getElementById('champion').textContent = `${champion} is the World Champion!`;                         // Display champion
}
