function eval() {
    // Do not use eval!!!
    return;
}
  
function expressionCalculator(expr) { 
    // https://www.youtube.com/watch?v=Vk-tGND2bfc  // solution algorithm
    const expArray = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g); // spaces deletion
            leftBrackets = expr.replace(/[^(]/g, ''),
            rightBrackets = expr.replace(/[^)]/g, ''); 

        if(leftBrackets.length != rightBrackets.length) {
        throw new Error('ExpressionError: Brackets must be paired');//brackets error
        }
        let numberArr = [],
            operatorArr = [];
        const operators = {
            '+': {
            priority: 1,
            do: (a, b) => a + b
            },
            '-': {
            priority: 1,
            do: (a, b) => a - b
            },
            '/': {
            priority: 2,
            do: (a, b) => a / b
            },
            '*': {
            priority: 2,
            do: (a, b) => a * b
            },
            '(': {},
            ')': {}
        };

        function calculate(a, b, operator) {
            if (operator === '/' && a === 0) {
            throw new Error('TypeError: Division by zero.');
            }
            return operators[operator].do(b, a); //devision by 0
        }

        //push numbers into number stack...
        for (let i = 0; i < expArray.length; i++) {
            if (!isNaN(expArray[i])) {
            numberArr.push(Number(expArray[i]));
            }//push numbers into stack

            function bracketCount() {  //number of brackets
                if (operatorArr[operatorArr.length - 1] == '(') {
                return;
                }
                numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));  //calculate whats on top
                bracketCount();
            }
            
            function addOperator() {
            if (!operatorArr.length || operatorArr[operatorArr.length - 1] == '(' || expArray[i] == '(' ) {
                operatorArr.push(expArray[i]); // push operator into stack
            } else if (expArray[i] === ')') {
                bracketCount();
                operatorArr.pop();
            } else if (operators[expArray[i]].priority > operators[operatorArr[operatorArr.length - 1]].priority) {
                operatorArr.push(expArray[i]);
            } else {
                numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));
                addOperator();
            }
            }

            if (expArray[i] in operators) {addOperator();}
        }
        
        function stopCounting() {
            if (!operatorArr.length) { return;}
            numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));
            stopCounting();
        }
        stopCounting();
        return numberArr[0];
        }
    
    module.exports = {
      expressionCalculator
    };