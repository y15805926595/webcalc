// 简易计算器核心逻辑

// 计算器状态
let calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  history: "", // 添加历史记录属性用于显示计算过程
};

// DOM元素变量
let display;
let historyDisplay; // 用于显示计算历史的元素

// 更新显示
function updateDisplay() {
  if (display) {
    display.value = calculator.displayValue;
    
    // 更新历史显示
    if (historyDisplay) {
      historyDisplay.textContent = calculator.history;
    }
  }
}

// 输入数字
function inputDigit(digit) {
  try {
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if (waitingForSecondOperand) {
      calculator.displayValue = "0";
      calculator.waitingForSecondOperand = false;
    }
    
    // 如果当前显示为'0'，直接替换，否则追加
    calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    
    updateDisplay();
  } catch (error) {
    console.error("输入数字时出错:", error);
    calculator.displayValue = "错误";
    updateDisplay();
  }
}

// 输入小数点
function inputDecimal() {
  // 如果正在等待第二个操作数，先设置为'0'
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0";
    calculator.waitingForSecondOperand = false;
  }

  // 如果当前显示的值不包含小数点，则添加小数点
  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
    updateDisplay();
  }
}

// 处理操作符
function handleOperator(nextOperator) {
  try {
    console.log("操作符按钮被点击:", nextOperator);
    console.log("计算器当前状态:", calculator);

    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    // 确保输入的是有效数字
    if (isNaN(inputValue) && !calculator.waitingForSecondOperand) {
      return;
    }

    // 替换操作符的情况
    if (operator && calculator.waitingForSecondOperand && nextOperator !== "=") {
      calculator.operator = nextOperator;
      console.log("替换操作符为:", nextOperator);
      // 更新历史显示中的操作符
      calculator.history = `${firstOperand} ${nextOperator}`;
      updateDisplay();
      return;
    }

    // 首次输入操作符的情况
    if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
      console.log("设置firstOperand:", inputValue);
      // 更新历史显示
      calculator.history = `${displayValue} ${nextOperator}`;
    } else if (operator) {
      // 执行计算
      console.log("执行计算:", firstOperand, operator, inputValue);
      // 先更新历史显示
      calculator.history = `${firstOperand} ${operator} ${displayValue} =`;
      const result = calculate(firstOperand, inputValue, operator);
      calculator.firstOperand = result;
      console.log("计算结果:", result);
      calculator.displayValue = String(result);
      
      // 特殊处理等号按钮，更新完整的计算表达式
      if (nextOperator === "=") {
        calculator.history = `${firstOperand} ${operator} ${displayValue} = ${result}`;
      }
    }

    // 只有非等号操作符才清空显示区域
    if (nextOperator !== "=") {
      calculator.waitingForSecondOperand = true;
      // 立即清空显示区域，方便输入第二个操作数
      calculator.displayValue = "0";
      calculator.operator = nextOperator;
    } else {
      // 等号操作符保持显示结果
      calculator.waitingForSecondOperand = false;
    }
    updateDisplay();
    console.log("更新后的计算器状态:", calculator);
  } catch (error) {
    console.error("处理操作符时出错:", error);
    calculator.displayValue = "错误";
    updateDisplay();
  }
}

// 执行计算
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      // 防止除以0
      return secondOperand !== 0 ? firstOperand / secondOperand : "错误";
    default:
      return secondOperand;
  }
}

// 重置计算器
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.history = ""; // 清空历史记录
  updateDisplay();
}

// 删除最后一个字符
function deleteDigit() {
  const { displayValue, waitingForSecondOperand } = calculator;

  // 如果正在等待第二个操作数，不执行删除
  if (waitingForSecondOperand) return;

  // 如果显示长度大于1，删除最后一个字符，否则重置为'0'
  if (displayValue.length > 1) {
    calculator.displayValue = displayValue.slice(0, -1);
  } else {
    calculator.displayValue = "0";
  }

  updateDisplay();
}

// 切换正负号
function toggleSign() {
  const { displayValue } = calculator;

  // 如果当前值不是'0'，切换正负号
  if (displayValue !== "0") {
    calculator.displayValue = displayValue.startsWith("-") ? displayValue.slice(1) : "-" + displayValue;
    updateDisplay();
  }
}

// 复制结果到剪贴板
function copyToClipboard() {
  const value = display.value;
  if (value && value !== "0" && value !== "错误") {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // 可以添加一个临时提示
        const originalValue = display.value;
        display.value = "已复制!";
        setTimeout(() => {
          display.value = originalValue;
        }, 1000);
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  }
}

// 处理粘贴事件
function handlePaste(event) {
  try {
    event.preventDefault();

    // 获取粘贴的文本
    const text = (event.clipboardData || window.clipboardData).getData("text");

    // 尝试解析为数字
    const parsedNumber = parseFloat(text);

    if (!isNaN(parsedNumber)) {
      calculator.displayValue = String(parsedNumber);
      calculator.waitingForSecondOperand = false;
      
      // 更新历史显示
      if (calculator.firstOperand !== null && calculator.operator) {
        calculator.history = `${calculator.firstOperand} ${calculator.operator}`;
      }
      
      updateDisplay();
      console.log("粘贴了数字:", parsedNumber);
    }
  } catch (error) {
    console.error("粘贴处理错误:", error);
  }
}

// 处理键盘粘贴事件
function handlePasteFromKeyboard() {
  try {
    navigator.clipboard
      .readText()
      .then((text) => {
        // 尝试解析为数字
        const trimmedText = text.trim();
        const parsedNumber = parseFloat(trimmedText);

        if (!isNaN(parsedNumber)) {
          calculator.displayValue = String(parsedNumber);
          calculator.waitingForSecondOperand = false;
          updateDisplay();
          console.log("从剪贴板粘贴了数字:", parsedNumber);
        } else {
          console.log("剪贴板内容不是有效的数字:", trimmedText);
        }
      })
      .catch((err) => {
        console.error("读取剪贴板失败:", err);
        // 备用方案：如果直接读取剪贴板失败，提示用户可能需要先复制内容
        console.log("请确保您已复制内容，并在点击粘贴按钮后尝试操作");
      });
  } catch (error) {
    console.error("处理粘贴操作时出错:", error);
  }
}

// DOM加载完成后初始化
function initializeCalculator() {
  // 获取DOM元素
  display = document.getElementById("display");
  historyDisplay = document.getElementById("history-display");

  if (!display) {
    console.error("计算器显示屏元素未找到");
    return;
  }

  // 添加粘贴事件监听
  display.onpaste = handlePaste;

  // 添加数字按钮事件监听
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.onclick = function () {
      inputDigit(button.dataset.value);
    };
  });

  // 安全地添加小数点按钮事件监听
  const decimalButton = document.querySelector('[data-value="."]');
  if (decimalButton) {
    decimalButton.onclick = inputDecimal;
  }

  // 安全地添加操作符按钮事件监听
  const addButton = document.getElementById("add");
  if (addButton)
    addButton.onclick = function () {
      handleOperator("+");
    };

  const subtractButton = document.getElementById("subtract");
  if (subtractButton)
    subtractButton.onclick = function () {
      handleOperator("-");
    };

  const multiplyButton = document.getElementById("multiply");
  if (multiplyButton)
    multiplyButton.onclick = function () {
      handleOperator("*");
    };

  const divideButton = document.getElementById("divide");
  if (divideButton)
    divideButton.onclick = function () {
      handleOperator("/");
    };

  // 安全地添加等号按钮事件监听
  const equalsButton = document.getElementById("equals");
  if (equalsButton) {
    equalsButton.onclick = function () {
      console.log("等号按钮被点击");
      // 移除条件检查，直接调用handleOperator，允许连续计算
      handleOperator("=");
      // 计算完成后清空操作符，以便再次计算
      calculator.operator = null;
    };
  }

  // 安全地添加其他功能按钮事件监听
  const clearButton = document.getElementById("clear");
  if (clearButton) clearButton.onclick = resetCalculator;

  const deleteButton = document.getElementById("delete");
  if (deleteButton) deleteButton.onclick = deleteDigit;

  const plusMinusButton = document.getElementById("plusMinus");
  if (plusMinusButton) plusMinusButton.onclick = toggleSign;

  const copyResultButton = document.getElementById("copyResult");
  if (copyResultButton) copyResultButton.onclick = copyToClipboard;

  // 初始化显示
  updateDisplay();

  // 添加键盘事件监听
  document.addEventListener("keydown", (event) => {
    // 阻止默认行为，避免页面滚动等
    // event.preventDefault();

    // 数字键
    if (/[0-9]/.test(event.key)) {
      inputDigit(event.key);
      return;
    }

    // 小数点
    if (event.key === "." || event.key === ",") {
      inputDecimal();
      return;
    }

    // 操作符
    if (event.key === "+" || event.key === "-") {
      handleOperator(event.key);
      return;
    }
    if (event.key === "*") {
      handleOperator("*");
      return;
    }
    if (event.key === "/") {
      handleOperator("/");
      return;
    }

    // 等号和回车键
  if (event.key === "=" || event.key === "Enter") {
      console.log("等号键被按下");
      // 移除条件检查，直接调用handleOperator，允许连续计算
      handleOperator("=");
      calculator.operator = null;
      return;
    }

    // 退格键
    if (event.key === "Backspace") {
      deleteDigit();
      return;
    }

    // Esc键 - 重置
    if (event.key === "Escape") {
      resetCalculator();
      return;
    }

    // C键 - 重置
    if (event.key === "c" || event.key === "C") {
      resetCalculator();
      return;
    }

    // 粘贴操作 (Ctrl+V 或 Cmd+V)
    if ((event.ctrlKey || event.metaKey) && event.key === "v") {
      handlePasteFromKeyboard();
      return;
    }
  });

  console.log("简易计算器已加载");
}

// 当DOM加载完成后初始化计算器
document.addEventListener("DOMContentLoaded", initializeCalculator);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "UPDATE_SELECTED_TEXT") {
    if (isNaN(Number(msg.text))) {
      return;
    }
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
      calculator.displayValue = msg.text;
      calculator.waitingForSecondOperand = false;
      // 更新历史显示
      if (calculator.firstOperand !== null && calculator.operator) {
        calculator.history = `${calculator.firstOperand} ${calculator.operator}`;
      }
    } else {
      // 如果当前显示为'0'，直接替换，否则追加
      calculator.displayValue = msg.text;
    }

    updateDisplay();
  }
});
