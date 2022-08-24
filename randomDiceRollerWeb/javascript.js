const submitButton = document.querySelector('#submit-button');
const diceResultBox = document.querySelector('#dice-output');
var randomNumber;

submitButton.addEventListener('click', rollDiceButton);

function rollDiceButton(e) {
    e.preventDefault();
    rollDice();
}//end function
function rollDice() {
    document.getElementById('dice-output').innerHTML = "";
    const diceAmountTextBox = document.getElementById('dice-amount').value;
    const diceSizeTextBox = document.getElementById('dice-sides').value;
    let sum = 0;

    for (var index = 0; index < diceAmountTextBox; index++) {
        randomNumber = Math.floor(Math.random() * (diceSizeTextBox - 1 + 1) + 1);
        sum += randomNumber;
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`${randomNumber}`));
        document.querySelector('ul').appendChild(node);
        
    }//end for
    document.getElementById('dice-sum').innerText = "";
    document.getElementById('dice-sum').innerText += `Dice Sum: ${sum}`;
}//end function