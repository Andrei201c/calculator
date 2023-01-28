const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator-body");

const display = document.querySelector(".display");

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        
        const key = e.target;
        const  action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent; 
        const previousKeyType = calculator.dataset.previousKeyType;
       
        const  calculate = (firstNum, operator, secondNum) =>  {
            let result = "";
            if(operator === "add") {
                result = parseFloat(firstNum) + parseFloat(secondNum);
            } else if (operator === "substract") {
                result = parseFloat(firstNum) -  parseFloat(secondNum);
            } else if (operator === "multiply") {
                result = parseFloat(firstNum) * parseFloat(secondNum);
            } else if (operator === 'divide') {
                result = parseFloat(firstNum) / parseFloat(secondNum);
            }
            return result;
        }
        
        if(!action) {
           if(displayedNum === '0' || previousKeyType === 'operator' || 
           previousKeyType === 'calculate') {
               display.textContent = keyContent;
           } else {
            display.textContent = displayedNum + keyContent;
           }
           calculator.dataset.previousKeyType = "number";
        }

        Array.from(key.parentNode.children) 
                .forEach(k => k.classList.remove("is-depressed"))

        if( action === "add" || 
        action === "substract" ||
         action === "multiply" || 
         action === "divide") {

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
             
            if(firstValue && operator && previousKeyType !==
                 'operator' & previousKeyType !== 'calculate') {

                const claculateValue = calculate(firstValue, operator, secondValue);
                display.textContent = claculateValue;
                calculator.dataset.firstValue = claculateValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }
           
            
            key.classList.add("is-depressed");
           calculator.dataset.previousKeyType = 'operator';
          //calculator.dataset.firstValue = displayedNum;
           calculator.dataset.operator = action;
        }


        if(action === "decimal") {
            //display.textContent = displayedNum + ".";
            if(!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (previousKeyType === "operator" || previousKeyType === 'calculate') {
                display.textContent = '0';
            }

            calculator.dataset.previousKeyType = "decimal";
        }

        if(action === "clear") {
            
               if(key.textContent === 'AC') {
                calculator.dataset.firstValue = ""
                calculator.dataset.modifyValue = ""
                calculator.dataset.operator = ""
                calculator.dataset.previousKeyType = ""
                
            } else {
                key.textContent = "AC";
            }


            const clearBtn = calculator.querySelector('[data-action=clear]')
            clearBtn.textContent = "CE"
           // calculator.dataset.previousKeyType = 'clear'
            display.textContent = 0;
            calculator.dataset.previousKey = "clear";
        }

        if(action === "calculate") {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            if(firstValue) {
                if(previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modifyValue
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }

        
            //display.textContent= calculate(firstValue, operator, secondValue);
            calculator.dataset.modifyValue = secondValue;
             calculator.dataset.previousKeyType = 'calculate';
        }

        
    }
});




