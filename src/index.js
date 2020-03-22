function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let numberArr = [],
        operationArr = [];

    const operations = {
        '+': {
            do: (x, y) => x + y,
            priority: 1
        },
        '-': {
            do: (x, y) => x - y,
            priority: 1
        },
        '*': {
            do: (x, y) => x * y,
            priorty: 2
        },
        '/': {
            do: (x, y) => x / y,
            priority: 2
        },
    };

    function calculate(a, b, operation) {
        if (operation === '/' && a === 0) {
          throw new Error('TypeError: Division by zero.');
        } // division by zero
        return operations[operation].do(b, a);
    }
     
    expr = expr.replace(/\s/g, ""); // spaces deletion

    let openBracket = 0;
    let closeBracket = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            openBracket++;
        }
        else if (expr[i] === ')') {
            closeBracket++;
        }
    }
    if (openBracket != closeBracket) {
        throw "ExpressionError: Brackets must be paired";
    } // brackets error

    for (let i = 0; i < expr.length; i++) {
        if (!isNaN(expr[i])) {
          numberArr.push(Number(expr[i]));
        }
    }
    
    function bracketCount() {  //count number of brackets
        if (operationArr[operationArr.length - 1] == '(') {
          return;
        }
        numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operationArr.pop()));  // calculate whats on top
        bracketCount();
      }

}

module.exports = {
    expressionCalculator
}