# Calculator

Live: <a href='https://ejrcarr.github.io/calculator/'>Calculator</a>

## Context
This is my implementation of a calculator using HTML, CSS, and vanilla JavaScript. I attempted to recreate the calculator app interface and features on IOS. The web app works responsively on mobile and tablet screens with the calculator instead taking up the whole viewport width and height and no background. 

Through this project, I expanded my knowledge of data structures, event-listeners, manipulating HTML input with JavaScript and design methods and UI principles in CSS. 

## UI Demonstration
<p align='center'>
<img src='https://user-images.githubusercontent.com/110308975/214341218-bf84e556-7cc1-42f1-934c-34e7bfc01a9e.gif' alt='U.I. demonstration of calculator' width='600px'/>
</p>

## Features
This calculator app allows for players to either press, or enter calculations with their keyboard.

Typed mode is allowed, with stringed operations evaluated using PEMDAS. 
<pre>e.g. 12 + 7 - 5 * 3 = 4</pre>

Stringed operations are allowed with clicked functions but will be operated on from left to right and showing the current result when another operator is clicked.
<pre>e.g. 12 + 7 - 5 * 3 = 42</pre>


- ### Buttons
  - <strong>Clear function</strong>: User has two options: clear the entire function or clear current number depending on what has been previously entered. 
  - <strong>Change sign function</strong>: On click, the current result will be made negative or positive, depending on the current sign. 
  - <strong>Percent function</strong>: The current resull will be divided by 100 to represent a percentage of previous number. 
  - <strong>Number buttons/ decimal button</strong>: On click, the clicked button value will be added to the end of the current result. 
  - <strong>Operator buttons</strong>: On click, the clicked operator will be stored to use in the equation with the last number being the left term. 
  - <strong>Equals button</strong>: The previous equation will now be solved.


