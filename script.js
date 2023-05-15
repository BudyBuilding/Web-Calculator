let memoryValue = 0;


/* Methods for memory */
function appendToMemory() {
    var value = parseFloat(document.getElementById('display').value);
    memoryValue += value;
  }
  
  function retrieveMemory() {
    document.getElementById('display').value = memoryValue;
  }


  /* Methods and functions for displaying */
  function clearDisplay() {
    document.getElementById('display').value = '';
  }

  function deleteSpaces(string) {
    return string.replace(/\s/g, '');
  }

  function formatNumberForDisplay(number) {
    var numberString = deleteSpaces(number.toString());
    var formattedNumber = '';
    var delimiters = ["%", "^", "/", "*", "-", "+"];
    var number1 = '';
    var number2 = '';
    var contain = false;
  
    for (var i = 0; i < delimiters.length; i++) {
      var delimiter = delimiters[i];
      var index = numberString.indexOf(delimiter, 0);
      
      if (index !== -1) {
        contain = true;
        number1 = numberString.substring(0, index);
        number2 = numberString.substring(index + delimiter.length);
        break;
      }
    }
  
    if (!contain) {
      formattedNumber = addSpace(numberString);
    } else {
      number1 = addSpace(number1);
      number2 = addSpace(number2);
      formattedNumber = number1 + " " + numberString[index] + " " + number2;
    }
    
    return formattedNumber.trim();
  }
  
  function addSpace(number) {
    var numberString = deleteSpaces(number.toString());
    var formattedNumber = '';
    var index = numberString.length;
    while (index > 0) {
      formattedNumber = numberString.substring(Math.max(0, index - 3), index) + ' ' + formattedNumber;
      index -= 3;
    }
    return formattedNumber.trim();
  }

  function appendToDisplay(value) {
    var input = document.getElementById('display');
    var position = input.selectionStart;
    var currentValue = input.value;
    var newValue = currentValue.slice(0, position) + value + currentValue.slice(position);
  
    if (/^\d+$/.test(value)) {
      newValue = formatNumberForDisplay(newValue).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  
    input.value = newValue;
  }

  function deleteLastCharacter() {
    var displayValue = document.getElementById('display').value;
    document.getElementById('display').value = displayValue.slice(0, -1);
  }

  function changeTheme(theme) {
    var calculator = document.querySelector('.calculator');
    calculator.className = 'calculator ' + theme;
  }



  /* Methods and functions for calculating */

  function calculate() {
    var expression = document.getElementById('display').value;
    var result;
    try {
      var formattedExpression = expression.replace('^', '**');
      if (formattedExpression.includes('%')) {
        var parts = formattedExpression.split('%');
        var number = parseFloat(parts[0]);
        var percentage = parseFloat(parts[1]) / 100; 
        result = number * percentage;
      } else {
        result = eval(formatNumberForCalculation(formattedExpression));
        if (result === Infinity) {
          throw new Error('Cannot divide by zero');
        }
      }
  
      result = formatNumberForDisplay(result);
    } catch (error) {
      result = 'Error: ' + error.message;
    }
    document.getElementById('display').value = result;
  }

  function calculateRoot() {
    var displayValue = document.getElementById('display').value;
    var result = Math.sqrt(Number(displayValue));
    document.getElementById('display').value = result;
  }
  
  function formatNumberForCalculation(number) {
    return number.replace(/[,\s]/g, '');
  }

  function calculatePower() {
    var base = parseFloat(document.getElementById('display').value);
    var exponent = parseFloat(document.getElementById('exponent').value);
    var result = Math.pow(base, exponent);
    document.getElementById('display').value = result;
  }


function calculatePercentage() {
  var number = parseFloat(document.getElementById('display').value);
  var result = number / 100;
  document.getElementById('display').value = result;
}


/* Converting methods */ 

function convertFromDecToHex() {
  var displayValue = document.getElementById('display').value;
  var decimalValue = Number(displayValue);
  var hexValue = decimalValue.toString(16).toUpperCase();
  document.getElementById('display').value = hexValue;
}

function convertFromHexToDec() {
  var displayValue = document.getElementById('display').value;
  var decimalValue = parseInt(displayValue, 16);
  document.getElementById('display').value = decimalValue;
}

function convertFromBinToDec() {
  var displayValue = document.getElementById('display').value;
  var decimalValue = parseInt(displayValue, 2);
  document.getElementById('display').value = decimalValue;
}

function convertFromDecToBin() {
  var displayValue = document.getElementById('display').value;
  var decimalValue = Number(displayValue);
  var binaryValue = decimalValue.toString(2);
  document.getElementById('display').value = binaryValue;
}

function convertFromHexToBin() {
  var displayValue = document.getElementById('display').value;
  var decimalValue = parseInt(displayValue, 16);
  var binaryValue = decimalValue.toString(2);
  document.getElementById('display').value = binaryValue;
}

function convertFromBinToHex() {
  var displayValue = document.getElementById('display').value;
  var hexValue = parseInt(displayValue, 2).toString(16).toUpperCase();
  document.getElementById('display').value = hexValue;
}