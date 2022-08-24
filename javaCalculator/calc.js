//CREATE ClASS
class Calculator {
    constructor() {
        this.displayValue = '';
    }//end constructor();

}//end function
class Stack {
    constructor() {
        this.items = [];
    }//end constructor

    // push function
    push(element) {
        // push element into the items
        this.items.push(element);
    }
    // pop function
    pop() {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    // peek function
    peek() {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
    // isEmpty function
    isEmpty() {
        // return true if stack is empty
        return this.items.length == 0;
    }
    // printStack function
    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
    getLength() {
        return this.items.length;

    }
}//end Stack



function InfixToPostfixConvert(infixBuffer) {
    var priority = 0;
    var postfixBuffer = "";
    const stringArray = infixBuffer.split(" ");

    let s1 = new Stack();

    for (var i = 0; i < stringArray.length; i++) {

        var ch = stringArray[i];

        if (ch == "+" || ch == "-" || ch == "*" || ch == "/") {

            // check the precedence

            if (s1.getLength() <= 0) {
                s1.push(ch);
            } else {
                if (s1.peek() == "*" || s1.peek() == "/") {
                    priority = 1;
                } else {
                    priority = 0;
                }//end if

                if (priority == 1) {
                    if (ch == "+" || ch == "-") {
                        postfixBuffer += s1.pop() + " ";
                        i--;
                    } else { // Same
                        postfixBuffer += s1.pop() + " ";
                        i--;
                    }//end if
                } else {
                    if (ch == "+" || ch == "-") {
                        postfixBuffer += s1.pop() + " ";
                        s1.push(ch);
                    } else {
                        s1.push(ch);
                    }//end if
                }//end if
            }//end if
        } else {
            if (postfixBuffer == "") {
                postfixBuffer += ch + " ";
            } else {

                if (i == stringArray.length) {
                    postfixBuffer += ch;
                } else {
                    postfixBuffer += ch + " ";
                }//end if
            }//end if

        }//end if
    }//end for

    var len = s1.getLength();

    for (var j = 0; j < len; j++) {
        if (s1.getLength() == 1) {
            postfixBuffer += s1.pop();
        } else {
            postfixBuffer += s1.pop() + " ";
        }//end if                
    }//end for
    return postfixBuffer;
}//end converter

var newStack = new Stack();

function SolveProblem(inputString) {
    //split string on spaces and store to array
    var stringArray = inputString.split(' ');

    for (var index = 0; index < stringArray.length; index++) {
        //as we walk the array check to see if the current index is an operator or operand
        if (IsOperator(stringArray[index]) == true) {//if operator perform the required operation
            Operate(stringArray[index]);

        } else {//if operand add to stack
            newStack.push(stringArray[index]);
            //lsbListBox.Items.Add("After Push: " + newStack.ToString());
        }//end if               
    }//end for
    //return final result
    return newStack.peek();
}//end solve problem

function IsOperator(symbol) {
    if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
        return true;
    } else {
        return false;
    }//end if        
}//end IsOperator

function Operate(symbol) {
    //pop the first 2 operands from the stack and store their values to variables                                 
    var num2 = newStack.pop();
    var num1 = newStack.pop();

    //depending on the operator call the required method and push result onto stack
    if (symbol == "+") {

        var result = Add(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Addition: " + newStack.ToString());

    } else if (symbol == "-") {

        var result = Subtract(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Subtraction: " + newStack.ToString());

    } else if (symbol == "*") {

        var result = Multiply(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Multiplication: " + newStack.ToString());

    } else if (symbol == "/") {

        var result = Divide(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Division: " + newStack.ToString());
    }//end if                               
}//end Operate

function Add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}//end method
function Subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}//end method
function Divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}//end method
function Multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}//end method


//CREATE INSTANCE OF THE CLASS THIS INSTANCE IS GLOBAL
webCalculator = new Calculator;

//EVENTS
function InputDigit(digit) {
    webCalculator.displayValue += digit;
    RefreshScreen();
}//end function

function InputOperator(digit) {
    webCalculator.displayValue += " " + digit + " ";
    RefreshScreen();
}//end function

function ResetCalculator() {
    webCalculator.displayValue = '';
    RefreshScreen();
}//end function

//ALTER THE CALCULATOR'S SCREEN
function RefreshScreen() {
    //GRAB THE ELEMENT THAT REPRESENTS THE SCREEN <INPUT>
    var inputElement = document.querySelector('.calculator-screen');

    //CHANGE THE VALUE PROPERTY OF THE ELEMENT
    inputElement.value = webCalculator.displayValue;
}//end function

//PROCESS INPUT ON CALCULATOR SCREEN
function ProcessInput() {

    let infix = webCalculator.displayValue;
    var answer = SolveProblem(InfixToPostfixConvert(infix))
    //TO DO
    //var answer = 56;
    webCalculator.displayValue = answer;
    RefreshScreen();
}//end function