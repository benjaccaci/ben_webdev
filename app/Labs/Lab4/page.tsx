"use client";
import BooleanStateVariables from "./BooleanStateVariables";
import Counter from "./Counter";
import HandlingClickEvent from "./HandlingClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import React from "react";
//import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-passing-functions">
      <h3>Lab 4</h3>
      <HandlingClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions someFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
    </div>
  );
}
