import { useState } from "react";
import "./App.css";

const CALCULATOR_KEYS = [
  {
    nameKey: "7",
    className: "number",
    id: "seven",
  },
  {
    nameKey: "8",
    className: "number",
    id: "eight",
  },
  {
    nameKey: "9",
    className: "number",
    id: "nine",
  },
  {
    nameKey: "4",
    className: "number",
    id: "four",
  },
  {
    nameKey: "5",
    className: "number",
    id: "five",
  },
  {
    nameKey: "6",
    className: "number",
    id: "six",
  },
  {
    nameKey: "1",
    className: "number",
    id: "one",
  },
  {
    nameKey: "2",
    className: "number",
    id: "two",
  },
  {
    nameKey: "3",
    className: "number",
    id: "three",
  },
  {
    nameKey: "0",
    className: "number",
    id: "zero",
  },
  {
    nameKey: "=",
    className: "equals",
    id: "equals",
  },
  {
    nameKey: "+",
    className: "math-operation",
    id: "add",
  },
  {
    nameKey: "-",
    className: "math-operation",
    id: "subtract",
  },
  {
    nameKey: "x",
    className: "math-operation",
    id: "multiply",
  },
  {
    nameKey: "/",
    className: "math-operation",
    id: "divide",
  },
  {
    nameKey: ".",
    className: "math-number",
    id: "decimal",
  },
  {
    nameKey: "AC",
    className: "ac",
    id: "clear",
  },
];

function App() {
  const [result, setResult] = useState("");

  const [operation, setOperation] = useState("");

  const handleEqual = () => {
    setResult(String(eval(operation)));
    setOperation(String(eval(operation)));
  };

  const handleClear = () => {
    setOperation("");
    setResult("");
  };
  const handleKey = (key) => {
    const specialKeys = {
      AC: () => handleClear(),
      "=": () => handleEqual(),
      x: () => handleKey("*"),
    };

    if (specialKeys[key]) return specialKeys[key]();

    const regexPunto = /\./;
    const validKeysRegex = /^[+\-*/]$/;

    setOperation((op) => {
      // Check if the last character in operation is an operator (excluding -)
      if (op && op[op.length - 1].match(validKeysRegex)) {
        if (key === op[op.length - 1]) return op;
        if (key === "-") {
          return op + key;
        }
        if (key.match(validKeysRegex)) return op.slice(0, -2) + key;
        // Allow entering "-" as a negative sign
        return op + key;
      } else if (
        key === "." &&
        (result.endsWith(".") || result.match(regexPunto))
      ) {
        return op;
      } else {
        return op?.concat?.(key);
      }
    });

    setResult((prevResult) => {
      if (prevResult.match(validKeysRegex)) return key;
      if (key === "." && (result.endsWith(".") || result.match(regexPunto)))
        return prevResult;

      // Update the result as the user inputs numbers and handles negative sign
      if (key.match(validKeysRegex) || (key === "-" && prevResult === "")) {
        return key;
      }
      if (prevResult === "0" && key === "0") {
        return key;
      }
      if (prevResult === "0") {
        return prevResult + key;
      } else {
        return prevResult + key;
      }
    });
  };

  return (
    <>
      <div id="calculator">
        <div id="display-container">
          <div id="operation">{operation?.replace?.(/\*/g, "x")}</div>
          <div id="display">
            {result?.length === 0 ? "0" : result.replace?.(/\*/g, "x")}
          </div>
        </div>
        <div className="container">
          {CALCULATOR_KEYS.map(({ nameKey, className, id }) => {
            return (
              <div
                onClick={() => handleKey(nameKey)}
                className={className}
                id={id}
                key={id}
              >
                {nameKey}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
