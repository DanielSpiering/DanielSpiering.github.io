const submitButton = document.querySelector('#submit-button');
const diceResultBox = document.querySelector('#dice-output');
var randomNumber;

submitButton.addEventListener('click', rollDiceButton);

function rollDiceButton(e) {
    //check the previous roll and show the result
    let previousRoll = document.getElementById('dice-sum').innerText;
    document.getElementById('previous-dice-roll').innerText = "";

    if (previousRoll == "") {
        document.getElementById('previous-dice-roll').innerText = "Previous Dice Sum: 0";
    } else {
        document.getElementById('previous-dice-roll').innerText += `Previous ${previousRoll}`;
    }//end if
    
    e.preventDefault();
    rollDice();
   
    
}//end function
function rollDice() {
    //reset the dice output list
    document.getElementById('dice-output').innerHTML = "";

    //get the user input values
    const diceAmountTextBox = document.getElementById('dice-amount').value;
    const diceSizeTextBox = document.getElementById('dice-sides').value;
    let sum = 0;

    //create a random number for each dice rolled and add them together
    for (var index = 0; index < diceAmountTextBox; index++) {
        randomNumber = Math.floor(Math.random() * (diceSizeTextBox - 1 + 1) + 1);
        sum += randomNumber;
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`${randomNumber}`));
        document.querySelector('ul').appendChild(node);
        
    }//end for

    //erase previous sum and print new one
    document.getElementById('dice-sum').innerText = "";
    document.getElementById('dice-sum').innerText += `Dice Sum: ${sum}`;
    return sum;
}//end function

