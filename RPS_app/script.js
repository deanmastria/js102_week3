const hands = ['rock', 'paper', 'scissors'];                                            //Declares an array that contains the strings rock paper scissors
let winner = null;                                                                      //Decalres a variable winner and initializes it to null

function getHand(){
    return hands[parseInt(Math.random()*10)%3]                                          //Defines a function `gethand` that returns a random element from the `hands` array.
                                                                                        //Uses `Math.randon()` to generate a random # *10 converts it to an interger, and modulo 3 to ensure the result is within the range of the `hands` array indices.
}

let players = {                                                                         //Declares an object `Players with four nested objects. 
    deano: {                                                                            //Nested object 1
        name: 'deano',                                                                  //property 1
        getHand: getHand                                                                //property 2 ( a reference to the `get hand` function)
    },
    jack: {                                                                             //Nested object 2
        name: 'jack',                                                                   //property 1 
        getHand: getHand                                                                //property 2 ( a reference to the `get hand` function)
    },
    kyle: {                                                                             //Nested object 1
        name: 'kyle',                                                                   //property 1
        getHand: getHand                                                                //property 2 ( a reference to the `get hand` function)
    },
    iggy: {                                                                             //Nested object 2
        name: 'iggy',                                                                   //property 1
        getHand: getHand                                                                //property 2 ( a reference to the `get hand` function)
    },
}


function playRound(p1,p2) {                                                             //Defines a function playRound that takes two players p1 and p2 as arguments.
    const deanoHand = p1.getHand();
    const jackHand = p2.getHand();
    console.log(`${p1.name} plays ${deanoHand}`);                                       //Calls getHand for each player to determine their hand, then logs the results to the console.
    console.log(`${p2.name} plays ${jackHand}`);                     
    

    if (deanoHand === jackHand) {                                                       //returns draw if same hands are played
        return "DRAW";
    } else if (                                                                         //returns jack wins if deano plays lesser hands
        (deanoHand === 'rock' && jackHand === 'paper') ||
        (deanoHand === 'paper' && jackHand === 'scissors') ||
        (deanoHand === 'scissors'&& jackHand === 'rock') 
        
    ) {
        return p2
    }
    else {                                                                              //returns deano wins if jack plays lesser hands
        return p1
        }

}

// const result = playRound();                                                          //placed at the bottom as the variable can only be called after the function "playRound" is defined
// console.log(result);                                                    

function playGame(deano, jack, playUntil) {                                             //Defines a function playGame that takes two players (deano and jack) and a target number of wins (playUntil). Initializes counters deanoWins and jackWins to 0.
    let deanoWins = 0;
    let jackWins = 0; 

    while (deanoWins < playUntil && jackWins < playUntil) {                             //Runs a loop that continues until either deano or jack reaches the target number of wins. 
        const victor = playRound(deano, jack);                                           //Calls playRound to determine the winner of each round, 

    if (victor === deano) {
        deanoWins++;                                                                    //increments the corresponding win counter
        }
    else if (victor === jack) {
        jackWins++;
        }

        console.log(`Score ${deano.name} ${deanoWins} - ${jack.name} ${jackWins}`);     //Logs the current score
    }

if (deanoWins === playUntil) {                                                          //After the loop, checks which player reached the target number of wins and logs the result. 
    console.log(`${deano.name} beats ${jack.name}`);
    return deano;
}
else {
    console.log(`${jack.name} beats ${deano.name}`);
    return jack;                                                                        //Returns the winning player object.
}
}

const gameChamp = playGame(players.deano, players.jack, 3);                             //Calls playGame for deano and jack, playing until one of them wins 3 times. 
console.log(`${gameChamp.name} is the Champion!`);                                      //Logs the champion's name to the console.

const gameChamp2 = playGame(players.kyle, players.iggy, 3);
console.log(`${gameChamp2.name} is the Champion!`);

function playTournament(p1, p2, p3, p4, playUntil) {                                    //Defines a function playTournament that takes four players (p1, p2, p3, and p4) and a target number of wins (playUntil). 
                                                                                        //Plays two games to determine two finalists, then plays a final game to determine the tournament champion, logging each step.
    let champion1 = playGame(p1, p2, playUntil);
    console.log(`${champion1.name} Progresses to the final battle!`);

    let champion2 = playGame(p3, p4, playUntil);
    console.log(`${champion2.name} Progresses to the final battle!`);
    
    console.log("Final Round!");
    let tournamentChampion = playGame(champion1, champion2, playUntil);
    console.log(`Score ${tournamentChampion.name} is the world champion `);
    }


playTournament(players.deano, players.jack, players.kyle, players.iggy, 3);             //Calls playTournament with all four players, playing until one of them wins 3 times in each match.