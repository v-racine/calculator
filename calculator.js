//Ask the user for the first number.
//Ask the user for the second number.
//Ask the user for an operation to perform.
//Print the result to the terminal.

const readline = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang = "en") {
  return MESSAGES[lang][message];
}

let intro = "";
while (intro === "") {
  prompt(messages("intro"));
  intro = readline.question();

  const lowerCasedLang = intro.toLowerCase();

  if (lowerCasedLang === "en") {
    LANGUAGE = "en";
  } else if (lowerCasedLang === "fr") {
    LANGUAGE = "fr";
  } else {
    intro = "";
  }
}

prompt(messages("welcome", LANGUAGE));
let validName = readline.question();

while (validName === "") {
  prompt(messages("invalidName", LANGUAGE)); //when user inputs nothing (empty string) or whitespace
  validName = readline.question();
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

let runProgram = "y";

while (runProgram === "y" || runProgram === "Y") {
  prompt(messages("num1", LANGUAGE));
  let num1 = readline.question();

  while (invalidNumber(num1)) {
    prompt(messages("invalidNumber", LANGUAGE));
    num1 = readline.question();
  }

  prompt(messages("num2", LANGUAGE));
  let num2 = readline.question();

  while (invalidNumber(num2)) {
    prompt(messages("invalidNumber", LANGUAGE));
    num2 = readline.question();
  }

  prompt(messages("operation", LANGUAGE));
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt(messages("invalidOperation", LANGUAGE));
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case "1":
      output = Number(num1) + Number(num2);
      break;
    case "2":
      output = Number(num1) - Number(num2);
      break;
    case "3":
      output = Number(num1) * Number(num2);
      break;
    case "4":
      if (Number(num2) === 0) {
        output = messages("infinity", LANGUAGE);
      } else {
        output = Number(num1) / Number(num2);
        break;
      }
  }

  console.log(messages("result", LANGUAGE), output);

  prompt(messages("runProgram", LANGUAGE));
  runProgram = readline.question();
}
