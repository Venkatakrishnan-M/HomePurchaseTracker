import { useState } from "react";
import Form from "./components/Form";
import "./App.css";

// Declaring the variable outside the function App. This Prevents the value of the variable
// stick with the old values used in the input form when we try to tweak our input after submitting once
// These values are used to find out the time left in months to save money for downpayment
//
let salary = 0;
let savingsPercent = 0;
let houseCost = 0;

function App() {
  //State variable for updating the value of month depending on the calculated value.
  let [currentValue, setCurrentValue] = useState(0);

  //State variable for keeping our output text (h3) hidden until the submit button is
  //clicked for first time
  let [isVisible, setIsVisible] = useState(false);

  //Function which accepts the data from the input form. This function is related to State lifting
  //This is the function which corresponds to the reciving the data from the Child Component
  //We Check here the 0th index of the data.After Check we Slice the actual data and store it.
  //We segregate the data using the below key
  // if 0th index is "1" - Then data belows to Form that inputs the "SALARY"
  // if 0th index is "2" - Then data belows to Form that inputs the "SAVINGS %"
  // if 0th index is "3" - Then data belows to Form that inputs the "COST_OF_HOUSE"
  let getDataFromChild = function (data) {
    if (data[0] == "1") {
      salary = Number(data.slice(1));
    } else if (data[0] == "2") {
      savingsPercent = parseFloat(data.slice(1));
    } else if (data[0] == "3") {
      houseCost = Number(data.slice(1));
    }
  };

  //This function is triggred when user clicks the Submit Button.
  // The Main Business Logic of the program is computed within This function.
  let handleOnClickEvent = function () {
    let downPayment = houseCost * 0.25;

    let savingsAmount = salary * savingsPercent;

    let timeLeft = downPayment / savingsAmount;

    // console.log(salary);
    // console.log(savingsPercent);
    // console.log(houseCost);
    // console.log(downPayment);
    // console.log(savingsAmount);
    // console.log(timeLeft);

    setCurrentValue(() => timeLeft);
    setIsVisible(() => true);
  };

  return (
    <div className="outerContainer">
      <h1>Down Payment Time Calculator</h1>
      <div className="innerContainer">
        <Form
          id="1"
          hint="Enter your Salary"
          onChangeInChild={getDataFromChild} //Function Call to fetch data from child Component
        />

        <Form
          id="2"
          hint="Enter your Saving Portion"
          onChangeInChild={getDataFromChild} //Function Call to fetch data from child Component
        />

        <Form
          id="3"
          hint="Enter the price of the house"
          onChangeInChild={getDataFromChild} //Function Call to fetch data from child Component
        />
      </div>
      <div className="submission">
        <button type="submit" onClick={handleOnClickEvent}>
          Calculate
        </button>
      </div>
      {/* Ternary Operator to check if the the isVisible is set to true. On true it will display 
      the h3 block (which is our output block) */}
      {isVisible ? (
        <h3>Projected Time to save Money: {currentValue} Months</h3>
      ) : null}
    </div>
  );
}

export default App;
