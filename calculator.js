//Ask the user for the first number.
//Ask the user for the second number.
//Ask the user for an operation to perform.
//Print the result to the terminal.

const readline = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");

// main function
function startCalculator() {
  const language = determineLanguage();
  determineName(language);
  let anotherCalc = "y";
  while (anotherCalc === "y") {
    const number1 = determineNum(language, "num1");
    const number2 = determineNum(language, "num2");
    const operator = determineOperator(language);
    const result = determineResult(language, number1, number2, operator);
    printResult(language, result);
    anotherCalc = keepCalculating(language);
    console.clear();
  }
}

startCalculator();

//helper functions
function determineLanguage() {
  let intro = "";
  let language;
  while (intro === "") {
    prompt(messages("intro"));
    intro = readline.question();

    const lowerCasedLang = intro.toLowerCase();

    if (lowerCasedLang === "en") {
      language = "en";
    } else if (lowerCasedLang === "fr") {
      language = "fr";
    } else {
      intro = "";
    }
  }

  return language;
}

function determineName(lang) {
  prompt(messages("welcome", lang));
  let validName = readline.question();

  while (validName === "") {
    prompt(messages("invalidName", lang));
    validName = readline.question();
  }
}

function determineNum(lang, msg) {
  prompt(messages(msg, lang));
  let num = readline.question();

  while (invalidNumber(num)) {
    prompt(messages("invalidNumber", lang));
    num = readline.question();
  }

  return Number(num);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

function determineOperator(lang) {
  prompt(messages("operation", lang));
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt(messages("invalidOperation", lang));
    operation = readline.question();
  }

  return operation;
}

function determineResult(lang, number1, number2, operator) {
  let output;
  switch (operator) {
    case "1":
      output = number1 + number2;
      break;
    case "2":
      output = number1 - number2;
      break;
    case "3":
      output = number1 * number2;
      break;
    case "4":
      if (number2 === 0) {
        output = messages("infinity", lang);
      } else {
        output = number1 / number2;
      }
      break;
  }
  return output;
}

function printResult(lang, result) {
  console.log(messages("result", lang), result);
}

function keepCalculating(lang) {
  prompt(messages("runProgram", lang));
  anotherCalc = readline.question();

  while (
    anotherCalc !== "n" &&
    anotherCalc !== "N" &&
    anotherCalc !== "y" &&
    anotherCalc !== "Y"
  ) {
    prompt(messages("invalidChoice", lang));
    anotherCalc = readline.question();
  }

  return anotherCalc.toLowerCase();
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang = "en") {
  return MESSAGES[lang][message];
}

//   // First Draft of Program starts here:

// function prompt(message) {
//   console.log(`=> ${message}`);
// }

// function messages(message, lang = "en") {
//   return MESSAGES[lang][message];
// }

// let intro = "";
// while (intro === "") {
//   prompt(messages("intro"));
//   intro = readline.question();

//   const lowerCasedLang = intro.toLowerCase();

//   if (lowerCasedLang === "en") {
//     LANGUAGE = "en";
//   } else if (lowerCasedLang === "fr") {
//     LANGUAGE = "fr";
//   } else {
//     intro = "";
//   }
// }

// prompt(messages("welcome", LANGUAGE));
// let validName = readline.question();

// while (validName === "") {
//   prompt(messages("invalidName", LANGUAGE)); //when user inputs nothing (empty string) or whitespace
//   validName = readline.question();
// }

// function invalidNumber(number) {
//   return number.trimStart() === "" || Number.isNaN(Number(number));
// }

// let runProgram = "y";

// while (runProgram === "y" || runProgram === "Y") {
//   prompt(messages("num1", LANGUAGE));
//   let num1 = readline.question();

//   while (invalidNumber(num1)) {
//     prompt(messages("invalidNumber", LANGUAGE));
//     num1 = readline.question();
//   }

//   prompt(messages("num2", LANGUAGE));
//   let num2 = readline.question();

//   while (invalidNumber(num2)) {
//     prompt(messages("invalidNumber", LANGUAGE));
//     num2 = readline.question();
//   }

//   prompt(messages("operation", LANGUAGE));
//   let operation = readline.question();

//   while (!["1", "2", "3", "4"].includes(operation)) {
//     prompt(messages("invalidOperation", LANGUAGE));
//     operation = readline.question();
//   }

//   let output;
//   switch (operation) {
//     case "1":
//       output = Number(num1) + Number(num2);
//       break;
//     case "2":
//       output = Number(num1) - Number(num2);
//       break;
//     case "3":
//       output = Number(num1) * Number(num2);
//       break;
//     case "4":
//       if (Number(num2) === 0) {
//         output = messages("infinity", LANGUAGE);
//       } else {
//         output = Number(num1) / Number(num2);
//         break;
//       }
//   }

//   console.log(messages("result", LANGUAGE), output);

//   prompt(messages("runProgram", LANGUAGE));
//   runProgram = readline.question();
// }
